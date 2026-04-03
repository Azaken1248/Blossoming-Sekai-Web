import React from "react";
import FeatureCard from "../../../components/FeatureCard";

import mikuTopImg from "../../../assets/PNG 2.png";
import mikuBottomImg from "../../../assets/PNG 9.png";

const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="relative flex flex-col justify-center min-h-dvh py-24 bg-(--ctp-mantle) overflow-hidden"
    >
      <div className="absolute pointer-events-none z-0 md:z-10 opacity-50 md:opacity-80 top-20 md:top-12.5 right-1.25 md:right-[2%] max-w-20 md:max-w-62.5 transform md:rotate-15 transition-opacity duration-300">
        <img
          src={mikuTopImg}
          alt="Miku"
          loading="lazy"
          className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)] animate-[float_6s_ease-in-out_infinite]"
        />
      </div>

      <div className="absolute pointer-events-none z-0 md:z-10 opacity-50 md:opacity-[0.75] top-20 md:top-auto bottom-auto md:bottom-5 left-1.25 md:left-[1%] max-w-20 md:max-w-45 transform md:-rotate-12 transition-opacity duration-300">
        <img
          src={mikuBottomImg}
          alt="Miku"
          loading="lazy"
          style={{ animationDelay: "1.5s" }}
          className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)] animate-[float_7s_ease-in-out_infinite]"
        />
      </div>

      <div className="relative z-2 max-w-300 w-full mx-auto px-8 box-border">
        <div className="text-center mb-16">
          <h2
            className="relative inline-block text-[2rem] md:text-[2.5rem] font-extrabold text-(--text-main) z-2
                         after:content-[''] after:block after:w-15 after:h-1 after:bg-(--miku-secondary) after:mx-auto after:mt-4 after:rounded-xs"
          >
            Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            iconClass="fa-solid fa-clipboard-user"
            title="Smart Task Assignment"
            description="Role-based task system with configurable deadlines and automatic deadline calculation based on task type and role."
          />
          <FeatureCard
            iconClass="fa-solid fa-bell"
            title="Intelligent Reminders"
            description="Two-tier reminder system that notifies you before deadlines with configurable thresholds based on task duration."
          />
          <FeatureCard
            iconClass="fa-solid fa-check-double"
            title="Approval Workflow"
            description="Button-based approval system for submissions, extensions, and hiatus requests with channel notifications."
          />
          <FeatureCard
            iconClass="fa-solid fa-gavel"
            title="Strike Management"
            description="Automatic strike system with task completion rewards and configurable three-strike demotion policy."
          />
          <FeatureCard
            iconClass="fa-solid fa-bed"
            title="Hiatus System"
            description="Request-based hiatus that pauses all deadlines and provides fresh starts upon return with reset reminders."
          />
          <FeatureCard
            iconClass="fa-solid fa-wand-magic-sparkles"
            title="Custom Tasks"
            description="Create custom tasks with flexible durations and extension settings tailored to your project needs."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
