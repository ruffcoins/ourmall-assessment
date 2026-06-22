import { useState, useEffect } from 'react';

interface CountdownResult {
  formattedTime: string;
  isExpired: boolean;
  timeLeftMs: number;
}

export function useCountdown(targetDate: string): CountdownResult {
  const calculateTimeLeft = (): CountdownResult => {
    const difference = new Date(targetDate).getTime() - Date.now();
    
    if (difference <= 0) {
      return {
        formattedTime: 'Offer ended',
        isExpired: true,
        timeLeftMs: 0,
      };
    }

    const totalSeconds = Math.floor(difference / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let formattedTime = '';
    if (hours > 0) {
      const paddedMinutes = minutes.toString().padStart(2, '0');
      const paddedSeconds = seconds.toString().padStart(2, '0');
      formattedTime = `${hours}h ${paddedMinutes}m ${paddedSeconds}s`;
    } else {
      const paddedMinutes = minutes.toString().padStart(2, '0');
      const paddedSeconds = seconds.toString().padStart(2, '0');
      formattedTime = `${paddedMinutes}:${paddedSeconds}`;
    }

    return {
      formattedTime,
      isExpired: false,
      timeLeftMs: difference,
    };
  };

  const [countdown, setCountdown] = useState<CountdownResult>(calculateTimeLeft());

  useEffect(() => {
    setCountdown(calculateTimeLeft());

    const timer = setInterval(() => {
      const current = calculateTimeLeft();
      setCountdown(current);

      if (current.isExpired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return countdown;
}
