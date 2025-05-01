import { useState, useEffect, useCallback } from 'react';

interface UseTimeOptions {
  initialTime?: Date;
  initialSpeed?: number;
  initialPlaying?: boolean;
  onTimeChange?: (time: Date) => void;
}

export const useTime = ({
  initialTime = new Date(),
  initialSpeed = 1,
  initialPlaying = false,
  onTimeChange
}: UseTimeOptions = {}) => {
  const [time, setTime] = useState<Date>(initialTime);
  const [speed, setSpeed] = useState<number>(initialSpeed);
  const [isPlaying, setIsPlaying] = useState<boolean>(initialPlaying);
  
  // Function to update time with the given speed
  const updateTime = useCallback(() => {
    if (!isPlaying) return;
    
    setTime(prevTime => {
      const newTime = new Date(prevTime.getTime() + 1000 * speed);
      
      if (onTimeChange) {
        onTimeChange(newTime);
      }
      
      return newTime;
    });
  }, [isPlaying, speed, onTimeChange]);
  
  // Start or stop the simulation
  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);
  
  // Set a specific time
  const setSpecificTime = useCallback((newTime: Date) => {
    setTime(newTime);
    if (onTimeChange) {
      onTimeChange(newTime);
    }
  }, [onTimeChange]);
  
  // Reset time to current real time
  const resetToRealTime = useCallback(() => {
    const now = new Date();
    setTime(now);
    if (onTimeChange) {
      onTimeChange(now);
    }
  }, [onTimeChange]);
  
  // Adjust simulation speed
  const adjustSpeed = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);
  
  // Run the simulation loop
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(updateTime, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, updateTime]);
  
  return {
    time,
    speed,
    isPlaying,
    togglePlay,
    setSpecificTime,
    resetToRealTime,
    adjustSpeed
  };
};

export default useTime; 
