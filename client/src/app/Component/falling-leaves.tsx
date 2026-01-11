"use client"

import { useEffect, useRef } from "react"

interface Leaf {
  x: number
  y: number
  size: number
  speed: number
  rotation: number
  rotationSpeed: number
  color: string
  opacity: number
  shape: number
}

export default function FallingLeaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // New color palette
    const colors = [
      // Dominant colors (higher frequency)
     
      "#FFEE59", // Soft Yellow
      "#FFEE59", // Soft Yellow (repeated for higher frequency)
      
      // Support colors
      "#A3D9A5", // Mint Green
  

  
      // Highlight color
    
    ]

    // Create leaves
    const leaves: Leaf[] = []
    const leafCount = Math.min(Math.floor(window.innerWidth / 15), 50) // Responsive leaf count

    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * -1 - 100, // Start above the canvas
        size: Math.random() * 15 + 10,
        speed: Math.random() * 1 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
        shape: Math.floor(Math.random() * 3), // 0: maple, 1: oval, 2: round
      })
    }

    // Draw a leaf
    const drawLeaf = (leaf: Leaf) => {
      if (!ctx) return

      ctx.save()
      ctx.translate(leaf.x, leaf.y)
      ctx.rotate(leaf.rotation)
      ctx.globalAlpha = leaf.opacity
      ctx.fillStyle = leaf.color

      // Different leaf shapes
      if (leaf.shape === 0) {
        // Maple leaf shape (simplified)
        ctx.beginPath()
        const size = leaf.size
        ctx.moveTo(0, -size / 2)
        ctx.bezierCurveTo(size / 4, -size / 2, size / 2, -size / 4, size / 2, 0)
        ctx.bezierCurveTo(size / 2, size / 4, size / 4, size / 2, 0, size / 2)
        ctx.bezierCurveTo(-size / 4, size / 2, -size / 2, size / 4, -size / 2, 0)
        ctx.bezierCurveTo(-size / 2, -size / 4, -size / 4, -size / 2, 0, -size / 2)
        ctx.fill()

        // Stem
        ctx.beginPath()
        ctx.moveTo(0, size / 2)
        ctx.lineTo(0, size)
        ctx.lineWidth = size / 15
        ctx.strokeStyle = leaf.color
        ctx.stroke()
      } else if (leaf.shape === 1) {
        // Oval leaf
        ctx.beginPath()
        ctx.ellipse(0, 0, leaf.size / 2, leaf.size, 0, 0, Math.PI * 2)
        ctx.fill()

        // Vein
        ctx.beginPath()
        ctx.moveTo(0, -leaf.size)
        ctx.lineTo(0, leaf.size)
        ctx.lineWidth = leaf.size / 15
        ctx.strokeStyle = `${leaf.color}80`
        ctx.stroke()
      } else {
        // Round leaf
        ctx.beginPath()
        ctx.arc(0, 0, leaf.size / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw each leaf
      leaves.forEach((leaf) => {
        // Update position
        leaf.y += leaf.speed
        leaf.x += Math.sin(leaf.y * 0.01) * 0.5 // Gentle side-to-side movement
        leaf.rotation += leaf.rotationSpeed

        // Reset if leaf goes off screen
        if (leaf.y > canvas.height + leaf.size) {
          leaf.y = -leaf.size * 2
          leaf.x = Math.random() * canvas.width
        }

        drawLeaf(leaf)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
}