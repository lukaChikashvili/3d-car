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
import { useState } from "react";

const controls = [
  { name: "wheelForward", keys: ["ArrowUp", "KeyW"] },
  { name: "wheelBackward", keys: ["ArrowDown", "KeyS"] },
  { name: "bonnet", keys: ["KeyB"] },
  { name: "headlights", keys: ["KeyL"] },
];

export default function Home() {
  const [showHUD, setShowHUD] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  return (
    <main className="relative w-screen h-screen overflow-hidden">

      <KeyboardControls map={controls}>

       
        <UIOverlay isOpen={showHUD} />

        <ColorSelector isOpen={colorOpen} />

        <Header
          onKeyboardClick={() =>
            setShowHUD((prev) => !prev)
          }
          onColorClick={() =>
            setColorOpen((prev) => !prev)
          }
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
            makeDefault
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2.1}
          />

          <Experience />
        </Canvas>

      </KeyboardControls>

    </main>
  );
}