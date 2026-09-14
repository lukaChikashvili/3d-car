"use client";

import ColorSelector from "@/components/ColorSelector";
import Experience from "@/components/Experience";
import Header from "@/components/Header";
import UIOverlay from "@/components/UIOverlay";

import {
  OrbitControls,
  KeyboardControls,
} from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

const controls = [
  { name: "accelerate", keys: ["ArrowUp", "KeyW"] },
  { name: "brake", keys: ["ArrowDown", "KeyS"] },
  { name: "turnLeft", keys: ["ArrowLeft", "KeyA"] },
  { name: "turnRight", keys: ["ArrowRight", "KeyD"] },
  { name: "handbrake", keys: ["Space"] },
  { name: "bonnet", keys: ["KeyB"] },
  { name: "headlights", keys: ["KeyL"] },
];
export default function Home() {
  const [showHUD, setShowHUD] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [carColor, setCarColor] = useState("#00abcb");
  const [drive, setDrive] = useState(false);
  const orbitControlsRef = useRef<any>(null);

  useEffect(() => {
    if (!orbitControlsRef.current) return;
  
    orbitControlsRef.current.enabled = !drive;
  }, [drive]);

  return (
    <main className="relative w-screen h-screen overflow-hidden">

      <KeyboardControls map={controls}>

       
        <UIOverlay isOpen={showHUD} />

        <ColorSelector
             isOpen={colorOpen}
             onColorSelect={setCarColor} />

        <Header
          onKeyboardClick={() =>
            setShowHUD((prev) => !prev)
          }
          onColorClick={() =>
            setColorOpen((prev) => !prev)
          }
          startTestDrive={() => {
             setDrive((prev) => !prev)
          }}


        />

        <Canvas
          shadows
          camera={{
            position: [4, 1.8, 5],
            fov: 35,
            near: 0.1,
            far: 100,
          }}
        >
        
        <OrbitControls
  ref={orbitControlsRef}
  makeDefault
  minDistance={3}
  maxDistance={10}
  maxPolarAngle={Math.PI / 2.1}
/>

          <Experience carColor={carColor} drive = {drive} />
        </Canvas>

      </KeyboardControls>

    </main>
  );
}