import React, { useContext, useEffect } from 'react';
import TableComponent from './TableComponent';
import MyContext from '../context/MyContext';
import FilterForm from './FilterForm';

function Table() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const {
    setData,
    setLoading,
    loading,
  } = useContext(MyContext);

  // componentDidMount
  useEffect(() => {
    const MENOS_UM = -1;
    async function fetchPlanets() {
      await fetch(url)
        .then((data) => data.json())
        .then((data) => data.results)
        .then((data) => data.sort(((a, b) => {
          if (a.name < b.name) { return MENOS_UM; }
          if (a.name > b.name) { return 1; }
          return 0;
        })))
        .then((data) => setData(data));
    }
    fetchPlanets();
  }, [loading, setData, setLoading]);

  return (
    <div>
      <FilterForm />
      <TableComponent />
    </div>
  );
}

export default Table;
