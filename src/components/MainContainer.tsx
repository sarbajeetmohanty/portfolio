import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    let resizeRaf = 0;

    const updateViewportHeight = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight}px`);
    };

    const resizeHandler = () => {
      if (resizeRaf) {
        cancelAnimationFrame(resizeRaf);
      }
      resizeRaf = requestAnimationFrame(() => {
        updateViewportHeight();
        setSplitText();
        const isDesktop = window.innerWidth > 1024;
        setIsDesktopView((prev) => (prev === isDesktop ? prev : isDesktop));
        resizeRaf = 0;
      });
    };

    updateViewportHeight();
    setSplitText();
    const isDesktop = window.innerWidth > 1024;
    setIsDesktopView((prev) => (prev === isDesktop ? prev : isDesktop));
    window.addEventListener("resize", resizeHandler);
    window.addEventListener("orientationchange", resizeHandler);

    return () => {
      if (resizeRaf) {
        cancelAnimationFrame(resizeRaf);
      }
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("orientationchange", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
