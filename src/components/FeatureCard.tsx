import React from "react";

interface FeatureCardProps {
  iconClass: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  iconClass,
  title,
  description,
}) => {
  return (
    <div
      className={`
        group relative overflow-hidden z-10 p-10 bg-(--bg-card) border border-(--ctp-surface1) rounded-[20px] 
        transition-all duration-300 ease-in-out
        hover:-translate-y-2 hover:border-(--miku-primary) hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]
        after:content-[''] after:absolute after:top-0 after:right-0 after:w-25 after:h-25
        after:bg-[radial-gradient(circle_at_top_right,rgba(148,226,213,0.1),transparent_70%)] 
        after:rounded-bl-full after:transition-transform after:duration-300
        group-hover:after:scale-150
      `}
    >
      <div className="flex items-center justify-center w-15 h-15 mb-6 rounded-xl bg-[rgba(148,226,213,0.1)] text-(--miku-primary) text-[2.5rem]">
        <i className={iconClass}></i>
      </div>

      <div className="relative z-10">
        <h3 className="text-[1.25rem] font-bold text-(--text-main) mb-4">
          {title}
        </h3>
        <p className="text-[0.95rem] leading-[1.7] text-(--text-muted)">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
