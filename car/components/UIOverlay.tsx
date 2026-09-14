"use client";
import { useKeyboardControls } from "@react-three/drei";

interface UIOverlayProps {
  isOpen: boolean;
}

export default function UIOverlay({ isOpen }: UIOverlayProps) {
  const wheelForward = useKeyboardControls((state) => state.wheelForward);
  const wheelBackward = useKeyboardControls((state) => state.wheelBackward);
  const bonnet = useKeyboardControls((state) => state.bonnet);
  const headlights = useKeyboardControls((state) => state.headlights);

 
  if (!isOpen) return null;

  const keyList = [
    { key: "W", label: "Left", active: wheelForward },
    { key: "S", label: "Right", active: wheelBackward },
    { key: "B", label: "Bonnet", active: bonnet },
    { key: "L", label: "Lights", active: headlights },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F3F4F4] backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {keyList.map(({ key, label, active }) => (
          <div key={key} className="flex flex-col items-center gap-1.5">
           
                <button className={`button ${active ? "is-active" : ""}`}>
  <div className="button-outer">
    <div className="button-inner">
      <span> {key}</span>
    </div>
  </div>
</button>
             
             
            <span
              className={`text-[10px] font-medium tracking-wider uppercase transition-colors duration-150 ${
                active ? "text-amber-400 font-semibold" : "text-black"
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