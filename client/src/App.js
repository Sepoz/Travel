import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';
import LogEntryForm from './components/LogEntryForm';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
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

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      longitude,
      latitude,
    })
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/sepoz/ck9e6rua11hx11iqp10f5eo5e'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <div key={entry._id}>
            <Marker
              longitude={entry.longitude}
              latitude={entry.latitude}
              offsetLeft={-12}
              offsetTop={-24}>
              <div 
                onClick={() => setShowPopup({
                  ...showPopup,
                  [entry._id]: true,
                })}>
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
                  strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({
                    ...showPopup,
                    [entry._id]: false,
                    })}
                    anchor='top'>
                  <div>
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                  </div>
                </Popup>
              ) : null
            }
          </div>
        ))
      }
      {
        addEntryLocation ? (
          <>
            <Marker
              longitude={addEntryLocation.longitude}
              latitude={addEntryLocation.latitude}
              offsetLeft={-12}
              offsetTop={-24}>
              <div>
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
                  strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
                anchor='top'>
                <div>
                  <LogEntryForm>
                    
                  </LogEntryForm>
                </div>
            </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
};

export default App;
