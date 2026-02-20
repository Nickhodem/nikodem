import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
}

const GLOW_SPRITE_SIZE = 48;

const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];
    const nodeCount = 30;
    const connectionDistance = 280;
    const FRAME_INTERVAL = 1000 / 30; // 30fps cap
    let lastFrameTime = 0;

    // Pre-render a single glow sprite once — avoids creating 30 radial
    // gradients every frame (the main CPU culprit).
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = GLOW_SPRITE_SIZE;
    glowCanvas.height = GLOW_SPRITE_SIZE;
    const glowCtx = glowCanvas.getContext("2d")!;
    const half = GLOW_SPRITE_SIZE / 2;
    const gradient = glowCtx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, "hsla(160, 80%, 48%, 0.3)");
    gradient.addColorStop(1, "hsla(160, 80%, 48%, 0)");
    glowCtx.fillStyle = gradient;
    glowCtx.fillRect(0, 0, GLOW_SPRITE_SIZE, GLOW_SPRITE_SIZE);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initNodes = () => {
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 3 + 2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      }));
    };

    const draw = (timestamp: number) => {
      animationId = requestAnimationFrame(draw);

      if (timestamp - lastFrameTime < FRAME_INTERVAL) return;
      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.4;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `hsla(160, 80%, 48%, ${opacity})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        node.pulse += node.pulseSpeed;
        const pulseFactor = 0.5 + Math.sin(node.pulse) * 0.5;
        const r = node.radius * (0.8 + pulseFactor * 0.4);

        // Glow via pre-rendered sprite — no gradient creation per frame
        const glowR = r * 6;
        ctx.globalAlpha = pulseFactor * 0.8;
        ctx.drawImage(glowCanvas, node.x - glowR, node.y - glowR, glowR * 2, glowR * 2);
        ctx.globalAlpha = 1;

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(160, 80%, 60%, ${0.6 + pulseFactor * 0.4})`;
        ctx.fill();

        // Move
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        lastFrameTime = 0;
        animationId = requestAnimationFrame(draw);
      }
    };

    const handleResize = () => { resize(); initNodes(); };

    resize();
    initNodes();
    animationId = requestAnimationFrame(draw);

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default NeuralBackground;
