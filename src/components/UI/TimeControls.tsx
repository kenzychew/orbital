import React from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './TimeControls.module.css';

export const TimeControls: React.FC = () => {
  const { currentTime, updateTime } = useAppContext();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(1);

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Effect to update time based on speed when playing
  React.useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      updateTime(new Date(currentTime.getTime() + 1000 * speed));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, speed, currentTime, updateTime]);

  // Change simulation speed
  const changeSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  // Reset to real time
  const resetTime = () => {
    updateTime(new Date());
    setIsPlaying(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.display}>
        {formatDate(currentTime)}
      </div>
      
      <div className={styles.controls}>
        <button 
          className={styles.button} 
          onClick={resetTime}
          title="Reset to current time"
        >
          Reset
        </button>
        
        <button 
          className={`${styles.button} ${styles.playButton}`} 
          onClick={togglePlay}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <div className={styles.speedControls}>
          <span>Speed:</span>
          <select 
            value={speed} 
            onChange={(e) => changeSpeed(Number(e.target.value))}
            className={styles.select}
            disabled={!isPlaying}
          >
            <option value="0.1">0.1x</option>
            <option value="1">1x</option>
            <option value="10">10x</option>
            <option value="60">60x</option>
            <option value="3600">3600x (1h/s)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimeControls; 
