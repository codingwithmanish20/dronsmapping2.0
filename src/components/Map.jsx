import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmF3YXRhbW1pZSIsImEiOiJjbG5rNzgzN28wandvMnFwMm1qbWduZ25hIn0.zjWDLv9gL6YI1uIIwPgA7A'; // Add your Mapbox access token

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      zoom: 3,
      center: [30, 50],
      pitch: 60, 
      bearing: -5, 
    });

    map.on('onload', () => {
      
      map.setFog({});
    });

    
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div id="map" style={{ position: 'relative', top: "0%", bottom: "0%", width: '100%', height:"55vh" }}></div>
  );
};

export default Map;
