import { useState, useEffect, useCallback } from 'react';
import { Satellite } from '../models/Satellite';
import { fetchSatellites, fetchSatelliteById } from '../api/satellite-data';
import { calculatePosition, parseTLE } from '../utils/satellite-calculations';

interface UseTLEOptions {
  initialNoradId?: number;
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
}

export const useTLE = ({
  initialNoradId,
  autoRefresh = false,
  refreshInterval = 3600000 // Default: 1 hour
}: UseTLEOptions = {}) => {
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all available satellites
  const fetchAllSatellites = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchSatellites();
      setSatellites(data);
      
      // If initialNoradId is provided, select that satellite
      if (initialNoradId) {
        const selected = data.find(sat => sat.noradId === initialNoradId);
        if (selected) {
          setSelectedSatellite(selected);
        }
      }
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch satellites');
      setIsLoading(false);
      console.error(err);
    }
  }, [initialNoradId]);

  // Fetch a specific satellite by NORAD ID
  const fetchSatellite = useCallback(async (noradId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const satellite = await fetchSatelliteById(noradId);
      if (satellite) {
        setSelectedSatellite(satellite);
        
        // Make sure this satellite is in our list
        setSatellites(prev => {
          const exists = prev.some(sat => sat.noradId === noradId);
          if (!exists) {
            return [...prev, satellite];
          }
          return prev;
        });
      } else {
        setError(`Satellite with NORAD ID ${noradId} not found`);
      }
      
      setIsLoading(false);
    } catch (err) {
      setError(`Failed to fetch satellite with NORAD ID ${noradId}`);
      setIsLoading(false);
      console.error(err);
    }
  }, []);

  // Calculate position for a satellite at a given time
  const calculateSatellitePosition = useCallback((satellite: Satellite, time: Date) => {
    if (!satellite) return null;
    
    try {
      const satrec = parseTLE(satellite.tle);
      return calculatePosition(satrec, time);
    } catch (err) {
      console.error('Error calculating satellite position:', err);
      return null;
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchAllSatellites();
  }, [fetchAllSatellites]);

  // Auto-refresh TLE data if enabled
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchAllSatellites();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchAllSatellites]);

  return {
    satellites,
    selectedSatellite,
    setSelectedSatellite,
    isLoading,
    error,
    fetchAllSatellites,
    fetchSatellite,
    calculateSatellitePosition
  };
};

export default useTLE; 
