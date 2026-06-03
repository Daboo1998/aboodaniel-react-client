import { useEffect } from "react";

/**
 * Scroll reveals + magnetic buttons, ported from the design prototype's app.js.
 *
 * Geometry-based (rather than IntersectionObserver) so it is robust across
 * environments. Above-the-fold `.reveal` elements are shown instantly on the
 * first pass; below-fold ones animate in as they enter the viewport.
 *
 * Call once per page after its content has mounted. `deps` lets the scan re-run
 * when the rendered content changes.
 */
const useScrollReveal = (deps: ReadonlyArray<unknown> = []) => {
  useEffect(() => {
    let reveals = Array.prototype.slice.call(
      document.querySelectorAll(".reveal")
    ) as HTMLElement[];
    let ticking = false;
    let firstPass = true;

    const checkReveals = () => {
      ticking = false;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (let i = reveals.length - 1; i >= 0; i--) {
        const el = reveals[i];
        const top = el.getBoundingClientRect().top;
        if (firstPass && top < vh) {
          el.style.transition = "none";
          el.classList.add("in");
          el.style.opacity = "1";
          el.style.transform = "none";
          reveals.splice(i, 1);
        } else if (!firstPass && top < vh * 0.9) {
          el.classList.add("in");
          el.style.opacity = "1";
          el.style.transform = "none";
          reveals.splice(i, 1);
        }
      }
      firstPass = false;
    };

    const onScrollResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkReveals);
      }
    };

    let timer: number | undefined;
    if (reveals.length) {
      checkReveals();
      timer = window.setTimeout(checkReveals, 500);
      window.addEventListener("scroll", onScrollResize, { passive: true });
      window.addEventListener("resize", onScrollResize, { passive: true });
    }

    // magnetic buttons (subtle) — skip on touch devices
    const magnetCleanups: Array<() => void> = [];
    if (!window.matchMedia("(pointer: coarse)").matches) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          el.style.transform = "translate(" + x * 0.18 + "px," + y * 0.22 + "px)";
        };
        const onLeave = () => {
          el.style.transform = "";
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        magnetCleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
      magnetCleanups.forEach((fn) => fn());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useScrollReveal;
