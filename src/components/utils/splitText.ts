import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedElement extends HTMLElement {
  anim?: gsap.core.Animation;
}

gsap.registerPlugin(ScrollTrigger);

function resetAnimations(elements: NodeListOf<AnimatedElement>) {
  elements.forEach((element) => {
    if (element.anim) {
      element.anim.progress(1).kill();
      element.anim = undefined;
    }
  });
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });

  const paras: NodeListOf<AnimatedElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<AnimatedElement> = document.querySelectorAll(".title");

  resetAnimations(paras);
  resetAnimations(titles);

  if (window.innerWidth < 900) {
    paras.forEach((para) => para.classList.remove("visible"));
    return;
  }

  const triggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const toggleAction = "play pause resume reverse";

  paras.forEach((para) => {
    para.classList.add("visible");
    para.anim = gsap.fromTo(
      para,
      { autoAlpha: 0, y: 70 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: para.parentElement?.parentElement || para,
          toggleActions: toggleAction,
          start: triggerStart,
        },
      }
    );
  });

  titles.forEach((title) => {
    title.anim = gsap.fromTo(
      title,
      { autoAlpha: 0, y: 70, rotate: 2 },
      {
        autoAlpha: 1,
        y: 0,
        rotate: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title.parentElement?.parentElement || title,
          toggleActions: toggleAction,
          start: triggerStart,
        },
      }
    );
  });
}
