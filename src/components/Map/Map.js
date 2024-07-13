import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './map.css';
import { listLogEntries, updateTrip, deleteTrip } from '../../api/api.js';
import LogEntryForm from '../EntryForm/LogEntryForm.js';
import NavigationButtons from '../NavBar/NavigationButtons.js';
import { useNavigate } from 'react-router-dom';
import TripPopup from '../TripSummary/TripPopup.js';

const Map = () => {
    const navigate = useNavigate();
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [showPopup, setShowPopup] = useState(true);
    const [addEntryLocation, setAddEntryLocation] = useState(null);
    const [logEntries, setLogEntries] = useState([]);
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        longitude: -100,
        latitude: 40,
        zoom: 3.5
    });

    const getEntries = async () => {
        const logEntries = await listLogEntries();
        if (!logEntries.error) {
            setLogEntries(logEntries);
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        getEntries();
    }, []);

    const showAddMarkerPopup = (event) => {
        const { lng, lat } = event.lngLat;
        setAddEntryLocation({
            latitude: lat,
            longitude: lng
        });
    }

    const onDelete = async (id) => {
        const res = await deleteTrip(id);
        setLogEntries(logEntries.filter((val) => val._id !== id));
        setSelectedEntry(null);
    }

    const onUpdate = async (entry) => {
        setSelectedEntry(entry);
        setAddEntryLocation({
            longitude: entry.longitude,
            latitude: entry.latitude
        });
    }

    return (
        <>
            <ReactMapGL
                {...viewport}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/dark-v10"
                onMove={event => setViewport(event.viewState)}
                style={{ width: '100vw', height: '100vh' }}
                onDblClick={showAddMarkerPopup}
                doubleClickZoom={false}
            >
                {logEntries.map(entry => (
                    <Marker
                        key={entry._id}
                        longitude={entry.longitude}
                        latitude={entry.latitude}
                        offsetLeft={-12}
                        offsetTop={-24}
                        onClick={() => setSelectedEntry(entry)}
                    >
                        <div>
                            <svg
                                className="marker yellow"
                                style={{ height: '24px', width: '24px' }}
                                version="1.1"
                                id="Layer_1"
                                x="0px"
                                y="0px"
                                viewBox="0 0 512 512"
                            >
                                <g>
                                    <g>
                                        <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                                            c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                                            c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </Marker>
                ))}
                {selectedEntry && showPopup && (
                    <Popup
                        longitude={selectedEntry.longitude}
                        latitude={selectedEntry.latitude}
                        anchor="bottom"
                        closeOnClick={false}
                        onClose={() => setSelectedEntry(null)}
                    >
                        <TripPopup selectedEntry={selectedEntry} onDelete={onDelete} onUpdate={onUpdate} />
                    </Popup>
                )}
                {addEntryLocation && (
                    <Popup
                        longitude={addEntryLocation.longitude}
                        latitude={addEntryLocation.latitude}
                        anchor="bottom"
                        closeOnClick={false}
                        onClose={() => setAddEntryLocation(null)}
                    >
                        <div className='popup'>
                            <LogEntryForm
                                onClose={() => {
                                    setAddEntryLocation(null);
                                    setSelectedEntry(null);  
                                    getEntries();
                                }}
                                location={addEntryLocation}
                                entry={selectedEntry}  
                            />
                        </div>
                    </Popup>
                )}
            </ReactMapGL>
            <NavigationButtons />
        </>
    );
}

export default Map;
