"use client"
import { PerspectiveCamera, Environment, ContactShadows, useGLTF, Grid, useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { DoubleSide, Object3D } from "three";
import * as THREE from 'three'


export default function Experience() {
     
    const car = useGLTF('/car.glb');
    const wheelFL = useRef<Object3D | null>(null);
    const wheelFR = useRef<Object3D | null>(null);
    const bonnetRef = useRef<Object3D | null>(null);
    const bonnetPivot = useRef<Object3D | null>(null);

    const wheelForward = useKeyboardControls((state) => state.wheelForward);
    const wheelBackward = useKeyboardControls((state) => state.wheelBackward);
    const bonnetPressed = useKeyboardControls((state) => state.bonnet);

    useEffect(() => {
        car.scene.traverse((child) => {
          if(child.name === "3DWheel_Front_L") {
            wheelFL.current = child;
          }
          if(child.name === "3DWheel_Front_R") {
            wheelFR.current = child;
          }

          if(child.name === "untitledSM_Hood_0000_009_SM_Hood_0000_009_MAT_CarPaint_SU7_Base_041_untitledMAT_CarPaint_SU7_Base1_0") {
            bonnetRef.current = child;

            const pivot = new THREE.Object3D();

           
            child.parent?.add(pivot);
      
         
            pivot.position.copy(child.position);
            pivot.rotation.copy(child.rotation);
            pivot.scale.copy(child.scale);
      
        
            child.position.set(0, 0, 0);
            child.rotation.set(0, 0, 0);
            child.scale.set(1, 1, 1);
      
            pivot.add(child);
      
            bonnetPivot.current = pivot;

          }
        })
    }, [car])


    useFrame((_, delta) => {
        const turnSpeed = 5; 
        const maxTurnAngle = 0.5;
    
      
        let dir = 0;
        if (wheelForward) dir = 1;  
        if (wheelBackward) dir = -1; 
    
        const targetAngle = dir * maxTurnAngle;
    
       
        if (wheelFL.current) {
            const currentAngle = wheelFL.current.rotation.y;
            wheelFL.current.rotation.y += (targetAngle - currentAngle) * Math.min(turnSpeed * delta, 1);
          }
        
        
          if (wheelFR.current) {
            const currentAngle = wheelFR.current.rotation.y;
            const invertedTargetAngle = -targetAngle; 
            wheelFR.current.rotation.y += (invertedTargetAngle - currentAngle) * Math.min(turnSpeed * delta, 1);
          }
      });


      useFrame((_, delta) => {
        if (!bonnetPivot.current) return;
      
        const openSpeed = 4;
        const maxOpenAngle = -0.8;
      
        const targetAngle = bonnetPressed
          ? maxOpenAngle
          : 0;
      
        bonnetPivot.current.rotation.x = THREE.MathUtils.damp(
          bonnetPivot.current.rotation.x,
          targetAngle,
          openSpeed,
          delta
        );
      });

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

      <primitive  object={car.scene} scale = {100} position = {[0, 0.06, 0]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
  <planeGeometry args={[50, 50]} />
  <meshStandardMaterial side={DoubleSide} color="#FFF5F5" roughness={0.4} metalness={0.2} />
</mesh>
    </>
  )
}