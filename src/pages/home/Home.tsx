import React from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Commands from "./sections/Commands";
import Setup from "./sections/Setup";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-(--bg-body) relative overflow-x-hidden">
        <div className="stars block"></div>
        <div className="stars2 block"></div>
        <div className="stars3 block"></div>

        <main className="grow">
          <Hero />
          <Features />
          <Commands />
          <Setup />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
