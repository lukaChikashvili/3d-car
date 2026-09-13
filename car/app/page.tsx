"use client"
import Experience from "@/components/Experience";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <>
       <Canvas shadows
      camera={{
        position: [4, 1.8, 5],
        fov: 35,
        near: 0.1,
        far: 100,
      }}>
        <OrbitControls makeDefault />
          <Experience />
       </Canvas>
    </>
  );
}
