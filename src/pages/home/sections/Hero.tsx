import React from "react";

import heroMikuImg from "../../../assets/PNG 1.png";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative py-24 px-8 overflow-hidden"
    >
      <div className="text-center z-2 max-w-250 relative w-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[radial-gradient(circle,rgba(148,226,213,0.15)_0%,transparent_70%)] blur-[60px] -z-10 animate-pulse"></div>

        <div className="mb-10 relative inline-block">
          <img
            src={heroMikuImg}
            alt="Hatsune Miku"
            loading="lazy"
            className="max-w-95 w-full h-auto drop-shadow-[0_0_30px_rgba(148,226,213,0.3)] animate-[float_4s_ease-in-out_infinite]"
          />
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <span className="text-[1.25rem] text-(--miku-secondary) font-semibold tracking-[4px] uppercase">
            Welcome to
          </span>
          <h1 className="m-0 text-[2.5rem] md:text-[4rem] font-black tracking-[-1px] leading-[1.3] pb-[0.2em] bg-[linear-gradient(to_right,var(--miku-primary),var(--ctp-blue))] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
            Blossoming SEKAI
          </h1>
        </div>

        <p className="text-[1.2rem] text-(--text-muted) mb-14 max-w-150 mx-auto">
          Your friendly task management companion powered by Hatsune Miku
        </p>
      </div>
    </section>
  );
};

export default Hero;
