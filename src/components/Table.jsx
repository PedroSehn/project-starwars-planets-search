import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';

export default function Table() {
  const { planetsState, filters, setFilters } = useContext(Context);
  const [filterPlanets, setFilterPlanets] = useState([]);

  function handleChange({ target }) {
    setFilters((prevState) => ({ ...prevState,
      filterByName: { name: target.value } }));
  }

  const { name } = filters.filterByName;
  useEffect(() => {
    setFilterPlanets(planetsState.data.filter((planet) => planet.name.includes(name)));
  }, [name, planetsState.data]);

  if (planetsState.loading) {
    return (
      <h1>Loading</h1>
    );
  }
  const headerOfTable = planetsState.name;

  return (
    <main>
      <input
        type="text"
        data-testid="name-filter"
        name="textFilter"
        value={ name }
        onChange={ handleChange }
      />
      <table>
        <thead>
          <tr>
            {headerOfTable.filter((title) => title !== 'url')
              .map((title, index) => <th key={ index }>{title}</th>)}
          </tr>
        </thead>
        <tfoot>
          {filterPlanets.map((planet, index) => (
            <tr key={ index }>
              {headerOfTable
                .map((typeColum, index2) => index2 <= headerOfTable.length - 2
              && <td key={ index2 }>{planet[typeColum]}</td>)}
            </tr>
          ))}
        </tfoot>
      </table>
    </main>
  );
}
