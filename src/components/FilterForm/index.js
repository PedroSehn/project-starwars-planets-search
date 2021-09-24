import React, { useContext } from 'react';
import MyContext from '../../context/MyContext';

function FilterForm() {
  const {
    setNameFilter,
    filters,
    setFilters,
  } = useContext(MyContext);

  // seta valor do filtro NAME
  function setNameFilterFunc(e) {
    const targetValue = e.target.value;
    setNameFilter(targetValue);
  }

  // seta valor dos filtros numerais
  function setNumeralFilters({ column, comparative, number }) {
    return filters;
  }

  function handleNumFilters(e) {
    const { name } = e.target;
    const { value } = e.target;
    setFilters((prev) => prev, filters[name] = value);
    console.log(filters);
  }
  const selectColumOpt = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const compareOptions = ['maior que', 'menor que', 'igual a'];

  return (
    <form>
      <input
        data-testid="name-filter"
        placeholder="NAME"
        type="text"
        name="name"
        onChange={ setNameFilterFunc }
      />
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleNumFilters }
      >
        {selectColumOpt.map((crr, i) => (
          <option value={ crr } key={ `${crr} ${i}` }>{crr}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparative"
        onChange={ handleNumFilters }
      >
        {compareOptions.map((crr, i) => (
          <option value={ crr } key={ `${crr} ${i}` }>{crr}</option>
        ))}
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="number"
        placeholder="VALUE"
        onChange={ handleNumFilters }
      />
    </form>
  );
}

export default FilterForm;
