import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import TableComponent from './TableComponent';

function Table() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const {
    setData,
    setNameFilter,
  } = useContext(MyContext);

  // seta valor do filtro
  function setFilter(e) {
    const targetValue = e.target.value;
    setNameFilter(targetValue);
  }

  // componentDidMount
  useEffect(() => {
    async function fetchPlanets() {
      await fetch(url)
        .then((data) => data.json())
        .then((data) => setData(data.results));
    }
    fetchPlanets();
  }, [setData]);

  return (
    <div>
      <form>
        <input
          data-testid="name-filter"
          placeholder="NAME"
          type="text"
          name="name"
          onChange={ setFilter }
        />
      </form>
      <TableComponent />
    </div>
  );
}

export default Table;
