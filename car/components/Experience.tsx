"use client"
import { PerspectiveCamera, Environment, ContactShadows, useGLTF, Grid } from "@react-three/drei"
import { DoubleSide } from "three";

export default function Experience() {
     
    const car = useGLTF('/car.glb');


  return (
    <>
   
      <PerspectiveCamera
        makeDefault
        position={[4, 1.8, 5]}
        fov={35}
        near={0.1}
        far={100}
      />

      
      <directionalLight
        position={[5, 6, 4]}
        intensity={2.2}
        color="orange"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

     
      <directionalLight
        position={[-5, 3, -4]}
        intensity={0.6}
        color="white"
      />

    
      <directionalLight
        position={[0, 4, -6]}
        intensity={1.3}
        color="blue"
      />

      
      <ambientLight intensity={0.02} />

      <Grid
  position={[0, 0.001, 0]}
  args={[50, 50]}
  cellSize={0.5}
  cellThickness={0.5}
  cellColor="#2a2a2a"
  sectionSize={2.5}
  sectionThickness={1}
  sectionColor="#3a3a3a"
  fadeDistance={30}
  fadeStrength={1}
  infiniteGrid
/>
     
      <Environment preset="studio"  />
 
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.6}
        scale={15}
        blur={2.5}
        far={4}
      />

      <primitive object={car.scene} scale = {100} position = {[0, 0.06, 0]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
  <planeGeometry args={[50, 50]} />
  <meshStandardMaterial side={DoubleSide} color="#FFF5F5" roughness={0.4} metalness={0.2} />
</mesh>
    </>
  )
}