import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import "./styles/SocialIcons.css";
import { useEffect } from "react";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;
    const cleanups: Array<() => void> = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a");
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;
      let rafId = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        rafId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();
      cleanups.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
      });
    });
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://api.whatsapp.com/send/?phone=918260540233"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp />
          </a>
        </span>
        <span>
          <a href="https://t.me/insane_dark90" target="_blank" rel="noreferrer">
            <FaTelegramPlane />
          </a>
        </span>
      </div>
    </div>
  );
};

export default SocialIcons;
