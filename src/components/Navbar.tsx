import { useEffect, useState } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

type SmootherController = {
  paused: (state: boolean) => void;
  scrollTo: (target: string) => void;
  scrollTop: (top: number) => void;
  destroy: () => void;
};

export let smoother: SmootherController = {
  paused: () => {},
  scrollTo: () => {},
  scrollTop: () => {},
  destroy: () => {},
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    smoother = {
      paused: () => {},
      scrollTop: (top: number) => {
        if (Number.isFinite(top)) {
          window.scrollTo({ top, behavior: "auto" });
        }
      },
      scrollTo: (target: string) => {
        if (!target) return;
        const section = document.querySelector(target);
        if (!section) return;
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      },
      destroy: () => {},
    };
    smoother.scrollTop(0);

    const listeners: Array<{
      element: HTMLAnchorElement;
      handler: (e: MouseEvent) => void;
    }> = [];
    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      const handler = (e: MouseEvent) => {
        e.preventDefault();
        const targetElem = e.currentTarget as HTMLAnchorElement;
        const section = targetElem.getAttribute("data-href") || "";
        smoother.scrollTo(section);
        if (window.innerWidth < 900) {
          setIsMobileMenuOpen(false);
        }
      };
      element.addEventListener("click", handler);
      listeners.push({ element, handler });
    });

    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleEscape);

    return () => {
      listeners.forEach(({ element, handler }) => {
        element.removeEventListener("click", handler);
      });
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleEscape);
      smoother.destroy();
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          SHARIM
        </a>
        <a
          href="https://api.whatsapp.com/send/?phone=918260540233"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp: +91 8260540233
        </a>
        <button
          type="button"
          className={`mobile-menu-btn ${isMobileMenuOpen ? "is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={isMobileMenuOpen ? "menu-open" : ""}>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="REELS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
