"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SpeedHUDProps {
  speed: number;
  drive: boolean;
}

export default function SpeedHUD({
  speed,
  drive,
}: SpeedHUDProps) {
  const speedRef = useRef<HTMLSpanElement>(null);
  const previousSpeed = useRef(0);

  useEffect(() => {
    if (!drive || !speedRef.current) return;

    const target = Math.round(speed);

    gsap.to(previousSpeed, {
      current: target,
      duration: 0.25,
      ease: "power2.out",

      onUpdate: () => {
        if (!speedRef.current) return;

        speedRef.current.textContent = Math.round(
          previousSpeed.current
        )
          .toString()
          .padStart(3, "0");
      },
    });
  }, [speed, drive]);

  if (!drive) return null;

  return (
    <div className="fixed bottom-8 left-8 z-50 pointer-events-none">
      <div className="flex flex-col">

        <div className="flex items-end gap-3">

          <span
            ref={speedRef}
            className="
              text-[76px]
              leading-none
              font-light
              tracking-[-0.07em]
              text-black
            "
          >
            000
          </span>

          <span
            className="
              mb-2
              text-[10px]
              font-medium
              tracking-[0.35em]
              text-black/40
            "
          >
            KM/H
          </span>

        </div>

   
        <div className="mt-3 h-[1px] w-[190px] bg-black/15" />

     
        <div className="mt-3 flex items-center gap-5">

          <span className="
            text-[11px]
            font-medium
            tracking-[0.3em]
            text-black
          ">
            D
          </span>

          <span className="
            text-[9px]
            tracking-[0.25em]
            text-black/40
          ">
            TEST DRIVE
          </span>

        </div>

      </div>
    </div>
  );
}