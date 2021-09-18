import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';
import SelectFilter from './SelectFilter';

const optionColum = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
const optionType = ['maior que', 'menor que', 'igual a'];

function int(num) {
  return parseInt(num, 10);
}

export default function Table() {
  const { planetsState, filters, setFilters } = useContext(Context);
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [filterValues, setFilterValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  function handleChangeFilterName({ target }) {
    setFilters((prevState) => ({ ...prevState,
      filterByName: { name: target.value } }));
  }

  function handleClick() {
    setFilters({ ...filters, filterByNumericValues: [filterValues] });
  }

  function handleChangeFilterSelect({ target }) {
    setFilterValues({ ...filterValues, [target.name]: target.value });
  }
  const { name } = filters.filterByName;

  useEffect(() => {
    setFilterPlanets(planetsState.data.filter((planet) => planet.name.includes(name)));
  }, [name, planetsState.data]);

  useEffect(() => {
    const { filterByNumericValues } = filters;
    const filterValue = filterByNumericValues[0];
    setFilterPlanets(planetsState.data.filter((planet) => {
      switch (filterValue.comparison) {
      case 'maior que':
        return int(planet[filterValue.column]) > int(filterValue.value);
      case 'menor que':
        return int(planet[filterValue.column]) < int(filterValue.value);
      case 'igual a':
        return int(planet[filterValue.column]) === int(filterValue.value);
      default:
        return planet;
      }
    }));
  }, [filters, planetsState.data]);

  if (planetsState.loading) {
    return (
      <h1>Loading</h1>
    );
  }
  const headerOfTable = planetsState.name;

  return (
    <main>
      <SelectFilter
        optionsForSelect={ optionColum }
        id="column-filter"
        name="column"
        handleChange={ handleChangeFilterSelect }
        value={ filterValues.column }
      />
      <SelectFilter
        optionsForSelect={ optionType }
        id="comparison-filter"
        name="comparison"
        handleChange={ handleChangeFilterSelect }
        value={ filterValues.comparison }
      />
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ handleChangeFilterSelect }
        value={ filterValues.value }
      />
      <button type="button" data-testid="button-filter" onClick={ handleClick }>
        Adicionar filtro
      </button>
      <input
        type="text"
        data-testid="name-filter"
        name="textFilter"
        value={ name }
        onChange={ handleChangeFilterName }
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
