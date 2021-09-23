import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './MyContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [arrFiltered, setArrFiltered] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
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
    nameFilter,
    setNameFilter,

  };

  return (
    <main>
      <Context.Provider value={ objetoNovo }>
        {children}
      </Context.Provider>
    </main>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
