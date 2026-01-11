import { useEffect, useRef } from "react";

interface Leaf {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  shape: number;
}

export default function FallingLeaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Softer, more calming colors
    const colors = [
      "rgba(156, 175, 136, 0.4)", // sage
      "rgba(144, 190, 144, 0.3)", // soft green
      "rgba(173, 198, 173, 0.35)", // muted green
      "rgba(152, 255, 152, 0.25)", // light mint
      "rgba(128, 128, 0, 0.2)",    // soft olive
    ];

    const leaves: Leaf[] = [];
    const leafCount = Math.min(Math.floor(window.innerWidth / 25), 30); // Reduced leaf count

    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * -1 - 100,
        size: Math.random() * 12 + 8, // Slightly smaller leaves
        speed: Math.random() * 0.8 + 0.3, // Slower falling
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008, // Slower rotation
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.2, // More transparent
        shape: Math.floor(Math.random() * 3),
      });
    }

    const drawLeaf = (leaf: Leaf) => {
      if (!ctx) return;

      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.globalAlpha = leaf.opacity;
      ctx.fillStyle = leaf.color;

      if (leaf.shape === 0) {
        // Simplified maple leaf
        const size = leaf.size;
        ctx.beginPath();
        ctx.moveTo(0, -size / 2);
        ctx.bezierCurveTo(
          size / 4, -size / 2,
          size / 2, -size / 4,
          size / 2, 0
        );
        ctx.bezierCurveTo(
          size / 2, size / 4,
          size / 4, size / 2,
          0, size / 2
        );
        ctx.bezierCurveTo(
          -size / 4, size / 2,
          -size / 2, size / 4,
          -size / 2, 0
        );
        ctx.bezierCurveTo(
          -size / 2, -size / 4,
          -size / 4, -size / 2,
          0, -size / 2
        );
        ctx.fill();
      } else if (leaf.shape === 1) {
        // Oval leaf
        ctx.beginPath();
        ctx.ellipse(0, 0, leaf.size / 2, leaf.size, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Round leaf
        ctx.beginPath();
        ctx.arc(0, 0, leaf.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      leaves.forEach((leaf) => {
        leaf.y += leaf.speed;
        leaf.x += Math.sin(leaf.y * 0.008) * 0.4; // Gentler side movement
        leaf.rotation += leaf.rotationSpeed;

        if (leaf.y > canvas.height + leaf.size) {
          leaf.y = -leaf.size * 2;
          leaf.x = Math.random() * canvas.width;
        }

        drawLeaf(leaf);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.8 }} // Slightly reduced opacity
    />
  );
}