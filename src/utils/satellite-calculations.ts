import * as satellite from 'satellite.js';
import { Satellite, SatellitePosition } from '../models/Satellite';

// Earth radius in kilometers
export const EARTH_RADIUS = 6371;
// Scale factor for visualization (Earth radius = 1 unit in our 3D world)
export const SCALE_FACTOR = 1 / EARTH_RADIUS;

/**
 * Converts TLE data to a satellite.js instance
 */
export function parseTLE(tle: { line1: string; line2: string; }): satellite.twoline2satrec {
  return satellite.twoline2satrec(tle.line1, tle.line2);
}

/**
 * Calculate the position of a satellite at a given time
 * Returns position in 3D space (x, y, z) normalized to Earth radius = 1
 */
export function calculatePosition(satrec: satellite.twoline2satrec, date: Date): SatellitePosition | null {
  try {
    // Get position in km
    const positionAndVelocity = satellite.propagate(satrec, date);
    const gmst = satellite.gstime(date);
    const position = satellite.eciToEcf(positionAndVelocity.position, gmst);

    // Convert to normalized coordinates where Earth radius = 1
    return {
      x: position.x * SCALE_FACTOR,
      y: position.z * SCALE_FACTOR, // Swap y and z to match Three.js coordinate system
      z: -position.y * SCALE_FACTOR, // Negate y to match Three.js coordinate system
      time: date
    };
  } catch (error) {
    console.error('Error calculating satellite position:', error);
    return null;
  }
}

/**
 * Calculate the orbit path for a satellite
 * Returns an array of positions at regular intervals
 */
export function calculateOrbitPath(
  satellite: Satellite, 
  startTime: Date, 
  pointCount: number = 100, 
  periodMinutes: number = 180
): SatellitePosition[] {
  const satrec = parseTLE(satellite.tle);
  const timeStep = (periodMinutes * 60 * 1000) / pointCount;
  const positions: SatellitePosition[] = [];

  for (let i = 0; i < pointCount; i++) {
    const time = new Date(startTime.getTime() + i * timeStep);
    const position = calculatePosition(satrec, time);
    if (position) {
      positions.push(position);
    }
  }

  return positions;
}

/**
 * Check if a satellite is currently visible (above the horizon)
 */
export function isSatelliteVisible(position: SatellitePosition): boolean {
  // Calculate distance from Earth center
  const distance = Math.sqrt(position.x * position.x + position.y * position.y + position.z * position.z);
  return distance > 1.0; // If distance > Earth radius, satellite is above the surface
}

/**
 * Calculate Earth-centered, Earth-fixed coordinates from lat, lng, altitude
 */
export function geodeticToECEF(latitude: number, longitude: number, altitude: number): { x: number, y: number, z: number } {
  const latRad = latitude * (Math.PI / 180);
  const lonRad = longitude * (Math.PI / 180);
  
  const radiusAtLatitude = EARTH_RADIUS * Math.cos(latRad);
  
  return {
    x: (radiusAtLatitude + altitude) * Math.cos(lonRad) * SCALE_FACTOR,
    y: (radiusAtLatitude + altitude) * Math.sin(lonRad) * SCALE_FACTOR,
    z: (EARTH_RADIUS * Math.sin(latRad) + altitude) * SCALE_FACTOR
  };
} 
