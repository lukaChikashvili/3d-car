"use client"
import { PerspectiveCamera, Environment, ContactShadows, useGLTF } from "@react-three/drei"
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
        color="#fff5e8"
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
        color="#cfe8ff"
      />

    
      <directionalLight
        position={[0, 4, -6]}
        intensity={1.2}
        color="#ffffff"
      />

      
      <ambientLight intensity={0.02} />

     
      <Environment preset="studio" />
 
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.6}
        scale={15}
        blur={2.5}
        far={4}
      />

      <primitive object={car.scene} scale = {100} position = {[0, 0.05, 0]} />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="white"
          roughness={0.04}
          metalness={0.1}
          side = {DoubleSide}
        />
      </mesh>
    </>
  )
}