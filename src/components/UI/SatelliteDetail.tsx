import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { calculatePosition, parseTLE } from '../../utils/satellite-calculations';
import styles from './SatelliteDetail.module.css';

export const SatelliteDetail: React.FC = () => {
  const { selectedSatellite, currentTime } = useAppContext();
  
  if (!selectedSatellite) {
    return null;
  }
  
  // Calculate current position
  const satrec = parseTLE(selectedSatellite.tle);
  const position = calculatePosition(satrec, currentTime);
  
  // Format position values
  const formatCoordinate = (value: number | undefined): string => {
    if (value === undefined) return 'N/A';
    return value.toFixed(2);
  };
  
  // Get TLE age in days
  const getTLEAge = (): string => {
    // TLE epoch is encoded in the first line
    const epochStr = selectedSatellite.tle.line1.substring(18, 32).trim();
    
    // Parse epoch (simplified, real apps need more precision)
    const year = parseInt(epochStr.substring(0, 2));
    const dayOfYear = parseFloat(epochStr.substring(2));
    
    const now = new Date();
    const epochYear = year + (year < 57 ? 2000 : 1900);
    
    // Create date from year and day of year
    const epochDate = new Date(epochYear, 0);
    epochDate.setDate(dayOfYear);
    
    // Get difference in days
    const diffTime = now.getTime() - epochDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    return diffDays.toFixed(1);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{selectedSatellite.name}</h2>
        <div className={styles.idBadge}>NORAD ID: {selectedSatellite.noradId}</div>
      </div>
      
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Current Position</h3>
        <div className={styles.grid}>
          <div className={styles.gridItem}>
            <div className={styles.label}>X</div>
            <div className={styles.value}>{formatCoordinate(position?.x)}</div>
          </div>
          <div className={styles.gridItem}>
            <div className={styles.label}>Y</div>
            <div className={styles.value}>{formatCoordinate(position?.y)}</div>
          </div>
          <div className={styles.gridItem}>
            <div className={styles.label}>Z</div>
            <div className={styles.value}>{formatCoordinate(position?.z)}</div>
          </div>
        </div>
      </div>
      
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>TLE Data</h3>
        <div className={styles.tleData}>
          <div className={styles.tleLine}>{selectedSatellite.tle.line1}</div>
          <div className={styles.tleLine}>{selectedSatellite.tle.line2}</div>
          <div className={styles.ageInfo}>TLE Age: {getTLEAge()} days</div>
        </div>
      </div>
      
      <div className={styles.metadata}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Type:</span>
          <span className={styles.metaValue}>{selectedSatellite.type || 'Unknown'}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Country:</span>
          <span className={styles.metaValue}>{selectedSatellite.countryCode || 'Unknown'}</span>
        </div>
      </div>
    </div>
  );
};

export default SatelliteDetail; 
