import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Satellite, OrbitPath } from '../models/Satellite';
import { fetchSatellites } from '../api/satellite-data';
import { calculateOrbitPath } from '../utils/satellite-calculations';

interface AppContextType {
  satellites: Satellite[];
  orbitPaths: Record<string, OrbitPath>;
  selectedSatellite: Satellite | null;
  currentTime: Date;
  isLoading: boolean;
  error: string | null;
  setSelectedSatellite: (satellite: Satellite | null) => void;
  updateTime: (date: Date) => void;
  refreshSatellites: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [orbitPaths, setOrbitPaths] = useState<Record<string, OrbitPath>>({});
  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Refresh satellites on mount
  useEffect(() => {
    refreshSatellites();
    
    // Update the time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate orbit paths when satellites or time changes
  useEffect(() => {
    if (satellites.length > 0) {
      calculateOrbitPaths();
    }
  }, [satellites, currentTime]);
  
  // Calculate orbit paths for all satellites
  const calculateOrbitPaths = () => {
    const paths: Record<string, OrbitPath> = {};
    
    satellites.forEach(satellite => {
      const path = calculateOrbitPath(satellite, currentTime);
      paths[satellite.id] = {
        satelliteId: satellite.id,
        points: path
      };
    });
    
    setOrbitPaths(paths);
  };
  
  const refreshSatellites = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchSatellites();
      setSatellites(data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load satellite data');
      setIsLoading(false);
      console.error(err);
    }
  };
  
  const updateTime = (date: Date) => {
    setCurrentTime(date);
  };
  
  const value = {
    satellites,
    orbitPaths,
    selectedSatellite,
    currentTime,
    isLoading,
    error,
    setSelectedSatellite,
    updateTime,
    refreshSatellites
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext; 
