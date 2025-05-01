import React from 'react';
import { AppProvider } from './context/AppContext';
import { ThreeJsProvider } from './context/ThreeJsProvider';
import Scene from './components/Scene';
import SatelliteList from './components/UI/SatelliteList';
import SatelliteDetail from './components/UI/SatelliteDetail';
import TimeControls from './components/UI/TimeControls';
import './App.css';

function App() {
  return (
    <div className="app">
      <AppProvider>
        <ThreeJsProvider>
          <Scene />
        </ThreeJsProvider>
        
        {/* UI Components */}
        <SatelliteList />
        <SatelliteDetail />
        <TimeControls />
        
        <header className="header">
          <h1>Satellite Orbit Tracker</h1>
        </header>
      </AppProvider>
    </div>
  );
}

export default App;
