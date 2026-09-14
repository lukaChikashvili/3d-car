"use client"
import { PerspectiveCamera, Environment, ContactShadows, useGLTF, Grid, useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { DoubleSide, Object3D } from "three";
import * as THREE from 'three'

interface ExperienceProps {
    carColor: string;
  }
  

export default function Experience({carColor} : ExperienceProps) {
     
    const car = useGLTF('/car.glb');
    const wheelFLPivot = useRef<Object3D | null>(null);
    const wheelFRPivot = useRef<Object3D | null>(null);

    const wheelFL = useRef<Object3D | null>(null);
    const wheelFR = useRef<Object3D | null>(null);

    const wheelRL = useRef<Object3D | null>(null);
    const wheelRR = useRef<Object3D | null>(null);

    const bonnetRef = useRef<Object3D | null>(null);
    const bonnetPivot = useRef<Object3D | null>(null);

    const carRef = useRef<THREE.Group>(null);

    const velocity = useRef(0);
    const steering = useRef(0);

    const lightsMatRef = useRef<THREE.MeshStandardMaterial | null>(null);


    const wheelForward = useKeyboardControls((state) => state.wheelForward);
    const wheelBackward = useKeyboardControls((state) => state.wheelBackward);
    const bonnetPressed = useKeyboardControls((state) => state.bonnet);
    const lightsPressed = useKeyboardControls((state) => state.headlights);

    const accelerate = useKeyboardControls( (state) => state.accelerate);
    const brake = useKeyboardControls((state) => state.brake);
    const turnLeft = useKeyboardControls((state) => state.turnLeft);
    const turnRight = useKeyboardControls( (state) => state.turnRight);
    const handbrake = useKeyboardControls((state) => state.handbrake );

    useEffect(() => {
        car.scene.traverse((child) => {
           

          if(child.name === "3DWheel_Front_L") {
            const pivot = new THREE.Object3D();

              child.parent?.add(pivot);
            
              pivot.position.copy(child.position);
              pivot.rotation.copy(child.rotation);
            
              child.position.set(0, 0, 0);
              child.rotation.set(0, 0, 0);
            
              pivot.add(child);
            
              wheelFLPivot.current = pivot;
              wheelFL.current = child;
          }
          if(child.name === "3DWheel_Front_R") {
            const pivot = new THREE.Object3D();

            child.parent?.add(pivot);
          
            pivot.position.copy(child.position);
            pivot.rotation.copy(child.rotation);
          
            child.position.set(0, 0, 0);
            child.rotation.set(0, 0, 0);
          
            pivot.add(child);
          
            wheelFRPivot.current = pivot;
            wheelFR.current = child;
          }

          if (child.name === "3DWheel_Rear_L") {
            wheelRL.current = child;
          }
          
          if (child.name === "3DWheel_Rear_R") {
            wheelRR.current = child;
          }

          if(child.name === "untitledSM_FrontKit_0000_009_SM_FrontKit_0000_009_MAT_CarPaint_SU7_Base_032_untitledMAT_Lights_216_0" || 
          child.name === "untitledSM_FrontKit_0000_009_SM_FrontKit_0000_009_MAT_CarPaint_SU7_Base_033_Light_glass_0") {
             // lights
             const mesh = child as THREE.Mesh;

             if(mesh.material) {
                const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
                lightsMatRef.current = mat as THREE.MeshStandardMaterial;
             }

          }

          if (!(child instanceof THREE.Mesh)) return;

          if(child.name === "untitledSM_FrontKit_0000_009_SM_FrontKit_0000_009_MAT_CarPaint_SU7_Base_030_untitledMAT_CarPaint_SU7_Base1_0") {
            child.material.color.set(carColor);
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
    }, [car, carColor])


    
useFrame((_, delta) => {
    if (!carRef.current) return;
  
    const maxSpeed = 8;
    const maxReverseSpeed = 3;
    const acceleration = 5;
    const brakeStrength = 10;
    const steeringSpeed = 5;
    const maxSteeringAngle = 0.55;
    const rollingResistance = 2;
  

    if (accelerate) {
      velocity.current += acceleration * delta;
    }
  
 
    if (brake) {
      if (velocity.current > 0) {
        velocity.current -= brakeStrength * delta;
      } else {
        velocity.current -= acceleration * delta;
      }
    }
  
 
    if (handbrake) {
      velocity.current *= Math.max(0, 1 - 8 * delta);
    }
  
  
    if (!accelerate && !brake) {
      if (velocity.current > 0) {
        velocity.current -= rollingResistance * delta;
      } else if (velocity.current < 0) {
        velocity.current += rollingResistance * delta;
      }
    }
  
    
    if (Math.abs(velocity.current) < 0.02) {
      velocity.current = 0;
    }
  
    velocity.current = THREE.MathUtils.clamp(
      velocity.current,
      -maxReverseSpeed,
      maxSpeed
    );
  
 
    let steeringTarget = 0;
  
    if (turnLeft) {
      steeringTarget = maxSteeringAngle;
    }
  
    if (turnRight) {
      steeringTarget = -maxSteeringAngle;
    }
  
    steering.current = THREE.MathUtils.damp(
      steering.current,
      steeringTarget,
      steeringSpeed,
      delta
    );
  

    if (Math.abs(velocity.current) > 0.01) {
      const turnStrength = 0.9;
  
      carRef.current.rotation.y +=
        steering.current *
        turnStrength *
        velocity.current *
        delta;
    }
  
    
    const distance = velocity.current * delta;
    carRef.current.translateZ(distance);
    
    const wheelRadius = 0.35;
    const wheelRotation = distance / wheelRadius;
    
    if (wheelFLPivot.current) {
        wheelFLPivot.current.rotation.y = steering.current;
      }
      
      if (wheelFRPivot.current) {
        wheelFRPivot.current.rotation.y = -steering.current;
      }
      
      if (wheelFL.current) {
        wheelFL.current.rotation.x += wheelRotation;
      }
      
      if (wheelFR.current) {
        wheelFR.current.rotation.x += wheelRotation;
      }
      
      if (wheelRL.current) {
        wheelRL.current.rotation.x += wheelRotation;
      }
      
      if (wheelRR.current) {
        wheelRR.current.rotation.x += wheelRotation;
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

  useFrame((_, delta) => {
    if (!lightsMatRef.current) return;
  
    const targetIntensity = lightsPressed ? 5 : 0;
  
    lightsMatRef.current.emissive.set("yellow");
  
    lightsMatRef.current.emissiveIntensity = THREE.MathUtils.damp(
      lightsMatRef.current.emissiveIntensity,
      targetIntensity,
      10,
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

<group
  ref={carRef}
  position={[0, 0.06, 0]}
>
  <primitive
    object={car.scene}
    scale={100}
  />
</group>



      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
  <planeGeometry args={[50, 50]} />
  <meshStandardMaterial side={DoubleSide} color="#FFF5F5" roughness={0.4} metalness={0.2} />
</mesh>

{lightsPressed && (
  <group position={[0, 0.6, 2.2]}> 
    
    <spotLight
      position={[-0.7, 0, 0]}
      target-position={[-0.7, 0, 10]}
      angle={0.4}
      penumbra={0.5}
      intensity={15}
      color="gold"
      castShadow
    />
  
    <spotLight
      position={[0.7, 0, 0]}
      target-position={[0.7, 0, 10]}
      angle={0.4}
      penumbra={0.5}
      intensity={15}
      color="#e6f2ff"
      castShadow
    />
  </group>
)}
    </>
  )
}