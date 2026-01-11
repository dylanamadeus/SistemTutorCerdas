import { useState, useEffect } from 'react';

interface TimerConfig {
  initialSeconds: number;
  onTimeEnd?: () => void;
}

export const useTimer = ({ initialSeconds, onTimeEnd }: TimerConfig) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  // Add this effect to update timeLeft when initialSeconds changes
  useEffect(() => {
    setTimeLeft(initialSeconds);
    setIsRunning(true);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          onTimeEnd?.();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')} : ${String(
    seconds
  ).padStart(2, '0')}`;

  return {
    timeLeft,
    formattedTime,
    isRunning,
    setIsRunning,
  };
};
