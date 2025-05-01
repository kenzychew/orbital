import { useState } from 'react';
import styles from './EarthControls.module.css';

export interface EarthControlsProps {
  rotationSpeed: number;
  onRotationSpeedChange: (speed: number) => void;
  autoRotate: boolean;
  onAutoRotateChange: (auto: boolean) => void;
}

export const EarthControls: React.FC<EarthControlsProps> = ({
  rotationSpeed,
  onRotationSpeedChange,
  autoRotate,
  onAutoRotateChange
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.controls}>
      <button 
        onClick={() => setIsVisible(!isVisible)} 
        className={styles.toggleButton}
      >
        {isVisible ? 'Hide Controls' : 'Show Controls'}
      </button>
      
      {isVisible && (
        <div className={styles.panel}>
          <div className={styles.control}>
            <label htmlFor="auto-rotate">
              <input
                id="auto-rotate"
                type="checkbox"
                checked={autoRotate}
                onChange={(e) => onAutoRotateChange(e.target.checked)}
              />
              Auto Rotate
            </label>
          </div>
          
          <div className={styles.control}>
            <label htmlFor="rotation-speed">Rotation Speed</label>
            <input
              id="rotation-speed"
              type="range"
              min="0"
              max="0.2"
              step="0.01"
              value={rotationSpeed}
              onChange={(e) => onRotationSpeedChange(parseFloat(e.target.value))}
              disabled={!autoRotate}
            />
            <span className={styles.value}>{rotationSpeed.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarthControls; 
