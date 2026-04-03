import React, { useState, useEffect } from "react";

import logoImg from "../assets/PNG 1.png";
import iconHome from "../assets/PNG 1.png";
import iconFeatures from "../assets/PNG 2.png";
import iconCommands from "../assets/PNG 5.png";
import iconSetup from "../assets/PNG 7.png";
import iconAnalytics from "../assets/PNG 6.png";
import iconMembers from "../assets/PNG 10.png";

interface NavItem {
  label: string;
  href: string;
  iconSrc: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home", iconSrc: iconHome },
  { label: "Features", href: "#features", iconSrc: iconFeatures },
  { label: "Commands", href: "#commands", iconSrc: iconCommands },
  { label: "Setup", href: "#setup", iconSrc: iconSetup },
  { label: "Analytics", href: "dashboard.html", iconSrc: iconAnalytics },
  { label: "Members", href: "profile.html", iconSrc: iconMembers },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute("id") || "");
          }
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach((section) => navObserver.observe(section));
    return () => sections.forEach((section) => navObserver.unobserve(section));
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-1000 py-3 bg-(--bg-nav) backdrop-blur-md border-b border-(--ctp-surface1) transition-all duration-300 mx-auto max-w-full">
      <div className="px-8 md:px-17 flex justify-between items-center mx-auto max-w-7xl">
        <div className="flex items-center gap-3 relative z-1001">
          <img
            src={logoImg}
            alt="Miku"
            className="w-8.75 h-8.75 md:w-12 md:h-12 object-contain drop-shadow-[0_0_12px_var(--glow-color)]"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <span className="text-[1.3rem] md:text-[1.5rem] font-extrabold tracking-[-0.5px] bg-[linear-gradient(135deg,var(--miku-primary),var(--miku-accent))] bg-clip-text text-transparent [-webkit-text-fill-color:transparent] drop-shadow-[0_0_8px_var(--glow-color)]">
            <span className="md:hidden">Sekai</span>
            <span className="hidden md:inline">Blossoming Sekai's Miku</span>
          </span>
        </div>

        <div
          className="flex flex-col gap-1.25 md:hidden cursor-pointer z-1001"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`h-0.75 w-6.25 rounded-[3px] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2 bg-(--miku-primary)" : "bg-(--text-main)"}`}
          ></span>
          <span
            className={`h-0.75 w-6.25 rounded-[3px] bg-(--text-main) transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`h-0.75 w-6.25 rounded-[3px] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2 bg-(--miku-secondary)" : "bg-(--text-main)"}`}
          ></span>
        </div>
        <ul
          className={`
          flex flex-col md:flex-row items-center gap-6 md:gap-10 m-0 py-8 md:py-0 list-none
          absolute md:static top-full left-0 w-full md:w-auto
          bg-(--bg-nav) md:bg-transparent 
          backdrop-blur-[15px] md:backdrop-blur-none
          border-b md:border-none border-(--ctp-surface1)
          shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:shadow-none
          transition-all duration-300 ease-in-out z-999
          ${isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-[150%] md:translate-y-0 opacity-0 invisible md:opacity-100 md:visible"}
        `}
        >
          {navItems.map((item) => {
            const isActive = item.href === `#${activeSection}`;

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    group relative flex items-center gap-2 p-2 md:p-0 md:py-2 
                    text-[1.1rem] md:text-[0.95rem] font-semibold transition-all duration-300 no-underline
                    ${isActive ? "text-(--miku-primary)" : "text-(--text-muted) hover:text-(--miku-primary)"}
                  `}
                >
                  <img
                    src={item.iconSrc}
                    alt=""
                    loading="lazy"
                    className={`
                      w-5 h-5 md:w-6 md:h-6 object-contain transition-transform duration-300
                      ${isActive ? "opacity-100 scale-110 -rotate-[5deg]" : "opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:-rotate-[5deg]"}
                    `}
                  />
                  <span>{item.label}</span>

                  <span
                    className={`
                    absolute bottom-0 left-0 h-0.5 bg-(--miku-secondary) transition-[width] duration-300 rounded-xs
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                  ></span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
