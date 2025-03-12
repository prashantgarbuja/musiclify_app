import { useEffect, useRef } from 'react';

interface MBTIDonutChartProps {
  values: number[];
  labels: string[];
  delay?: number;
}

const MBTIDonutChart = ({ values, labels, delay = 0 }: MBTIDonutChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [value1, value2] = values;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // For retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    // Animation variables
    let animationProgress = 0;
    const animationDuration = 1500; // ms
    let startTime: number;
    
    // Draw background circle
    const drawBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(128, 90, 213, 0.2)';
      ctx.lineWidth = 10;
      ctx.stroke();
    };
    
    // Draw the donut segments
    const drawSegments = (progress: number) => {
      const total = value1 + value2;
      const normalizedValue1 = value1 / total;
      const normalizedValue2 = value2 / total;
      
      const endAngle1 = progress * normalizedValue1 * Math.PI * 2;
      const endAngle2 = progress * normalizedValue2 * Math.PI * 2 + endAngle1;
      
      // Create gradient for first segment
      const gradient1 = ctx.createLinearGradient(
        centerX - radius, centerY, centerX + radius, centerY
      );
      gradient1.addColorStop(0, '#1db954'); // music-primary
      gradient1.addColorStop(1, '#4ade80'); // light green
      
      // Create gradient for second segment
      const gradient2 = ctx.createLinearGradient(
        centerX - radius, centerY, centerX + radius, centerY
      );
      gradient2.addColorStop(0, '#8a2be2'); // purple
      gradient2.addColorStop(1, '#c084fc'); // light purple
      
      // Draw first segment
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, endAngle1);
      ctx.strokeStyle = gradient1;
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      // Draw second segment
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, endAngle1, endAngle2);
      ctx.strokeStyle = gradient2;
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      // Draw glowing effect
      if (progress >= 1) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(138, 43, 226, 0.1)';
        ctx.lineWidth = 24;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(29, 185, 84, 0.1)';
        ctx.lineWidth = 30;
        ctx.stroke();
      }
    };
    
    // Draw text
    const drawText = () => {
      // Center text with gradient
      const textGradient = ctx.createLinearGradient(
        centerX - 50, centerY, centerX + 50, centerY
      );
      textGradient.addColorStop(0, '#8a2be2'); // purple
      textGradient.addColorStop(1, '#1db954'); // music-primary
      
      ctx.fillStyle = textGradient;
      ctx.font = 'bold 24px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${labels[0]}/${labels[1]}`, centerX, centerY - 20);
      
      // Percentage text
      ctx.font = 'bold 20px Inter, sans-serif';
      ctx.fillText(`${Math.round(value1)}% / ${Math.round(value2)}%`, centerX, centerY + 20);
    };
    
    // Animation loop
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      animationProgress = Math.min(elapsed / animationDuration, 1);
      
      drawBackground();
      drawSegments(animationProgress);
      drawText();
      
      if (animationProgress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    // Start animation after delay
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);
    
    return () => {
      // Cleanup if needed
    };
  }, [values, labels, delay]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ maxWidth: '200px', maxHeight: '200px' }}
    />
  );
};

export default MBTIDonutChart;
