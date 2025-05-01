# Orbital - Satellite Orbit Tracker

A modern, interactive 3D visualization tool for tracking satellites in real-time.

## About

Orbital is a web application that lets you visualize and track satellites orbiting Earth in a beautiful 3D environment. Built with React and Three.js, it provides an intuitive interface to explore satellite positions, orbits, and detailed information.

## Features

- Real-time 3D Earth visualization with accurate satellite positioning
- Interactive camera controls for exploring the Earth from any angle
- Detailed satellite information, including position, orbital elements, and metadata
- Support for multiple satellite types (Space Stations, Telescopes, Weather, Communications)
- Time controls to simulate satellite movement over time
- Color-coded visualization for different satellite types and selection states
- Responsive design that works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone https://github.com/kenzychew/orbital.git
   cd orbital
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Start the development server

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

- **Select a satellite**: Click on any satellite to see its orbit highlighted and view detailed information
- **Control the view**: Use mouse/touch to rotate, zoom, and pan the Earth view
- **Adjust time**: Use the time controls to change the simulation time and speed

## Technology Stack

- **React**: UI components and state management
- **Three.js**: 3D rendering engine (via React Three Fiber)
- **Satellite.js**: Satellite position calculation
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast, modern build tool

## Project Structure

- `/components`: React components organized by feature
- `/context`: React context providers for global state
- `/models`: TypeScript interfaces and types
- `/utils`: Helper functions and calculations
- `/api`: Data fetching and processing

## Future Plans

- Ground track visualization
- Satellite search and filtering
- Customizable visual themes
- Satellite launch and decay predictions
- Multiple data sources for satellite information

---

_Built with 🚀 by yours truly_
