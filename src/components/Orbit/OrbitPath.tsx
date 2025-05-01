import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { SatellitePosition } from '../../models/Satellite';

interface OrbitPathProps {
  points: SatellitePosition[];
  color?: string;
  width?: number;
  opacity?: number;
  dashed?: boolean;
}

export const OrbitPath: React.FC<OrbitPathProps> = ({
  points,
  color = '#ffffff',
  width = 0.5,
  opacity = 0.7,
  dashed = false
}) => {
  // Convert points to Vector3 array
  const linePoints = useMemo(() => {
    return points.map(point => new THREE.Vector3(point.x, point.y, point.z));
  }, [points]);

  return (
    <Line
      points={linePoints}
      color={color}
      lineWidth={width}
      transparent
      opacity={opacity}
      dashed={dashed}
    />
  );
};

export default OrbitPath; 
