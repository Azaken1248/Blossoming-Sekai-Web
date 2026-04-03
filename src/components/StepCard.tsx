import React from "react";

interface StepCardProps {
  number: number;
  title: string;
  description: React.ReactNode;
  codeSnippet?: string;
}

const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  description,
  codeSnippet,
}) => {
  return (
    <div
      className={`
        flex flex-col md:flex-row items-start gap-6 
        bg-(--bg-card) border border-(--ctp-surface1) rounded-2xl p-6 
        transition-all duration-300 ease-in-out
        hover:border-(--miku-primary) hover:scale-[1.02] hover:bg-(--ctp-surface1)
      `}
    >
      <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,var(--miku-primary),var(--miku-accent))] text-(--ctp-base) text-[1.2rem] font-extrabold shadow-[0_4px_10px_rgba(148,226,213,0.3)]">
        {number}
      </div>

      <div className="flex-1 max-w-full">
        <h3 className="text-(--text-main) mb-2 text-[1.1rem] font-bold">
          {title}
        </h3>

        <div className="text-(--text-muted) text-[0.95rem] mb-[0.8rem] leading-relaxed [&>a]:text-(--miku-primary) [&>a]:font-semibold [&>a]:no-underline [&>a]:transition-colors [&>a]:duration-200 hover:[&>a]:text-(--miku-secondary) hover:[&>a]:underline">
          {description}
        </div>

        {codeSnippet && (
          <code className="block mt-2 p-4 bg-(--ctp-crust) border border-(--ctp-surface1) rounded-lg text-(--miku-primary) font-mono text-[0.85rem] relative overflow-x-auto whitespace-pre-wrap wrap-break-word max-w-full box-border">
            {codeSnippet}
          </code>
        )}
      </div>
    </div>
  );
};

export default StepCard;
