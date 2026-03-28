import gsap from "gsap";
import { smoother } from "../Navbar";

function runRoleLoop(
  primarySelector: string,
  secondarySelector: string,
  translateY = 60,
  holdDelay = 2.8
) {
  const primary = document.querySelector(primarySelector);
  const secondary = document.querySelector(secondarySelector);
  if (!primary || !secondary) return;

  gsap.set(secondary, { autoAlpha: 0, y: translateY });

  gsap
    .timeline({ repeat: -1, repeatDelay: 0.8 })
    .to(primary, {
      autoAlpha: 0,
      y: -translateY,
      duration: 0.9,
      delay: holdDelay,
      ease: "power2.inOut",
    })
    .to(
      secondary,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.inOut",
      },
      "<"
    )
    .to(secondary, {
      autoAlpha: 0,
      y: -translateY,
      duration: 0.9,
      delay: holdDelay,
      ease: "power2.inOut",
    })
    .to(
      primary,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.inOut",
      },
      "<"
    );
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  const isMobile = window.innerWidth <= 900;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const main = document.getElementsByTagName("main")[0];
  if (main) main.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  gsap.fromTo(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.1,
      ease: "power3.inOut",
      stagger: 0.08,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: isMobile ? 0.9 : 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: isMobile ? 0.55 : 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  if (!prefersReducedMotion) {
    const translateY = isMobile ? 18 : 60;
    const holdDelay = isMobile ? 1.9 : 2.8;
    runRoleLoop(".landing-h2-info", ".landing-h2-info-1", translateY, holdDelay);
    runRoleLoop(".landing-h2-1", ".landing-h2-2", translateY, holdDelay);
    return;
  }

  gsap.set([".landing-h2-info", ".landing-h2-1"], { autoAlpha: 1, y: 0 });
  gsap.set([".landing-h2-info-1", ".landing-h2-2"], { autoAlpha: 0, y: 0 });
}
