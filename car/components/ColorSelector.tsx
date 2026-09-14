"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ColorSelectorProps {
  isOpen: boolean;
  onColorSelect: (color: string) => void;
}

const colors = [
    { name: "main", value: "#00abcb" },
  { name: "Gulf", value: "#2E5368" },
  { name: "Olive Green", value: "#4B5748" },
  { name: "Elegant Gray", value: "#6B6D6C" },
  { name: "Radiant Purple", value: "#6D526F" },
  { name: "Meteor Blue", value: "#547B94" },
  { name: "Lava Orange", value: "#D65A24" },
  { name: "Cambrian", value: "#59636A" },
  { name: "red", value: "#B3262D" },
  { name: "black", value: "black" },
  
];

export default function ColorSelector({
  isOpen,
  onColorSelect,
}: ColorSelectorProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const panel = panelRef.current;
    const items = itemsRef.current.filter(Boolean);

    if (!panel) return;

    if (isOpen) {
      gsap.set(panel, { display: "block" });

      const tl = gsap.timeline();

      tl.fromTo(
        panel,
        {
          opacity: 0,
          y: 25,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        }
      );

      tl.fromTo(
        items,
        {
          opacity: 0,
          y: 15,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.07,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );
    } else {
      gsap.to(panel, {
        opacity: 0,
        y: 20,
        scale: 0.96,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(panel, { display: "none" });
        },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={panelRef}
      className="
        fixed
        bottom-8
        left-1/2
        -translate-x-1/2
        z-50
        hidden
      "
    >
      <div
        className="
          flex
          items-center
          gap-4
          rounded-2xl
          bg-[#F3F4F4]
          border
          border-white/10
          px-5
          py-4
          shadow-[0_10px_30px_rgba(0,0,0,0.5)]
        "
      >
        <div className="flex flex-col mr-2">
          <span className="text-[9px] font-mono tracking-[0.2em] text-black/40 uppercase">
            Vehicle
          </span>

          <span className="text-[10px] font-mono tracking-[0.15em] text-black uppercase">
            Paint
          </span>
        </div>

        <div className="h-8 w-px bg-black/10" />

        <div className="flex items-center gap-3">
          {colors.map((color, index) => (
            <button
              key={color.name}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              onClick={() => onColorSelect(color.value)}
              className="
                group
                relative
                h-9
                w-9
                rounded-lg
                cursor-pointer
                transition-transform
                duration-300
                hover:scale-110
              "
              title={color.name}
            >
              <span
                className="
                  absolute
                  inset-0
                  rounded-lg
                  border
                  border-black/10
                  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]
                "
                style={{
                  backgroundColor: color.value,
                }}
              />

              <span
                className="
                  absolute
                  -inset-1
                  rounded-[10px]
                  border
                  border-amber-400
                  opacity-0
                  scale-90
                  transition-all
                  duration-300
                  group-hover:opacity-100
                  group-hover:scale-100
                "
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}