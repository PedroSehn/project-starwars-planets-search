import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import TableComponent from './TableComponent';

function Table() {
  // const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const url = 'https://swapi.dev/api/planets/';
  const { setData } = useContext(MyContext);

  // componentDidMount
  useEffect(() => {
    async function fetchPlanets() {
      await fetch(url)
        .then((data) => data.json())
        .then((data) => setData(data.results));
    }
    fetchPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <TableComponent />
    </div>
  );
}

export default Table;
