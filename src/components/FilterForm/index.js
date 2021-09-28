import React, { useContext } from 'react';
import MyContext from '../../context/MyContext';

function FilterForm() {
  const {
    setNameFilter,
    filters,
    setFilters,
    setArrFiltered,
    data,
  } = useContext(MyContext);

  // seta valor do filtro NAME
  function setNameFilterFunc(e) {
    const targetValue = e.target.value;
    setNameFilter(targetValue);
  }

  function handleFilters(objeto) {
    setArrFiltered(data);
    const { column, comparative, number } = filters;
    const targetKey = Number(objeto[column]);

    switch (comparative) {
    case 'maior que':
      return targetKey > Number(number) ? objeto : '';
    case 'menor que':
      return targetKey < Number(number) ? objeto : '';
    default:
      return objeto[column] === number ? objeto : '';
    }
  }

  // seta valor dos filtros numerais
  function setNumeralFilters() {
    const filteredData = data.map((crr) => handleFilters(crr));
    const cleanFilteredData = filteredData.filter((crr) => crr !== '');
    return setArrFiltered(cleanFilteredData);
  }

  function handleNumFilters(e) {
    const { name } = e.target;
    const { value } = e.target;
    setFilters((prev) => prev, filters[name] = value);
  }

  const selectColumOpt = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

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
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="number"
        placeholder="VALUE"
        onChange={ handleNumFilters }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ setNumeralFilters }
      >
        Filtrar
      </button>
    </form>
  );
}

export default FilterForm;
