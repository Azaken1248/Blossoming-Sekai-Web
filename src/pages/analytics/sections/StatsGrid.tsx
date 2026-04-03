import React from "react";

interface StatsGridProps {
  isTasks: boolean;
  stats: {
    totalTasks: number;
    completionRate: string;
    activeMembers: number;
    totalExtensions: number;
    cleanRecords: number;
    usersOnHiatus: number;
    totalStrikes: number;
  };
}

export const StatsGrid: React.FC<StatsGridProps> = ({ isTasks, stats }) => {
  const values = isTasks
    ? [
        stats.totalTasks,
        stats.completionRate,
        stats.activeMembers,
        stats.totalExtensions,
      ]
    : [
        stats.activeMembers,
        stats.cleanRecords,
        stats.usersOnHiatus,
        stats.totalStrikes,
      ];

  const labels = isTasks
    ? ["Total Tasks", "Completion Rate", "Active Members", "Total Extensions"]
    : [
        "Total Users",
        "Clean Records",
        "Users on Hiatus",
        "Total Strikes Given",
      ];

  const icons = isTasks
    ? [
        "fa-solid fa-database",
        "fa-solid fa-chart-line",
        "fa-solid fa-users",
        "fa-solid fa-clock-rotate-left",
      ]
    : [
        "fa-solid fa-users",
        "fa-solid fa-shield-heart",
        "fa-solid fa-bed",
        "fa-solid fa-gavel",
      ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {values.map((val, i) => (
        <div
          key={i}
          className="bg-(--ctp-surface0) border border-(--ctp-surface1) rounded-[15px] p-4 md:p-6 flex items-center gap-4 transition-transform hover:-translate-y-1.25 hover:border-(--miku-secondary)"
        >
          <div className="text-[1.5rem] md:text-[2rem] text-(--miku-accent) bg-[rgba(137,220,235,0.1)] p-3 md:p-4 rounded-xl">
            <i className={icons[i]}></i>
          </div>
          <div>
            <h4 className="text-[1.3rem] md:text-[1.8rem] font-extrabold text-(--ctp-text)">
              {val}
            </h4>
            <p className="text-(--ctp-subtext0) text-[0.8rem] md:text-[0.9rem] whitespace-nowrap">
              {labels[i]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
