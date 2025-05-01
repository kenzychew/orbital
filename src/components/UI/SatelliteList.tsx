import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Satellite } from '../../models/Satellite';
import styles from './SatelliteList.module.css';

export const SatelliteList: React.FC = () => {
  const { 
    satellites, 
    selectedSatellite, 
    setSelectedSatellite,
    isLoading,
    error
  } = useAppContext();

  const handleSelect = (satellite: Satellite) => {
    setSelectedSatellite(selectedSatellite?.id === satellite.id ? null : satellite);
  };

  if (isLoading) {
    return <div className={styles.container}>Loading satellites...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Satellites</h2>
      <ul className={styles.list}>
        {satellites.map(satellite => (
          <li
            key={satellite.id}
            className={`${styles.item} ${selectedSatellite?.id === satellite.id ? styles.selected : ''}`}
            onClick={() => handleSelect(satellite)}
          >
            <span className={styles.name}>{satellite.name}</span>
            <div className={styles.meta}>
              <span className={styles.type}>{satellite.type}</span>
              <span className={styles.country}>{satellite.countryCode}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SatelliteList; 
