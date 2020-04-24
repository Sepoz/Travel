import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';

import { listLogEntries } from './API';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 43.7577,
    longitude: 11.4376,
    zoom: 3,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      console.log(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/sepoz/ck9e6rua11hx11iqp10f5eo5e'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    />
  );
};

export default App;
