import React, { useState } from 'react';

import Context from './MyContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [arrFiltered, setArrFiltered] = useState([]);
  const [tableRows, setTableRows] = useState([
    'Nome', 'Período de Rotação', 'Órbita', 'Diâmetro', 'Clima', 'Gravidade',
    'Terreno', 'Superfície Aquática', 'População',
    'Filmes', 'Criação', 'Edição', 'link',
  ]);

  const objetoNovo = {
    data,
    setData,
    tableRows,
    setTableRows,
    arrFiltered,
    setArrFiltered,
  };

  return (
    <main>
      <Context.Provider value={ objetoNovo }>
        {children}
      </Context.Provider>
    </main>
  );
}

export default PlanetProvider;
