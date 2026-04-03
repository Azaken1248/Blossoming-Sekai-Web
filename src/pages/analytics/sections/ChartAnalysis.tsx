import React, { useEffect } from "react";

interface ChartAnalysisProps {
  isTasks: boolean;
  chartTab: "distribution" | "extensions" | "predictor";
  setChartTab: (tab: "distribution" | "extensions" | "predictor") => void;
  groupBy: string;
  setGroupBy: (groupBy: string) => void;
  tableData: any[];
  insight: {
    html: string;
    riskStats?: { high: number; med: number; low: number; labels: string[] };
  };
  onChartUpdate: () => Promise<void>;
}

export const ChartAnalysis: React.FC<ChartAnalysisProps> = ({
  isTasks,
  chartTab,
  setChartTab,
  groupBy,
  setGroupBy,
  tableData,
  insight,
  onChartUpdate,
}) => {
  useEffect(() => {
    onChartUpdate();
  }, [chartTab, groupBy, tableData, isTasks, onChartUpdate]);

  return (
    <div className="bg-(--ctp-surface0) border border-(--ctp-surface1) rounded-[15px] p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h3 className="text-[1.2rem] md:text-[1.4rem] font-bold text-(--miku-primary) m-0">
          <i className="fa-solid fa-chart-pie mr-2"></i> Miku's Analysis Engine
        </h3>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setChartTab("distribution")}
            className={`px-4 py-2 rounded-lg font-semibold text-[0.9rem] transition-colors border ${
              chartTab === "distribution"
                ? "bg-[rgba(148,226,213,0.15)] text-(--miku-primary) border-(--miku-primary)"
                : "bg-(--ctp-mantle) text-(--ctp-subtext0) border-(--ctp-surface2) hover:bg-(--ctp-surface1) hover:text-(--ctp-text)"
            }`}
          >
            Distribution
          </button>
          <button
            onClick={() => setChartTab("extensions")}
            className={`px-4 py-2 rounded-lg font-semibold text-[0.9rem] transition-colors border ${
              chartTab === "extensions"
                ? "bg-[rgba(148,226,213,0.15)] text-(--miku-primary) border-(--miku-primary)"
                : "bg-(--ctp-mantle) text-(--ctp-subtext0) border-(--ctp-surface2) hover:bg-(--ctp-surface1) hover:text-(--ctp-text)"
            }`}
          >
            {isTasks ? "Extension Trends" : "Strike Distribution"}
          </button>
          <button
            onClick={() => setChartTab("predictor")}
            className={`px-4 py-2 rounded-lg font-semibold text-[0.9rem] transition-colors border ${
              chartTab === "predictor"
                ? "bg-[rgba(148,226,213,0.15)] text-(--miku-primary) border-(--miku-primary)"
                : "bg-(--ctp-mantle) text-(--ctp-subtext0) border-(--ctp-surface2) hover:bg-(--ctp-surface1) hover:text-(--ctp-text)"
            }`}
          >
            {isTasks ? "Risk Predictor" : "Ban Risk Radar"}
          </button>
        </div>
      </div>

      {chartTab !== "predictor" && (
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          className="mb-6 bg-(--ctp-mantle) text-(--ctp-text) border border-(--ctp-surface2) p-2 rounded-md w-full md:w-62.5 outline-none focus:border-(--miku-primary)"
        >
          {isTasks ? (
            <>
              <option value="status">Group by Status</option>
              <option value="roleName">Group by Role</option>
              <option value="taskType">Group by Task Type</option>
            </>
          ) : (
            <>
              <option value="hiatus">Group by Hiatus Status</option>
              <option value="strikes">Group by Strike Count</option>
            </>
          )}
        </select>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_250px] gap-6 items-center">
        <div className="relative h-[40vh] min-h-62.5 max-h-100 w-full">
          <canvas id="dashboardChart"></canvas>
        </div>

        <div className="bg-(--ctp-mantle) border border-dashed border-(--miku-secondary) rounded-xl p-5 flex flex-col justify-center h-full">
          <h4 className="text-(--miku-secondary) mb-3 font-bold">
            <i className="fa-solid fa-wand-magic-sparkles"></i> Miku's Insight
          </h4>
          <p
            className="text-(--ctp-subtext0) text-[0.9rem] leading-relaxed mb-2"
            dangerouslySetInnerHTML={{ __html: insight.html }}
          ></p>

          {insight.riskStats && (
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between text-[0.85rem] p-1.5 rounded-md bg-(--ctp-surface0) border-l-4 border-(--ctp-red)">
                <span>{insight.riskStats.labels[0]}</span>
                <b className="text-(--ctp-text)">{insight.riskStats.high}</b>
              </div>
              <div className="flex justify-between text-[0.85rem] p-1.5 rounded-md bg-(--ctp-surface0) border-l-4 border-(--ctp-yellow)">
                <span>{insight.riskStats.labels[1]}</span>
                <b className="text-(--ctp-text)">{insight.riskStats.med}</b>
              </div>
              <div className="flex justify-between text-[0.85rem] p-1.5 rounded-md bg-(--ctp-surface0) border-l-4 border-(--ctp-green)">
                <span>{insight.riskStats.labels[2]}</span>
                <b className="text-(--ctp-text)">{insight.riskStats.low}</b>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
