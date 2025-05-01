import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import earthDayMapUrl from '../../assets/earth_daymap.jpg';

interface EarthProps {
  rotationSpeed?: number;
}

export const Earth: React.FC<EarthProps> = ({ rotationSpeed = 0.001 }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Load Earth textures
  const earthTexture = useTexture(earthDayMapUrl);
  
  // Rotate Earth on each frame
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += rotationSpeed;
    }
    
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += rotationSpeed * 1.1;
    }
  });

  return (
    <group>
      {/* Ambient light for overall scene illumination */}
      <ambientLight intensity={0.1} />
      
      {/* Directional light to simulate sun */}
      <directionalLight 
        position={[5, 3, 5]} 
        intensity={1.5} 
        castShadow 
      />
      
      {/* Earth sphere */}
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 32]} />
        <meshStandardMaterial 
          map={earthTexture}
          metalness={0.1} 
          roughness={0.7}
        />
      </mesh>
      
      {/* Atmosphere glow effect */}
      <mesh ref={atmosphereRef} scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[1, 64, 32]} />
        <meshPhongMaterial 
          color="#88a2ff" 
          transparent={true} 
          opacity={0.2} 
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export default Earth; 
