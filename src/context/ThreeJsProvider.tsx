import React, { createContext, useContext, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

type ThreeJsContextType = Record<string, unknown>;

const ThreeJsContext = createContext<ThreeJsContextType | undefined>(undefined);

export const useThreeJs = () => {
  const context = useContext(ThreeJsContext);
  if (!context) {
    throw new Error('useThreeJs must be used within a ThreeJsProvider');
  }
  return context;
};

interface ThreeJsProviderProps {
  children: ReactNode;
}

export const ThreeJsProvider: React.FC<ThreeJsProviderProps> = ({ children }) => {
  // We could add more state or refs here to control the 3D scene globally
  
  const value: ThreeJsContextType = {};
  
  return (
    <ThreeJsContext.Provider value={value}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        style={{ 
          background: 'radial-gradient(#000233, #000)', 
          height: '100vh',
          width: '100%'
        }}
      >
        {/* Default lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        
        {/* Default orbit controls */}
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05} 
          rotateSpeed={0.5}
          zoomSpeed={0.5}
        />
        
        {/* Starfield background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        
        {children}
      </Canvas>
    </ThreeJsContext.Provider>
  );
};

export default ThreeJsProvider; 
