import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    longitude: 11.4376,
    latitude: 43.7577,
    zoom: 3,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/sepoz/ck9e6rua11hx11iqp10f5eo5e'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    >
      {
        logEntries.map(entry => (
          <Marker
            key={entry._id}
            longitude={entry.longitude}
            latitude={entry.latitude}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <svg
              className='marker'
              style={{
                width: '24px',
                height: '24px',
              }}
              viewBox="0 0 24 24"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
              </svg>
          </Marker>
        ))
      }
    </ReactMapGL>
  );
};

export default App;
