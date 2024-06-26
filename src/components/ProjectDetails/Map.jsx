import React, { useRef, useState ,useEffect} from 'react'
import mapboxgl from "mapbox-gl";
const mapContainerStyle = {
    position: "relative",
    top: "0%",
    bottom: "0%",
    width: "100%",
    height: "40vh",
    borderRadius: "20px",
    marginLeft: "10px",
    marginTop: "-10px",
  };
const Map = ({lat=78.9629,lng=20.5937}) => {
      const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [mapCenter, setMapCenter] = useState([lat,lng]);
//   const [lng, setLng] = useState(78.9629);
//   const [lat, setLat] = useState(20.5937);
  const [zoom, setZoom] = useState(17);

  const [defaultLng, setDefaultLng] = useState(78.9629);
  const [defaultLat, setDefaultLat] = useState(20.5937);
  const getReverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoicmF3YXRhbW1pZSIsImEiOiJjbG5rNzgzN28wandvMnFwMm1qbWduZ25hIn0.zjWDLv9gL6YI1uIIwPgA7A`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const placeName = data.features[0].place_name;
          return placeName;
        }
      }

      return null;
    } catch (error) {
      console.error("Error fetching reverse geocode:", error);
      return null;
    }
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicmF3YXRhbW1pZSIsImEiOiJjbG5rNzgzN28wandvMnFwMm1qbWduZ25hIn0.zjWDLv9gL6YI1uIIwPgA7A";

    const initialLng = isNaN(lng) ? defaultLng : lng;
    const initialLat = isNaN(lat) ? defaultLat : lat;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: mapCenter,
      zoom: zoom,
    });

    const zoomControls = new mapboxgl.NavigationControl();
    map.current.addControl(zoomControls, "top-right");
    const markerLng = isNaN(lng) ? defaultLng : lng;
    const markerLat = isNaN(lat) ? defaultLat : lat;

    // Create a new marker object
    const newMarker = new mapboxgl.Marker({ color: "blue" })
      .setLngLat([markerLng, markerLat])
      .addTo(map.current);

    markers.current.push(newMarker);
    map.current.flyTo({
      center: [markerLng, markerLat],
      essential: true,
    });
    return () => {
      markers.current.forEach((marker) => marker.remove());
      map.current.remove();
    };
  }, [lng, lat, zoom, defaultLng, defaultLat]);
    
  return (
    <div className='mt-4'>
  
        <div
                className="header_map"
                style={{ height: "auto", width: "98%" }}>
                <div style={mapContainerStyle} ref={mapContainer} />
              </div>
    </div>
  )
}

export default Map