export interface Satellite {
  id: string;
  name: string;
  noradId: number;
  tle: {
    line1: string;
    line2: string;
  };
  // Calculated orbit data
  position?: {
    x: number;
    y: number;
    z: number;
  };
  velocity?: {
    x: number;
    y: number;
    z: number;
  };
  // Additional metadata
  launchDate?: Date;
  type?: string;
  countryCode?: string;
  isSelected?: boolean;
}

export interface SatellitePosition {
  x: number;
  y: number;
  z: number;
  time: Date;
}

export interface OrbitPath {
  satelliteId: string;
  points: SatellitePosition[];
} 
