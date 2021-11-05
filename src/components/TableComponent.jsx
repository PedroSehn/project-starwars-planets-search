import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import Loading from './Loading';
// function pra acessar as chaves e retornar <tr> com as infos
function TableComponent() {
  const {
    data,
    tableRows,
    arrFiltered,
    setArrFiltered,
    nameFilter,
  } = useContext(MyContext);

  useEffect(() => {
    // fill filteredArr
    function filterByName(parametro) {
      const parametroLow = parametro.toLowerCase();
      const filteredData = data.filter((crr) => crr
        .name
        .toLowerCase().includes(parametroLow));
      setArrFiltered(filteredData);
    }
    filterByName(nameFilter);
  }, [data, nameFilter, setArrFiltered]);

  // recebe um object e retorna uma ROW
  function createTD(object) {
    delete object.residents;
    delete object.films;
    delete object.link;
    const valuesArr = Object.values(object);
    return (valuesArr.map((crr, i) => {
      if (i === 0) {
        return (
          <td key={ crr } data-testid="planet-name" className="tableData">
            { crr }
          </td>);
      }
      return (
        <td key={ crr } className="tableData">
          { crr }
        </td>);
    }));
  }

  // verifica se já chegou resultados da API
  if (data.length === 0) {
    return <Loading />;
  }
  return (
    <div>
      <table className="styled-table">
        <tr>
          {tableRows.map((crr) => <th key={ crr } className="tableRows">{ crr }</th>)}
        </tr>
        <tbody>
          {arrFiltered.map((crr, i) => (
            <tr
              className="planetData"
              key={ i }
            >
              { createTD(crr) }
            </tr>))}
        </tbody>
      </table>
    </div>

  );
}

export default TableComponent;
