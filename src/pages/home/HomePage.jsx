import React from "react";
import Slider from "@/components/ui/slider/Slider";
import RecentModels from "@/components/sections/RecentModels";
import AboutAiModels from "@/components/sections/AboutAiModels";
import GetStarted from "@/components/sections/GetStarted";

const HomePage = () => {
  return (
    <main className="space-y-20">
      <Slider />
      <RecentModels />
      <AboutAiModels />
      <GetStarted />
    </main>
  );
};

export default HomePage;
