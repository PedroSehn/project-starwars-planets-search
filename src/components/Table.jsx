import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Table() {
  const { planetsState } = useContext(Context);
  if (!planetsState.loading) {
    const headerOfTable = Object.keys(planetsState.data[0]);
    return (
      <table>
        <thead>
          <tr>
            {headerOfTable.filter((title) => title !== 'url')
              .map((title, index) => <th key={ index }>{title}</th>)}
          </tr>
        </thead>
        <tfoot>
          {planetsState.data.map((planet, index) => (
            <tr key={ index }>
              {headerOfTable
                .map((value, index2) => index2 <= headerOfTable.length - 2
              && <td key={ index2 }>{planet[value]}</td>)}
            </tr>
          ))}
        </tfoot>
      </table>
    );
  }
  return (
    <h1>Loading</h1>
  );
}
