import { Satellite } from '../models/Satellite';

// Sample TLE data for common satellites
// In a real app, this would come from an API like Celestrak or Space-Track
const SAMPLE_SATELLITES: Satellite[] = [
  {
    id: 'iss',
    name: 'ISS (ZARYA)',
    noradId: 25544,
    tle: {
      line1: '1 25544U 98067A   23094.31519782  .00017274  00000+0  31157-3 0  9990',
      line2: '2 25544  51.6429 352.7947 0006914  23.5387 339.2899 15.49456636391271'
    },
    type: 'Space Station',
    countryCode: 'ISS',
  },
  {
    id: 'hubble',
    name: 'HUBBLE SPACE TELESCOPE',
    noradId: 20580,
    tle: {
      line1: '1 20580U 90037B   23094.14712113  .00000595  00000+0  21755-4 0  9994',
      line2: '2 20580  28.4682 286.8789 0001852 156.8086 203.2930 15.10132822694281'
    },
    type: 'Telescope',
    countryCode: 'USA',
  },
  {
    id: 'noaa19',
    name: 'NOAA 19',
    noradId: 33591,
    tle: {
      line1: '1 33591U 09005A   23094.51122844  .00000090  00000+0  64725-4 0  9994',
      line2: '2 33591  99.1286  57.1296 0014406 320.3785  39.6204 14.12582353731517'
    },
    type: 'Weather Satellite',
    countryCode: 'USA',
  },
  {
    id: 'starlink-1',
    name: 'STARLINK-1',
    noradId: 44235,
    tle: {
      line1: '1 44235U 19029A   23094.51528905  .00006829  00000+0  40447-3 0  9990',
      line2: '2 44235  53.0528 214.5037 0001271  86.7372 273.3775 15.06386946213333'
    },
    type: 'Communication',
    countryCode: 'USA',
  },
  {
    id: 'tiangong',
    name: 'TIANGONG',
    noradId: 48274,
    tle: {
      line1: '1 48274U 21035A   23094.89639105  .00009370  00000+0  11639-3 0  9990',
      line2: '2 48274  41.4690 309.5797 0004057 315.0440  45.0146 15.60246561102128'
    },
    type: 'Space Station',
    countryCode: 'CHN',
  }
];

/**
 * Fetch satellite data (mock implementation)
 */
export async function fetchSatellites(): Promise<Satellite[]> {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(SAMPLE_SATELLITES);
    }, 500);
  });
}

/**
 * Fetch TLE data for a specific satellite by NORAD ID
 */
export async function fetchSatelliteById(noradId: number): Promise<Satellite | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const satellite = SAMPLE_SATELLITES.find(sat => sat.noradId === noradId);
      resolve(satellite);
    }, 300);
  });
}

/**
 * Get the latest TLE data for all satellites
 * In a real app, this would refresh the TLE data from a service
 */
export async function refreshTLEData(): Promise<Satellite[]> {
  // This would normally fetch fresh TLEs from an API
  return fetchSatellites();
} 
