import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    const containers = containerRef.current.filter(
      (container): container is HTMLDivElement => container instanceof HTMLDivElement
    );
    const handlerMap = new Map<HTMLDivElement, () => void>();
    if (ScrollTrigger.isTouch) {
      containers.forEach((container) => {
        container.classList.remove("what-noTouch");
        const clickHandler = () => handleClick(container);
        handlerMap.set(container, clickHandler);
        container.addEventListener("click", clickHandler);
      });
    }
    return () => {
      handlerMap.forEach((handler, container) => {
        container.removeEventListener("click", handler);
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>EDIT</h3>
              <h4>Short-Form Video Editing</h4>
              <p>
                I edit reels and short-form videos with tight pacing, strong
                hooks, clean cuts, and polished transitions to boost watch time
                and engagement.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Adobe Premiere Pro</div>
                <div className="what-tags">After Effects</div>
                <div className="what-tags">DaVinci Resolve</div>
                <div className="what-tags">CapCut</div>
                <div className="what-tags">Color Grading</div>
                <div className="what-tags">Sound Design</div>
                <div className="what-tags">Subtitles</div>
                <div className="what-tags">Speed Ramping</div>
                <div className="what-tags">Transitions</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>OPTIMIZE</h3>
              <h4>Content Packaging</h4>
              <p>
                I optimize videos for platform performance with cover ideas,
                pacing variations, and versions tailored for brand pages and
                creator accounts.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Instagram Reels</div>
                <div className="what-tags">YouTube Shorts</div>
                <div className="what-tags">Hook Strategy</div>
                <div className="what-tags">Story Flow</div>
                <div className="what-tags">Thumbnail Direction</div>
                <div className="what-tags">Brand Style</div>
                <div className="what-tags">Delivery Formats</div>
                <div className="what-tags">Content Repurposing</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
