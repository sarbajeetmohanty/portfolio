import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { createProgressController } from "../utils/loadingProgress";

const MOBILE_BREAKPOINT = 900;
const MOBILE_MAX_DPR = 1.35;
const DESKTOP_MAX_DPR = 1.8;

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const characterRef = useRef<THREE.Object3D | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const host = canvasDiv.current;
    if (!host) return;

    const rect = host.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    let isMobileView = window.innerWidth <= MOBILE_BREAKPOINT;
    const scene = sceneRef.current;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, isMobileView ? MOBILE_MAX_DPR : DESKTOP_MAX_DPR)
    );
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    host.appendChild(renderer.domElement);

    const aspect = container.width / container.height;
    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let rafId = 0;
    let disposed = false;
    let pageVisible = !document.hidden;
    let landingVisible = true;

    const clock = new THREE.Clock();
    const light = setLighting(scene, { enableShadows: true });
    const progress = createProgressController((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera, {
      enableShadows: true,
    });

    loadCharacter().then((gltf) => {
      if (!gltf || disposed) return;

      const animations = setAnimations(gltf);
      if (hoverDivRef.current) animations.hover(gltf, hoverDivRef.current);
      mixer = animations.mixer;

      const character = gltf.scene;
      characterRef.current = character;
      scene.add(character);

      headBone = character.getObjectByName("spine006") || null;
      screenLight = character.getObjectByName("screenlight") || null;

      progress.loaded().then(() => {
        if (disposed) return;
        setTimeout(() => {
          if (disposed) return;
          light.turnOnLights();
          animations.startIntro();
        }, 2500);
      });
    });

    const onResize = () => {
      const character = characterRef.current;
      if (!character) return;
      handleResize(renderer, camera, canvasDiv, character);
      isMobileView = window.innerWidth <= MOBILE_BREAKPOINT;
      renderer.shadowMap.enabled = true;
      const maxDpr = isMobileView ? MOBILE_MAX_DPR : DESKTOP_MAX_DPR;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) {
        clock.getDelta();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const onTouchMove = (event: TouchEvent) => {
      handleTouchMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const landingDiv = document.getElementById("landingDiv");
    let landingObserver: IntersectionObserver | null = null;
    let touchDebounce: number | undefined;
    let touchMoveBound = false;

    if (landingDiv && "IntersectionObserver" in window) {
      landingObserver = new IntersectionObserver(
        (entries) => {
          landingVisible = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0.08 }
      );
      landingObserver.observe(landingDiv);
    }

    const bindTouchMove = () => {
      if (!landingDiv || touchMoveBound) return;
      landingDiv.addEventListener("touchmove", onTouchMove, { passive: true });
      touchMoveBound = true;
    };

    const unbindTouchMove = () => {
      if (!landingDiv || !touchMoveBound) return;
      landingDiv.removeEventListener("touchmove", onTouchMove);
      touchMoveBound = false;
    };

    const onTouchStart = () => {
      if (touchDebounce) clearTimeout(touchDebounce);
      touchDebounce = window.setTimeout(() => {
        bindTouchMove();
      }, 180);
    };

    const onTouchEndHandler = () => {
      if (touchDebounce) clearTimeout(touchDebounce);
      unbindTouchMove();
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart, { passive: true });
      landingDiv.addEventListener("touchend", onTouchEndHandler, { passive: true });
      landingDiv.addEventListener("touchcancel", onTouchEndHandler, { passive: true });
    }

    const mobileFrameInterval = 1 / 22;
    let accumulator = 0;
    let headTick = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!pageVisible || disposed) return;
      if (isMobileView && !landingVisible) return;

      const delta = clock.getDelta();
      accumulator += delta;

      if (isMobileView && accumulator < mobileFrameInterval) {
        return;
      }

      const frameDelta = isMobileView ? accumulator : delta;
      accumulator = 0;

      if (headBone) {
        if (!isMobileView || headTick % 2 === 0) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
        }
        if (!isMobileView && screenLight) {
          light.setPointLight(screenLight);
        }
        headTick += 1;
      }
      if (mixer) mixer.update(frameDelta);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      disposed = true;
      if (touchDebounce) clearTimeout(touchDebounce);
      cancelAnimationFrame(rafId);
      progress.stop();

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (landingObserver) {
        landingObserver.disconnect();
      }
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEndHandler);
        landingDiv.removeEventListener("touchcancel", onTouchEndHandler);
      }
      unbindTouchMove();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);

      scene.clear();
      renderer.dispose();
      if (host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [setLoading]);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
