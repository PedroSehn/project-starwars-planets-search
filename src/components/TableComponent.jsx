import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import Loading from './Loading';

// function pra acessar as chaves e retornar <tr> com as infos
function TableComponent() {
  const { data, tableRows } = useContext(MyContext);

  function createTD(object) {
    const valuesArr = Object.values(object);
    console.log(valuesArr);
    return (valuesArr.map((crr) => (
      <td key={ crr }>
        { crr }
      </td>)));
  }

  if (data.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <table>
        <tr>
          {tableRows.map((crr) => <th key={ crr } className="tableRows">{ crr }</th>)}
        </tr>
        <tbody>

          {data.map((crr, i) => <tr key={ i }>{ createTD(crr) }</tr>)}

        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
