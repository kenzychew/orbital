import React from 'react';
import { useAppContext } from '../context/AppContext';
import Earth from './Earth/Earth';
import Satellite from './Satellite/Satellite';
import OrbitPath from './Orbit/OrbitPath';
import { Satellite as SatelliteType } from '../models/Satellite';

export const Scene: React.FC = () => {
  const { 
    satellites, 
    orbitPaths, 
    selectedSatellite, 
    setSelectedSatellite 
  } = useAppContext();

  return (
    <>
      {/* Earth */}
      <Earth rotationSpeed={0.0005} />
      
      {/* Satellites and their orbits */}
      {satellites.map((satellite: SatelliteType) => {
        const isSelected = selectedSatellite?.id === satellite.id;
        const orbitPath = orbitPaths[satellite.id];
        
        return (
          <React.Fragment key={satellite.id}>
            {/* Render orbit path */}
            {orbitPath && (
              <OrbitPath
                points={orbitPath.points}
                color={isSelected ? '#ffcc00' : '#ffffff'}
                width={isSelected ? 1 : 0.5}
                opacity={isSelected ? 0.8 : 0.4}
                dashed={false}
              />
            )}
            
            {/* Render satellite */}
            <Satellite
              satellite={satellite}
              labelVisible={isSelected || false}
              scale={isSelected ? 0.03 : 0.02}
              onClick={() => setSelectedSatellite(isSelected ? null : satellite)}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Scene; 
