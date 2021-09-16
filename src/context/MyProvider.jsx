import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import requestApi from '../data';
import Context from './Context';

export default function MyProvider({ children }) {
  const [planetsState, setPlanetState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    async function resultApi() {
      const response = await requestApi();
      setPlanetState((prevState) => ({
        ...prevState.data,
        data: response.results,
        loading: false,
      }));
    }
    resultApi();
  }, []);
  return (
    <main>
      <Context.Provider value={ { planetsState, setPlanetState } }>
        {children}
      </Context.Provider>
    </main>
  );
}

MyProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};
