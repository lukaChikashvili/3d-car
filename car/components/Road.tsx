import { useMemo } from 'react'
import * as THREE from 'three'

interface RoadProps {
  width?: number
  length?: number
  crossingEvery?: number   
  crossingWidth?: number  
}

export default function Road({
  width = 8,
  length = 200,
  crossingEvery = 40,
  crossingWidth = 3,
}: RoadProps) {
  const roadTexture = useMemo(() => {
    const PIXELS_PER_UNIT = 32 
    const canvasWidth = 128   
    const canvasHeight = Math.min(length * PIXELS_PER_UNIT, 8192) 

    const canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    const ctx = canvas.getContext('2d')!

    // base asphalt
    ctx.fillStyle = '#4A4A4A'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    const unitToPx = canvasHeight / length
    const dashLength = 1 * unitToPx 
    const dashGap = 1 * unitToPx    
    const laneWidthPx = 6
    const laneX = canvasWidth / 2 - laneWidthPx / 2

    ctx.fillStyle = '#F5C518'
    for (let y = 0; y < canvasHeight; y += dashLength + dashGap) {
      const worldY = y / unitToPx
      const distIntoInterval = worldY % crossingEvery
      const inCrossingZone = distIntoInterval < crossingWidth
      if (!inCrossingZone) {
        ctx.fillRect(laneX, y, laneWidthPx, dashLength)
      }
    }

  
    const stripeCount = 8
    const crossingHeightPx = crossingWidth * unitToPx
    const stripeGap = crossingHeightPx / (stripeCount * 2 - 1)

    ctx.fillStyle = '#ffffff'
    for (let worldY = crossingEvery; worldY < length; worldY += crossingEvery) {
      const startY = worldY * unitToPx
      for (let s = 0; s < stripeCount; s++) {
        const stripeY = startY + s * stripeGap * 2
        ctx.fillRect(0, stripeY, canvasWidth, stripeGap)
      }
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = THREE.ClampToEdgeWrapping
    tex.wrapT = THREE.ClampToEdgeWrapping
    tex.repeat.set(1, 1)
    tex.needsUpdate = true
    return tex
  }, [length, crossingEvery, crossingWidth])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} receiveShadow>
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial map={roadTexture} roughness={0.9} metalness={0.05} />
    </mesh>
  )
}