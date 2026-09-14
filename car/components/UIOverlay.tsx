"use client";

import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface UIOverlayProps {
  isOpen: boolean;
}

export default function UIOverlay({ isOpen }: UIOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef<(HTMLDivElement | null)[]>([]);

  const wheelForward = useKeyboardControls(
    (state) => state.wheelForward
  );
  const wheelBackward = useKeyboardControls(
    (state) => state.wheelBackward
  );
  const bonnet = useKeyboardControls((state) => state.bonnet);
  const headlights = useKeyboardControls(
    (state) => state.headlights
  );

  const keyList = [
    { key: "W", label: "Left", active: wheelForward },
    { key: "S", label: "Right", active: wheelBackward },
    { key: "B", label: "Bonnet", active: bonnet },
    { key: "L", label: "Lights", active: headlights },
  ];

  useEffect(() => {
    const keys = keysRef.current.filter(Boolean);

    if (!overlayRef.current || !keys.length) return;

    if (isOpen) {
      gsap.set(overlayRef.current, {
        opacity: 1,
      });

      gsap.fromTo(
        keys,
        {
          opacity: 0,
          y: 25,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );
    } else {
      gsap.to(keys, {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.25,
        stagger: 0.04,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      style={{
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      <div className="flex items-center gap-3 p-3 rounded-2xl ">
        {keyList.map(({ key, label, active }, index) => (
          <div
            key={key}
            ref={(el) => {
              keysRef.current[index] = el;
            }}
            className="flex flex-col items-center gap-1.5"
          >
            <button
              className={`button ${
                active ? "is-active" : ""
              }`}
            >
              <div className="button-outer">
                <div className="button-inner">
                  <span>{key}</span>
                </div>
              </div>
            </button>

            <span
              className={`text-[10px] font-medium tracking-wider uppercase transition-colors duration-150 ${
                active
                  ? "text-amber-400 font-semibold"
                  : "text-black"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}