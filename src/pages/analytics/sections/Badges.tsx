export const StatusBadge = ({ status }: { status: string }) => {
  const base =
    "px-2.5 py-1 rounded-[50px] text-[0.75rem] font-bold text-[#111] whitespace-nowrap inline-block";
  const colors: Record<string, string> = {
    PENDING: "bg-(--ctp-yellow)",
    COMPLETED: "bg-(--ctp-green)",
    LATE: "bg-(--ctp-red)",
    EXCUSED: "bg-(--ctp-subtext0)",
  };
  return (
    <span
      className={`${base} ${colors[status] || "bg-(--ctp-surface2) text-(--ctp-text)"}`}
    >
      {status}
    </span>
  );
};

export const StrikeBadges = ({ count }: { count: number }) => {
  if (!count || count === 0)
    return <span className="text-(--ctp-subtext0)">Clean</span>;
  return (
    <div className="flex gap-1 flex-wrap">
      {[...Array(count)].map((_, i) => (
        <span
          key={i}
          className="bg-(--ctp-red) text-white rounded-sm px-1.5 py-0.5 inline-flex items-center justify-center"
        >
          <i className="fa-solid fa-xmark text-[0.7rem]"></i>
        </span>
      ))}
    </div>
  );
};
