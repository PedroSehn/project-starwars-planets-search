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
    async function fetchPlanets() {
      await fetch(url)
        .then((data) => data.json())
        .then((data) => setData(data.results));
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
