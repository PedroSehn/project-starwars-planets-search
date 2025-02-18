import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetProvider from './context/PlanetProviders';

function App() {
  return (
    <PlanetProvider>
      <Table />
    </PlanetProvider>
  );
}

export default App;
