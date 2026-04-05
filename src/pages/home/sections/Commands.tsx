import React from "react";

import mikuLeftImg from "../../../assets/PNG 5.png";
import mikuRightImg from "../../../assets/PNG 10.png";

interface Command {
  name: string;
  description: string;
  category: string;
  permissions: string;
}

const commandsList: Command[] = [
  // Crew Management
  {
    name: "/onboard, !onboard",
    description: "Welcome new crew members",
    category: "Crew Management",
    permissions: "Owners only",
  },
  {
    name: "/deboard, !deboard",
    description: "Recruit a user to another sekai with farewell message",
    category: "Crew Management",
    permissions: "Owners only",
  },
  {
    name: "/removetask, !removetask",
    description: "Delete pending/late tasks (protects completed tasks)",
    category: "Crew Management",
    permissions: "Managers/Owners",
  },

  // Strike Management
  {
    name: "/strike list",
    description: "View all users with active strikes",
    category: "Strike Management",
    permissions: "Managers/Owners",
  },
  {
    name: "/strike add",
    description: "Add strike to a user",
    category: "Strike Management",
    permissions: "Managers/Owners",
  },
  {
    name: "/strike remove",
    description: "Remove strike from a user",
    category: "Strike Management",
    permissions: "Managers/Owners",
  },

  // Task Management
  {
    name: "/assign",
    description: "Assign task type and role to a user",
    category: "Task Management",
    permissions: "Managers/Owners",
  },
  {
    name: "/submit, !submit",
    description: "Mark task as complete/ready for review",
    category: "Task Management",
    permissions: "Anyone",
  },
  {
    name: "/extension, !extension",
    description: "Request deadline extension for a task",
    category: "Task Management",
    permissions: "Anyone",
  },
  {
    name: "/tasks, !tasks",
    description: "View active tasks (yours or another user's)",
    category: "Task Management",
    permissions: "Anyone",
  },

  // Analytics & Profile
  {
    name: "/profile, !profile",
    description: "View user profile and task statistics",
    category: "Analytics & Profile",
    permissions: "Anyone",
  },
  {
    name: "/card, !card",
    description: "View user ID card with roles and stats",
    category: "Analytics & Profile",
    permissions: "Anyone",
  },
  {
    name: "/history, !history",
    description: "Search and view task history with filters",
    category: "Analytics & Profile",
    permissions: "Anyone",
  },
  {
    name: "/checkfree, !checkfree",
    description: "Check who has no active tasks",
    category: "Analytics & Profile",
    permissions: "Anyone",
  },

  // Hiatus Management
  {
    name: "/hiatus, !hiatus",
    description: "Request or grant hiatus (needs approval)",
    category: "Hiatus Management",
    permissions: "Anyone",
  },
  {
    name: "/endhiatus, !endhiatus",
    description: "End hiatus period (yours or another user's)",
    category: "Hiatus Management",
    permissions: "Anyone",
  },

  // Utility
  {
    name: "/help, !help",
    description: "Show all available commands",
    category: "Utility",
    permissions: "Anyone",
  },
  {
    name: "/ping, !ping",
    description: "Check bot response time",
    category: "Utility",
    permissions: "Anyone",
  },
  {
    name: "/uptime, !uptime",
    description: "Check bot uptime",
    category: "Utility",
    permissions: "Anyone",
  },
];

const getPermissionColor = (permission: string): string => {
  switch (permission) {
    case "Owners only":
      return "bg-[rgba(203,166,247,0.15)] text-(--ctp-mauve) border-[rgba(203,166,247,0.3)]";
    case "Managers/Owners":
      return "bg-[rgba(249,226,175,0.15)] text-(--ctp-yellow) border-[rgba(249,226,175,0.3)]";
    case "Anyone":
      return "bg-[rgba(166,227,161,0.15)] text-(--ctp-green) border-[rgba(166,227,161,0.3)]";
    default:
      return "bg-(--ctp-surface1) text-(--ctp-text) border border-(--ctp-surface2)";
  }
};

const Commands: React.FC = () => {
  return (
    <section
      id="commands"
      className="relative flex flex-col justify-center min-h-dvh py-24 bg-(--bg-body) overflow-hidden"
    >
      <div className="absolute pointer-events-none z-0 md:z-10 opacity-50 md:opacity-80 top-20 md:top-12.5 left-1.25 md:left-[2%] max-w-20 md:max-w-62.5 transform md:rotate-[-8deg] transition-opacity duration-300">
        <img
          src={mikuLeftImg}
          alt="Miku"
          loading="lazy"
          style={{ animationDelay: "0.5s" }}
          className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)] animate-[float_6.5s_ease-in-out_infinite]"
        />
      </div>

      <div className="absolute pointer-events-none z-0 md:z-10 opacity-50 md:opacity-[0.75] top-20 md:top-auto bottom-auto md:bottom-5 right-1.25 md:right-[1%] max-w-20 md:max-w-45 transform md:rotate-10 transition-opacity duration-300">
        <img
          src={mikuRightImg}
          alt="Miku"
          loading="lazy"
          style={{ animationDelay: "2s" }}
          className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)] animate-[float_7.5s_ease-in-out_infinite]"
        />
      </div>

      <div className="relative z-2 w-full max-w-350 mx-auto px-0 md:px-8 box-border">
        <div className="text-center mb-16">
          <h2
            className="relative inline-block text-[2rem] md:text-[2.5rem] font-extrabold text-(--text-main) z-2
                         after:content-[''] after:block after:w-15 after:h-1 after:bg-(--miku-secondary) after:mx-auto after:mt-4 after:rounded-xs"
          >
            Commands
          </h2>
        </div>

        <div className="bg-(--bg-card) border-y md:border border-(--ctp-surface1) rounded-none md:rounded-[20px] p-2 md:p-8 overflow-x-auto shadow-none md:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] [-webkit-overflow-scrolling:touch]">
          <table className="w-full border-collapse min-w-150 md:min-w-200">
            <thead>
              <tr>
                <th className="text-left p-[0.8rem_0.5rem] md:p-4 text-(--miku-secondary) font-bold uppercase tracking-[1px] border-b-2 border-(--ctp-surface1) text-[0.85rem] md:text-[0.9rem]">
                  Command
                </th>
                <th className="text-left p-[0.8rem_0.5rem] md:p-4 text-(--miku-secondary) font-bold uppercase tracking-[1px] border-b-2 border-(--ctp-surface1) text-[0.85rem] md:text-[0.9rem]">
                  Description
                </th>
                <th className="text-left p-[0.8rem_0.5rem] md:p-4 text-(--miku-secondary) font-bold uppercase tracking-[1px] border-b-2 border-(--ctp-surface1) text-[0.85rem] md:text-[0.9rem]">
                  Category
                </th>
                <th className="text-left p-[0.8rem_0.5rem] md:p-4 text-(--miku-secondary) font-bold uppercase tracking-[1px] border-b-2 border-(--ctp-surface1) text-[0.85rem] md:text-[0.9rem]">
                  Permissions
                </th>
              </tr>
            </thead>

            <tbody>
              {commandsList.map((cmd, index) => (
                <tr
                  key={index}
                  className="group hover:bg-(--ctp-surface1) transition-colors duration-200 border-b border-(--ctp-surface1) last:border-b-0"
                >
                  <td className="p-[0.8rem_0.5rem] md:p-4 whitespace-normal">
                    <code className="bg-[rgba(148,226,213,0.15)] text-(--miku-primary) px-[0.8rem] py-[0.4rem] rounded-md font-mono font-semibold text-[0.9rem] whitespace-nowrap">
                      {cmd.name}
                    </code>
                  </td>
                  <td className="p-[0.8rem_0.5rem] md:p-4 text-(--text-muted) group-hover:text-(--text-main) text-[0.85rem] md:text-[0.95rem] whitespace-normal transition-colors duration-200">
                    {cmd.description}
                  </td>
                  <td className="p-[0.8rem_0.5rem] md:p-4 whitespace-normal">
                    <span className="inline-block px-[0.8rem] py-[0.3rem] rounded-[50px] text-[0.8rem] font-semibold bg-(--ctp-surface1) text-(--miku-accent) border border-(--ctp-surface2)">
                      {cmd.category}
                    </span>
                  </td>
                  <td className="p-[0.8rem_0.5rem] md:p-4 whitespace-normal">
                    <span
                      className={`inline-block px-[0.8rem] py-[0.3rem] rounded-[50px] text-[0.8rem] font-semibold border ${getPermissionColor(cmd.permissions)}`}
                    >
                      {cmd.permissions}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Commands;
