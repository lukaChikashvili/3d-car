"use client"
import Experience from "@/components/Experience";
import { OrbitControls, KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const controls = [
  { name: "wheelLeft", keys: ["ArrowLeft", "KeyA"] },
  { name: "wheelRight", keys: ["ArrowRight", "KeyD"] },
  { name: "toggleLights", keys: ["KeyL"] },
  { name: "nextMode", keys: ["KeyM"] },
];

export default function Home() {
  return (
    <KeyboardControls map={controls}>
      <Canvas
        shadows
        camera={{ position: [4, 1.8, 5], fov: 35, near: 0.1, far: 100 }}
      >
        <OrbitControls makeDefault minDistance={3} maxDistance={10} maxPolarAngle={Math.PI / 2.1} />
        <Experience />
      </Canvas>
    </KeyboardControls>
  );
}