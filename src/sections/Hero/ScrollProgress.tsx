"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * A minimal scroll progress marker — a thin vertical hairline with a
 * traveling dot. Intentionally not a scrollbar replacement: it's a quiet
 * "you are here" cue that fits the research-instrument feel of the page.
 */
export default function ScrollProgress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const fill = fillRef.current;
    const dot = dotRef.current;
    if (!fill || !dot) return;

    const setY = gsap.quickSetter(fill, "scaleY");
    const setDotY = gsap.quickTo(dot, "y", {
      duration: reduce ? 0 : 0.35,
      ease: "power2.out",
    });

    let raf = 0;
    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setY(progress);
      const track = trackRef.current;
      if (track) setDotY(progress * track.offsetHeight);
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden h-28 w-4 -translate-y-1/2 md:block lg:right-8"
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="relative mx-auto h-full w-px bg-border"
      >
        <div
          ref={fillRef}
          className="absolute left-0 top-0 h-full w-full origin-top scale-y-0 bg-accent"
        />
        <div
          ref={dotRef}
          className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full bg-accent-deep"
        />
      </div>
    </div>
  );
}
