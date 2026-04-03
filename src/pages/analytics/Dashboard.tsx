import React, { useState, useEffect, useRef, useCallback } from "react";
import Chart from "chart.js/auto";
import Navbar from "../../components/Navbar";
import { ControlPanel } from "../../components/ControlPanel";
import { StatsGrid } from "./sections/StatsGrid";
import { ChartAnalysis } from "./sections/ChartAnalysis";
import { DataTable } from "./sections/DataTable";

const API_BASE = "https://api.sekai.azaken.com/api/v1/analytics";
const API_USERS_FALLBACK = "https://api.sekai.azaken.com/api/users";

const Dashboard = () => {
  const [activeMode, setActiveMode] = useState<"assignments" | "users">(
    "assignments",
  );
  const [chartTab, setChartTab] = useState<
    "distribution" | "extensions" | "predictor"
  >("distribution");
  const [groupBy, setGroupBy] = useState("status");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    taskType: "",
    hasExtended: "",
    isOnHiatus: "",
    hasStrikes: "",
    sort: "-createdAt",
  });

  const [rawUsersData, setRawUsersData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [globalStats, setGlobalStats] = useState({
    totalTasks: 0,
    completionRate: "0%",
    activeMembers: 0,
    totalExtensions: 0,
    totalStrikes: 0,
    cleanRecords: 0,
    usersOnHiatus: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const chartInstance = useRef<Chart | null>(null);
  const [insight, setInsight] = useState<{
    html: string;
    riskStats?: { high: number; med: number; low: number; labels: string[] };
  }>({ html: "Loading insights..." });

  const isTasks = activeMode === "assignments";

  const buildChart = useCallback(async () => {
    let cData: any[] = [];
    let cType: any = "doughnut";
    let cKey = "count";
    let customColors = [
      "#94e2d5",
      "#f5c2e7",
      "#89b4fa",
      "#a6e3a1",
      "#f9e2af",
      "#f38ba8",
    ];
    let newInsight = { html: "Not enough data.", riskStats: undefined as any };

    if (isTasks) {
      if (chartTab === "predictor") {
        try {
          const res = await fetch(`${API_BASE}/assignments?status=PENDING`);
          const result = await res.json();
          const pending = result.success ? result.data : [];
          let risk = { high: 0, med: 0, low: 0 };
          const now = new Date();
          pending.forEach((task: any) => {
            const hoursLeft =
              (new Date(task.deadline).getTime() - now.getTime()) / 3600000;
            if (hoursLeft < 24 || (hoursLeft < 48 && task.hasExtended))
              risk.high++;
            else if (hoursLeft < 72 || task.hasExtended) risk.med++;
            else risk.low++;
          });
          cData = [
            { _id: "High Risk", count: risk.high },
            { _id: "Medium Risk", count: risk.med },
            { _id: "Low Risk", count: risk.low },
          ];
          cType = "pie";
          customColors = ["#f38ba8", "#f9e2af", "#a6e3a1"];
          newInsight = {
            html: `Miku analyzed <b>${pending.length} pending tasks</b>. <br><br>Tasks marked "High Risk" are due within 24 hours. Consider a reminder!`,
            riskStats: {
              high: risk.high,
              med: risk.med,
              low: risk.low,
              labels: ["High Risk:", "Med Risk:", "Low Risk:"],
            },
          };
        } catch (e) {
          console.error("Error fetching predictor data:", e);
        }
      } else {
        const res = await fetch(`${API_BASE}/stats?groupBy=${groupBy}`);
        const result = await res.json();
        if (result.success) {
          cData =
            chartTab === "extensions"
              ? result.data.filter((d: any) => d.extendedTasks > 0)
              : result.data;
          cType = chartTab === "extensions" ? "bar" : "doughnut";
          cKey = chartTab === "extensions" ? "extendedTasks" : "totalTasks";

          if (cData.length > 0) {
            const sorted = [...cData].sort((a, b) => b[cKey] - a[cKey]);
            if (chartTab === "distribution") {
              const percent = Math.round(
                (sorted[0][cKey] / cData.reduce((a, c) => a + c[cKey], 0)) *
                  100,
              );
              newInsight.html = `Miku noticed <b>${sorted[0]._id}</b> dominates workflow, making up <b>${percent}%</b> of tasks here.`;
            } else {
              newInsight.html = `Watch out! <b>${sorted[0]._id}</b> requests the most extensions.`;
            }
          }
        }
      }
    } else {
      if (chartTab === "predictor") {
        try {
          let res = await fetch(`${API_BASE}/users`).catch(() => null);
          if (!res || res.status === 404) res = await fetch(API_USERS_FALLBACK);
          const result = await res.json();
          const users = result.data || result;
          const userArray = Array.isArray(users) ? users : [];

          let risk = { safe: 0, warning: 0, danger: 0 };
          userArray.forEach((u: any) => {
            if (!u.strikes || u.strikes === 0) risk.safe++;
            else if (u.strikes === 1) risk.warning++;
            else risk.danger++;
          });
          cData = [
            { _id: "Danger (2+)", count: risk.danger },
            { _id: "Warning (1)", count: risk.warning },
            { _id: "Safe (0)", count: risk.safe },
          ];
          cType = "pie";
          customColors = ["#f38ba8", "#f9e2af", "#a6e3a1"];
          newInsight = {
            html:
              risk.danger > 0
                ? `<b>Warning!</b> Miku found ${risk.danger} user(s) at immediate risk of demotion/ban due to strikes.`
                : "Amazing! No users are currently in the danger zone.",
            riskStats: {
              high: risk.danger,
              med: risk.warning,
              low: risk.safe,
              labels: ["Danger (2+):", "Warning (1):", "Safe (0):"],
            },
          };
        } catch (e) {
          console.error("Error fetching user predictor data:", e);
        }
      } else if (chartTab === "extensions") {
        try {
          let res = await fetch(`${API_BASE}/users`).catch(() => null);
          if (!res || res.status === 404) res = await fetch(API_USERS_FALLBACK);
          const result = await res.json();
          const users = result.data || result;
          const userArray = Array.isArray(users) ? users : [];

          const strikeMap: any = {};
          userArray.forEach((u: any) => {
            const s = u.strikes || 0;
            strikeMap[s] = (strikeMap[s] || 0) + 1;
          });
          Object.keys(strikeMap).forEach((k) =>
            cData.push({ _id: `${k} Strikes`, count: strikeMap[k] }),
          );
          cType = "bar";
          newInsight.html = `This chart shows exactly how strikes are spread across the server. Aim to keep the numbers on the left side high!`;
        } catch (e) {
          console.error("Error fetching strike distribution data:", e);
        }
      } else {
        try {
          let res = await fetch(`${API_BASE}/users`).catch(() => null);
          if (!res || res.status === 404) res = await fetch(API_USERS_FALLBACK);
          const result = await res.json();
          const users = result.data || result;
          const userArray = Array.isArray(users) ? users : [];

          if (groupBy === "hiatus") {
            const hCount = userArray.filter((u: any) => u.isOnHiatus).length;
            cData = [
              { _id: "Active", count: userArray.length - hCount },
              { _id: "On Hiatus", count: hCount },
            ];
            newInsight.html = `Right now, Miku sees <b>${hCount}</b> users taking a well-deserved break.`;
          } else {
            let s0 = 0,
              s1 = 0,
              s2 = 0;
            userArray.forEach((u: any) => {
              if (!u.strikes) s0++;
              else if (u.strikes === 1) s1++;
              else s2++;
            });
            cData = [
              { _id: "0 Strikes", count: s0 },
              { _id: "1 Strike", count: s1 },
              { _id: "2+ Strikes", count: s2 },
            ];
            newInsight.html = `The vast majority of your users have <b>${[...cData].sort((a, b) => b.count - a.count)[0]._id}</b>. Good job maintaining accountability!`;
          }
        } catch (e) {
          console.error("Error fetching user distribution data:", e);
        }
      }
    }

    setInsight(newInsight);

    const canvas = document.getElementById(
      "dashboardChart",
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx && cData.length > 0) {
      try {
        if (chartInstance.current) {
          chartInstance.current.destroy();
          chartInstance.current = null;
        }

        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
          existingChart.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: cType,
          data: {
            labels: cData.map((item) => item._id || "Unknown"),
            datasets: [
              {
                data: cData.map((item) => item[cKey]),
                backgroundColor: customColors,
                borderWidth: 0,
                borderRadius: cType === "bar" ? 6 : 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: cType !== "bar",
                position: "right",
                labels: { color: "#cdd6f4" },
              },
            },
            scales:
              cType === "bar"
                ? {
                    y: {
                      beginAtZero: true,
                      grid: { color: "#313244" },
                      ticks: { color: "#a6adc8", stepSize: 1 },
                    },
                    x: {
                      grid: { display: false },
                      ticks: { color: "#a6adc8" },
                    },
                  }
                : {},
          },
        });
      } catch (error) {
        console.error("Chart creation error:", error);
        const fallbackChart = Chart.getChart(canvas);
        if (fallbackChart) {
          fallbackChart.destroy();
        }
      }
    }
  }, [chartTab, groupBy, isTasks]);

  const fetchAssignments = async (queryFilters = filters) => {
    setIsLoading(true);
    try {
      const qs = new URLSearchParams();
      if (queryFilters.status) qs.append("status", queryFilters.status);
      if (queryFilters.taskType) qs.append("taskType", queryFilters.taskType);
      if (queryFilters.hasExtended)
        qs.append("hasExtended", queryFilters.hasExtended);
      if (queryFilters.sort) qs.append("sort", queryFilters.sort);

      const res = await fetch(`${API_BASE}/assignments?${qs.toString()}`);
      const result = await res.json();
      if (result.success) {
        setTableData(result.data);
        const extCount = result.data.reduce(
          (acc: number, curr: any) => acc + (curr.extensionCount || 0),
          0,
        );
        setGlobalStats((prev) => ({ ...prev, totalExtensions: extCount }));
      }

      const uRes = await fetch(`${API_BASE}/users`).catch(() =>
        fetch(API_USERS_FALLBACK),
      );
      const uData = await uRes.json();
      const activeMemCount = uData.success
        ? uData.data?.length
        : uData.length || 0;

      const sRes = await fetch(`${API_BASE}/stats?groupBy=status`);
      const sData = await sRes.json();
      if (sData.success) {
        let tTasks = 0,
          cTasks = 0;
        sData.data.forEach((stat: any) => {
          tTasks += stat.totalTasks;
          if (stat._id === "COMPLETED") cTasks += stat.totalTasks;
        });
        setGlobalStats((prev) => ({
          ...prev,
          totalTasks: tTasks,
          completionRate:
            tTasks > 0 ? Math.round((cTasks / tTasks) * 100) + "%" : "0%",
          activeMembers: activeMemCount,
        }));
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
    setIsInitialLoading(false);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      let res = await fetch(`${API_BASE}/users`).catch(() => null);
      if (!res || res.status === 404) res = await fetch(API_USERS_FALLBACK);
      const result = await res.json();
      let users = result.data || result;
      if (!Array.isArray(users)) users = [];

      setRawUsersData(users);
      applyUserFilters(users, filters);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
    setIsInitialLoading(false);
  };

  const applyUserFilters = (users: any[], currentFilters: typeof filters) => {
    let filtered = [...users];
    if (currentFilters.isOnHiatus !== "") {
      const isH = currentFilters.isOnHiatus === "true";
      filtered = filtered.filter((u) => !!u.isOnHiatus === isH);
    }
    if (currentFilters.hasStrikes !== "") {
      filtered = filtered.filter((u) =>
        currentFilters.hasStrikes === "yes"
          ? u.strikes > 0
          : !u.strikes || u.strikes === 0,
      );
    }
    setTableData(filtered);

    setGlobalStats((prev) => ({
      ...prev,
      activeMembers: users.length,
      cleanRecords: users.filter((u) => !u.strikes || u.strikes === 0).length,
      usersOnHiatus: users.filter((u) => u.isOnHiatus).length,
      totalStrikes: users.reduce((acc, curr) => acc + (curr.strikes || 0), 0),
    }));
  };

  useEffect(() => {
    setChartTab("distribution");
    setGroupBy(isTasks ? "status" : "hiatus");
    setSearchTerm("");
    if (isTasks) fetchAssignments();
    else fetchUsers();
  }, [activeMode]);

  useEffect(() => {
    buildChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }

      const canvas = document.getElementById(
        "dashboardChart",
      ) as HTMLCanvasElement;
      if (canvas) {
        const chart = Chart.getChart(canvas);
        if (chart) {
          chart.destroy();
        }
      }
    };
  }, [buildChart]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTasks) fetchAssignments(filters);
    else applyUserFilters(rawUsersData, filters);
  };

  const handleReset = () => {
    const resetFilters = {
      status: "",
      taskType: "",
      hasExtended: "",
      isOnHiatus: "",
      hasStrikes: "",
      sort: "-createdAt",
    };
    setFilters(resetFilters);
    if (isTasks) fetchAssignments(resetFilters);
    else applyUserFilters(rawUsersData, resetFilters);
  };

  const filteredTableData = tableData.filter((item) => {
    if (!searchTerm) return true;
    const terms = searchTerm.toLowerCase().trim().split(/\s+/);
    let str = "";
    if (isTasks) {
      const uName = item.userId?.username || item.discordUserId || "";
      str =
        `${item.taskType || ""} ${item.roleName || ""} ${uName} ${item.status || ""} ${new Date(item.deadline).toLocaleDateString()}`.toLowerCase();
    } else {
      const hText = item.isOnHiatus ? "hiatus" : "active";
      str =
        `${item.username || ""} ${item.discordId || ""} ${item.strikes || 0} ${hText}`.toLowerCase();
    }
    return terms.every((term) => str.includes(term));
  });

  return (
    <>
      <Navbar
        title="Sekai Analytics"
        mobileTitle="Analytics"
        items={[
          { label: "Home", href: "/", iconClass: "fa-solid fa-house" },
          {
            label: "Profiles",
            href: "/profile",
            iconClass: "fa-solid fa-id-badge",
          },
        ]}
      />

      {isInitialLoading ? (
        <main className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-(--miku-primary) mb-4 block"></i>
            <p className="text-(--ctp-subtext0) text-lg">
              Miku is preparing your analytics...
            </p>
          </div>
        </main>
      ) : (
        <main className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 max-w-350 w-full mx-auto px-4 md:px-8 py-8">
          <ControlPanel>
            <ControlPanel.ModeSwitcher
              active={activeMode}
              onChange={(id) => setActiveMode(id as any)}
              modes={[
                {
                  id: "assignments",
                  label: "Tasks",
                  icon: "fa-solid fa-list-check",
                },
                { id: "users", label: "Users", icon: "fa-solid fa-users" },
              ]}
            />

            <ControlPanel.Header
              icon="fa-solid fa-sliders"
              title="Miku's Filters"
            />

            <form className="flex flex-col gap-4" onSubmit={handleFilterSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {isTasks ? (
                  <>
                    <ControlPanel.FormGroup label="Task Status">
                      <ControlPanel.Select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                      >
                        <option value="">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="LATE">Late</option>
                        <option value="EXCUSED">Excused</option>
                      </ControlPanel.Select>
                    </ControlPanel.FormGroup>
                    <ControlPanel.FormGroup label="Task Type (Exact)">
                      <ControlPanel.Input
                        type="text"
                        name="taskType"
                        value={filters.taskType}
                        onChange={handleFilterChange}
                        placeholder="e.g. ART, MIXING"
                      />
                    </ControlPanel.FormGroup>
                    <ControlPanel.FormGroup label="Has Extended?">
                      <ControlPanel.Select
                        name="hasExtended"
                        value={filters.hasExtended}
                        onChange={handleFilterChange}
                      >
                        <option value="">Any</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </ControlPanel.Select>
                    </ControlPanel.FormGroup>
                  </>
                ) : (
                  <>
                    <ControlPanel.FormGroup label="Hiatus Status">
                      <ControlPanel.Select
                        name="isOnHiatus"
                        value={filters.isOnHiatus}
                        onChange={handleFilterChange}
                      >
                        <option value="">Any</option>
                        <option value="true">On Hiatus</option>
                        <option value="false">Active</option>
                      </ControlPanel.Select>
                    </ControlPanel.FormGroup>
                    <ControlPanel.FormGroup label="Has Strikes?">
                      <ControlPanel.Select
                        name="hasStrikes"
                        value={filters.hasStrikes}
                        onChange={handleFilterChange}
                      >
                        <option value="">Any</option>
                        <option value="yes">Yes {`(> 0)`}</option>
                        <option value="no">No (Clean)</option>
                      </ControlPanel.Select>
                    </ControlPanel.FormGroup>
                  </>
                )}

                <ControlPanel.FormGroup label="Sort By">
                  <ControlPanel.Select
                    name="sort"
                    value={filters.sort}
                    onChange={handleFilterChange}
                  >
                    <option value="-createdAt">Newest First</option>
                    <option value="createdAt">Oldest First</option>
                  </ControlPanel.Select>
                </ControlPanel.FormGroup>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <ControlPanel.Button
                  type="submit"
                  variant="primary"
                  icon="fa-solid fa-magnifying-glass"
                >
                  Apply Filters
                </ControlPanel.Button>
                <ControlPanel.Button
                  type="button"
                  variant="secondary"
                  onClick={handleReset}
                >
                  Reset
                </ControlPanel.Button>
              </div>
            </form>
          </ControlPanel>

          {isLoading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center">
                <i className="fa-solid fa-spinner fa-spin text-4xl text-(--miku-primary) mb-4 block"></i>
                <p className="text-(--ctp-subtext0) text-lg">
                  Miku is loading your data...
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8 min-w-0">
              <StatsGrid isTasks={isTasks} stats={globalStats} />

              <ChartAnalysis
                isTasks={isTasks}
                chartTab={chartTab}
                setChartTab={setChartTab}
                groupBy={groupBy}
                setGroupBy={setGroupBy}
                tableData={tableData}
                insight={insight}
                onChartUpdate={buildChart}
              />

              <DataTable
                isTasks={isTasks}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                tableData={tableData}
                filteredTableData={filteredTableData}
                isLoading={isLoading}
              />
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default Dashboard;
