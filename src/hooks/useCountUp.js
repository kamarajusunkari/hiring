import { useState, useEffect } from 'react';

/**
 * Custom hook to animate a numeric count from start to end with easing.
 * Spec: animates 0 to 20 over 2s with easeOutCubic, starts after 1.2s delay.
 */
export function useCountUp(end = 20, duration = 2000, delay = 1200) {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let animationFrameId;
    let startTime = null;

    const timeoutId = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutCubic: 1 - (1 - t)^3
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(easeProgress * end);
        
        setCount(currentVal);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setCount(end);
          setIsComplete(true);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration, delay]);

  return { count, isComplete };
}

export default useCountUp;
