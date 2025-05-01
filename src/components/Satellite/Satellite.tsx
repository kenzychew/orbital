import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { useAppContext } from '../../context/AppContext';
import { calculatePosition, parseTLE } from '../../utils/satellite-calculations';
import { Satellite as SatelliteType } from '../../models/Satellite';

interface SatelliteProps {
  satellite: SatelliteType;
  labelVisible?: boolean;
  scale?: number;
  onClick?: () => void;
}

export const Satellite: React.FC<SatelliteProps> = ({
  satellite,
  labelVisible = true,
  scale = 0.02,
  onClick
}) => {
  const { currentTime, selectedSatellite } = useAppContext();
  const meshRef = useRef<THREE.Mesh>(null);
  const [position, setPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const satrec = parseTLE(satellite.tle);
  const isSelected = selectedSatellite?.id === satellite.id;
  
  // Update position based on current time
  useEffect(() => {
    const calculateAndSetPosition = () => {
      const newPosition = calculatePosition(satrec, currentTime);
      if (newPosition) {
        setPosition(new THREE.Vector3(newPosition.x, newPosition.y, newPosition.z));
      }
    };
    
    calculateAndSetPosition();
  }, [currentTime, satellite]);
  
  // Update mesh position
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(position);
    }
  });
  
  // Determine satellite color based on type
  const getSatelliteColor = () => {
    switch (satellite.type) {
      case 'Space Station':
        return 'skyblue';
      case 'Telescope':
        return 'purple';
      case 'Weather Satellite':
        return 'lightgreen';
      case 'Communication':
        return 'orange';
      default:
        return 'white';
    }
  };

  return (
    <group onClick={onClick} position={position}>
      <mesh ref={meshRef} scale={isSelected ? scale * 1.5 : scale}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={getSatelliteColor()}
          emissive={getSatelliteColor()}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {labelVisible && (
        <Billboard position={[0, scale * 1.5, 0]}>
          <Text
            fontSize={0.05}
            color={isSelected ? "yellow" : "white"}
            anchorX="center"
            anchorY="middle"
          >
            {satellite.name}
          </Text>
        </Billboard>
      )}
    </group>
  );
};

export default Satellite; 
