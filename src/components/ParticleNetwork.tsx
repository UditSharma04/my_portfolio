import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  color: string;
}

const ParticleNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 });
  
  const [canvasSize, setCanvasSize] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });

  // Generate random color in the blue/purple spectrum
  const getRandomColor = useCallback(() => {
    const hue = Math.random() * 60 + 220; // 220-280 range for blue/purple
    const saturation = Math.random() * 30 + 70; // 70-100%
    const lightness = Math.random() * 20 + 50; // 50-70%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }, []);

  // Memoize particle creation
  const createParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.min(80, Math.floor((width * height) / 15000));
    const particles: Particle[] = [];
    const particleSpeed = Math.min(0.8, width / 2500);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * particleSpeed,
        dy: (Math.random() - 0.5) * particleSpeed,
        radius: Math.random() * 2 + 1,
        color: getRandomColor()
      });
    }
    return particles;
  }, [getRandomColor]);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  }, []);

  // Memoize animation function
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const connectionDistance = Math.min(150, canvas.width / 8);
    const mouse = mouseRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((particle, i) => {
      // Move particle
      particle.x += particle.dx;
      particle.y += particle.dy;

      // Mouse interaction
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        particle.x -= Math.cos(angle) * force * 2;
        particle.y -= Math.sin(angle) * force * 2;
      }

      // Bounce off walls with smoother transition
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.dx *= -0.8;
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.dy *= -0.8;
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      }

      // Draw particle with gradient
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.radius * 2
      );
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, 'rgba(116, 119, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Connect particles
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const otherParticle = particlesRef.current[j];
        const dx = otherParticle.x - particle.x;
        const dy = otherParticle.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.5;
          const gradient = ctx.createLinearGradient(
            particle.x, particle.y,
            otherParticle.x, otherParticle.y
          );
          gradient.addColorStop(0, `${particle.color.replace(')', `, ${opacity})`).replace('hsl', 'hsla')}`);
          gradient.addColorStop(1, `${otherParticle.color.replace(')', `, ${opacity})`).replace('hsl', 'hsla')}`);

          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Handle resize with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (canvasRef.current) {
          const { clientWidth, clientHeight } = canvasRef.current;
          setCanvasSize({ width: clientWidth, height: clientHeight });
          particlesRef.current = createParticles(clientWidth, clientHeight);
        }
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [createParticles, handleMouseMove]);

  // Initialize and cleanup animation
  useEffect(() => {
    if (!canvasRef.current) return;

    particlesRef.current = createParticles(canvasSize.width, canvasSize.height);
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasSize, createParticles, animate]);

  return (
    <canvas 
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      className="fixed inset-0 pointer-events-none opacity-30 z-0"
      style={{ 
        filter: 'blur(0.5px)',
        willChange: 'transform'
      }}
    />
  );
};

export default React.memo(ParticleNetwork);
