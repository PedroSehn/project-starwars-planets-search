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
  const [filters, setFilters] = useState({
    column: 'population',
    comparative: 'maior que',
    number: 0,
  });

  const objetoNovo = {
    data,
    setData,
    tableRows,
    setTableRows,
    arrFiltered,
    setArrFiltered,
    nameFilter,
    setNameFilter,
    filters,
    setFilters,
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
