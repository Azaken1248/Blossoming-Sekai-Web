import React from "react";

import footerMikuImg from "../assets/PNG 11.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-(--ctp-crust) border-t border-(--ctp-surface1) pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-300 mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-12 mb-12">
          <div className="shrink-0 w-35 md:w-45 mb-4 md:mb-0">
            <img
              src={footerMikuImg}
              alt="Miku"
              loading="lazy"
              className="w-full h-auto block drop-shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
            />
          </div>

          <div className="grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 relative z-10 w-full">
            <div className="flex flex-col">
              <h4 className="text-(--text-main) mb-6 text-[1.1rem] font-bold">
                Blossoming Sekai's Miku
              </h4>
              <p className="text-(--text-muted) text-[0.9rem] leading-[1.6] mb-[0.8rem]">
                A comprehensive task management bot for creative teams
              </p>
            </div>

            <div className="flex flex-col">
              <h4 className="text-(--text-main) mb-6 text-[1.1rem] font-bold">
                Resources
              </h4>
              <ul className="list-none m-0 p-0">
                <li className="mb-[0.8rem]">
                  <a
                    href="https://github.com/Azaken1248/Blossoming-Sekai-s-Miku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--text-muted) no-underline transition-colors duration-200 text-[0.9rem] inline-flex items-center justify-center md:justify-start gap-2 hover:text-(--miku-primary)"
                  >
                    <i className="fa-brands fa-github"></i> GitHub Repository
                  </a>
                </li>
                <li className="mb-[0.8rem]">
                  <a
                    href="https://discord.com/invite/D6FX2m3UJ8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--text-muted) no-underline transition-colors duration-200 text-[0.9rem] inline-flex items-center justify-center md:justify-start gap-2 hover:text-(--miku-primary)"
                  >
                    <i className="fa-brands fa-discord"></i> Blossoming Sekai
                    Discord
                  </a>
                </li>
                <li className="mb-[0.8rem]">
                  <a
                    href="https://discord.js.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--text-muted) no-underline transition-colors duration-200 text-[0.9rem] inline-flex items-center justify-center md:justify-start gap-2 hover:text-(--miku-primary)"
                  >
                    <i className="fa-solid fa-book"></i> Discord.js Docs
                  </a>
                </li>
                <li className="mb-[0.8rem]">
                  <a
                    href="https://mongodb.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--text-muted) no-underline transition-colors duration-200 text-[0.9rem] inline-flex items-center justify-center md:justify-start gap-2 hover:text-(--miku-primary)"
                  >
                    <i className="fa-solid fa-database"></i> MongoDB
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="text-(--text-main) mb-6 text-[1.1rem] font-bold">
                Credits
              </h4>
              <p className="text-(--text-muted) text-[0.9rem] leading-[1.6] mb-[0.8rem]">
                Character: Hatsune Miku
              </p>
              <p className="text-(--text-muted) text-[0.9rem] leading-[1.6] mb-[0.8rem]">
                Developer: Azaken
              </p>
              <p className="text-(--text-muted) text-[0.9rem] leading-[1.6] mb-[0.8rem]">
                Server Owner: Charlie
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-(--ctp-surface1) text-(--ctp-overlay1) text-[0.85rem]">
          <p>
            &copy; 2025 Blossoming Sekai's Miku. Licensed under MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
