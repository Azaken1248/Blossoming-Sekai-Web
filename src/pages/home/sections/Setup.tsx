import React from "react";
import StepCard from "../../../components/StepCard";

import mikuSetupRightImg from "../../../assets/PNG 7.png";
import mikuSetupLeftImg from "../../../assets/PNG 8.png";

const Setup: React.FC = () => {
  const techStack = [
    "Node.js",
    "Discord.js v14",
    "MongoDB",
    "Mongoose",
    "Express.js",
  ];

  return (
    <section
      id="setup"
      className="relative flex flex-col justify-center min-h-dvh py-24 bg-(--ctp-mantle) overflow-hidden"
    >
      <div className="absolute pointer-events-none z-0 md:z-10 opacity-50 md:opacity-[0.85] top-20 md:top-12.5 right-1.25 md:right-[2%] max-w-20 md:max-w-62.5 transform md:rotate-[5deg] transition-opacity duration-300">
        <img
          src={mikuSetupRightImg}
          alt="Miku"
          loading="lazy"
          style={{ animationDelay: "1s" }}
          className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)] animate-[float_6s_ease-in-out_infinite]"
        />
      </div>
      <div className="absolute pointer-events-none z-0 md:z-10 opacity-50 md:opacity-[0.85] top-20 md:top-auto bottom-auto md:bottom-5 left-1.25 md:left-[1%] max-w-20 md:max-w-45 transform md:rotate-[-5deg] transition-opacity duration-300">
        <img
          src={mikuSetupLeftImg}
          alt="Miku"
          loading="lazy"
          style={{ animationDelay: "1.5s" }}
          className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)] animate-[float_7s_ease-in-out_infinite]"
        />
      </div>

      <div className="relative z-2 w-full max-w-300 mx-auto px-4 md:px-8 box-border text-center">
        <div className="mb-16">
          <h2
            className="relative inline-block text-[2rem] md:text-[2.5rem] font-extrabold text-(--text-main) z-2 max-w-[60%] md:max-w-none mx-auto
                         after:content-[''] after:block after:w-15 after:h-1 after:bg-(--miku-secondary) after:mx-auto after:mt-4 after:rounded-xs"
          >
            Setup Guide
          </h2>
        </div>
        <div className="flex flex-col gap-6 max-w-200 mx-auto mb-16 text-left">
          <StepCard
            number={1}
            title="Prerequisites"
            description={
              <p>
                Ensure you have{" "}
                <a
                  href="https://nodejs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Node.js
                </a>{" "}
                (v16.9+) and{" "}
                <a
                  href="https://www.mongodb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MongoDB
                </a>{" "}
                installed.
              </p>
            }
          />

          <StepCard
            number={2}
            title="Clone & Install"
            description={
              <p>Clone the repository and install the required dependencies.</p>
            }
            codeSnippet={`git clone https://github.com/Azaken1248/Blossoming-Sekai-s-Miku.git\ncd Blossoming-Sekai-s-Miku\nnpm install`}
          />

          <StepCard
            number={3}
            title="Environment Variables"
            description={
              <p>
                Create a <code>.env</code> file in the root directory with your
                credentials.
              </p>
            }
            codeSnippet={`DISCORD_TOKEN=your_bot_token\nMONGODB_URI=mongodb://localhost:27017/miku_bot\nCLIENT_ID=your_application_id\nGUILD_ID=your_server_id`}
          />

          <StepCard
            number={4}
            title="Configuration"
            description={
              <>
                <p className="mb-2">
                  Open <code>config.js</code> and configure your server's
                  specific IDs.
                </p>
                <ul className="list-disc ml-6 text-(--text-muted) mb-4">
                  <li className="mb-1">
                    <strong>Channel IDs:</strong> Set{" "}
                    <code>LOG_CHANNEL_ID</code>,{" "}
                    <code>REMINDER_CHANNEL_ID</code>, etc.
                  </li>
                  <li className="mb-1">
                    <strong>Role IDs:</strong> Define <code>OWNER_ROLE_ID</code>
                    , <code>MANAGER_ROLE_IDS</code>, and{" "}
                    <code>CREW_ROLE_IDS</code>.
                  </li>
                  <li className="mb-1">
                    <strong>Rules:</strong> Customize deadlines and reminders
                    for each role in the <code>RULES</code> object.
                  </li>
                </ul>
              </>
            }
          />

          <StepCard
            number={5}
            title="Launch Miku"
            description={<p>Start the bot application.</p>}
            codeSnippet="node bot.js"
          />
        </div>

        <div className="text-center z-10 relative">
          <h3 className="text-(--text-main) text-[1.5rem] font-bold mb-8">
            Tech Stack
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="bg-(--ctp-surface1) text-(--miku-primary) px-[1.2rem] py-[0.6rem] rounded-[50px] font-semibold text-[0.9rem] border border-(--ctp-surface2) transition-all duration-300 hover:bg-(--miku-primary) hover:text-(--ctp-base) hover:-translate-y-0.75 hover:shadow-[0_5px_15px_rgba(148,226,213,0.3)] cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Setup;
