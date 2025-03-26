import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import HobbySection from "./components/HobbySection";

const App: React.FC = () => {
  const [isAtHeroSection, setIsAtHeroSection] = useState<boolean>(true);

  return (
    <div>
      <HeroSection setIsAtHeroSection={setIsAtHeroSection} />
      <TimelineSection isAtHeroSection={isAtHeroSection} />
      <HobbySection />
    </div>
  );
};

export default App;
