import { useEffect, useCallback } from 'react';
import * as THREE from 'three';

interface KeyboardNavigationOptions {
  cameraRef: React.RefObject<THREE.Camera>;
  speed?: number;
  enabled?: boolean;
}

export const useKeyboardNavigation = ({
  cameraRef,
  speed = 0.1,
  enabled = true
}: KeyboardNavigationOptions) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!cameraRef.current || !enabled) return;

    const camera = cameraRef.current;
    
    switch (event.key) {
      case 'ArrowUp':
        camera.position.z -= speed;
        break;
      case 'ArrowDown':
        camera.position.z += speed;
        break;
      case 'ArrowLeft':
        camera.position.x -= speed;
        break;
      case 'ArrowRight':
        camera.position.x += speed;
        break;
      case '+':
      case '=':
        // Zoom in
        camera.position.z = Math.max(1.5, camera.position.z - speed * 2);
        break;
      case '-':
      case '_':
        // Zoom out
        camera.position.z += speed * 2;
        break;
      case 'r':
      case 'R':
        // Reset position
        camera.position.set(0, 0, 3);
        camera.lookAt(0, 0, 0);
        break;
      default:
        break;
    }
  }, [cameraRef, speed, enabled]);

  useEffect(() => {
    if (enabled) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, enabled]);

  return null;
};

export default useKeyboardNavigation; 
