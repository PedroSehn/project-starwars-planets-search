import React, { useContext } from 'react';
import MyContext from '../../context/MyContext';

function FilterForm() {
  const {
    setNameFilter,
    filters,
    setFilters,
    setArrFiltered,
    arrFiltered,
    data,
    numFiltersTable,
    setNumFiltersTable,

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

  function filterColumOpt() {
    const { column } = filters;
    const allFIlters = ['population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water'];
    return allFIlters.filter((crr) => crr !== column);
  }
  const selectColumOpt = filterColumOpt();

  // FUNCTIONS BOTOTES 'X'
  function resetFilters() {
    setArrFiltered(data);
  }

  // Seta valor de Sort
  function sortStatus(e) {
    const { value } = e.target;
    setNumFiltersTable((prev) => ({ ...prev, typeSort: value }));
  }

  // Seta valor da orderColumn
  function sortColumStatus(e) {
    const { value } = e.target;
    setNumFiltersTable((prev) => ({ ...prev, OrderColumn: value }));
  }

  function caseASC() {
    const { OrderColumn } = numFiltersTable;
    const arrClone = [...arrFiltered];
    const MENOS_UM = -1;
    const arrSorted = arrClone.sort((a, b) => {
      if (Number.isNaN(Number(a[OrderColumn]) - Number(b[OrderColumn]))) {
        if (a[OrderColumn] < b[OrderColumn]) { return MENOS_UM; }
        if (a[OrderColumn] > b[OrderColumn]) { return 1; }
        return 0;
      }
      return Number(a[OrderColumn]) - Number(b[OrderColumn]);
    });
    setArrFiltered(arrSorted);
  }

  // ordenate btn func
  function sortItems() {
    const { OrderColumn, typeSort } = numFiltersTable;
    const arrClone = [...arrFiltered];
    const MENOS_UM = -1;
    if (typeSort === 'ASC') {
      caseASC();
    } else if (typeSort === 'DSC') {
      const arrSorted = arrClone.sort((a, b) => {
        if (Number.isNaN(Number(a[OrderColumn]) - Number(b[OrderColumn]))) {
          if (a[OrderColumn] > b[OrderColumn]) { return MENOS_UM; }
          if (a[OrderColumn] < b[OrderColumn]) { return 1; }
          return 0;
        }
        return Number(b[OrderColumn]) - Number(a[OrderColumn]);
      });
      setArrFiltered(arrSorted);
    }
  }
  return (
    <form className="filterForm">
      <div id="infoFilter">
        <input
          className="filterInput"
          data-testid="name-filter"
          placeholder="Name"
          type="text"
          name="name"
          onChange={ setNameFilterFunc }
        />
        <select
          name="column"
          data-testid="column-filter"
          className="filterInput"
          onChange={ handleNumFilters }
          onClick={ filterColumOpt }
        >
          {selectColumOpt.map((crr, i) => (
            <option value={ crr } key={ `${crr} ${i}` } id={ crr }>{crr}</option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparative"
          className="filterInput"
          onChange={ handleNumFilters }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          data-testid="value-filter"
          className="filterInput"
          type="number"
          name="number"
          placeholder="Numero"
          onChange={ handleNumFilters }
        />
        <button
          type="button"
          data-testid="button-filter"
          className="filterInput"
          onClick={ setNumeralFilters }
        >
          Filtrar
        </button>
        <button
          type="button"
          className="filterInput"
          onClick={ resetFilters }
        >
          Resetar Filtros

        </button>
      </div>
      <div id="orderFilter">
        <select
          data-testid="column-sort"
          onChange={ sortColumStatus }
          className="filterInput"
        >
          {selectColumOpt.map((crr, i) => (
            <option value={ crr } key={ `${crr} ${i}` } id={ crr }>{crr}</option>
          ))}
        </select>
        <label htmlFor="asc">
          Ascendente
          <input
            type="radio"
            className="radioInput"
            value="ASC"
            id="asc"
            name="asc-dsc"
            data-testid="column-sort-input-asc"
            onClick={ sortStatus }
          />
          Descendente
          <input
            type="radio"
            className="radioInput"
            value="DSC"
            id="dsc"
            name="asc-dsc"
            data-testid="column-sort-input-desc"
            onClick={ sortStatus }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          className="filterInput"
          onClick={ sortItems }
        >
          Ordernar

        </button>
      </div>
    </form>
  );
}

export default FilterForm;
