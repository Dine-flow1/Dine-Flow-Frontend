import { useLayoutEffect } from "react";
import gsap from "gsap";

export default function useHeroAnimations(
  heroRef: React.RefObject<HTMLElement | null>,
  textRef: React.RefObject<HTMLElement | null>,
  buttonsRef: React.RefObject<HTMLElement | null>
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

      if (!isTouchDevice) {
        gsap.fromTo(
          textRef.current,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        );

        gsap.fromTo(
          buttonsRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "back.out(1.7)" }
        );
      } else {
        gsap.fromTo(
          [textRef.current, buttonsRef.current],
          { opacity: 0 },
          { opacity: 1, duration: 0.8, stagger: 0.2 }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [heroRef, textRef, buttonsRef]);
}
