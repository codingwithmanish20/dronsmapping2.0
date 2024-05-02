import React, { useEffect, useState, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/newproject.css";

const NewProject = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  const [lng, setLng] = useState(78.9629);
  const [lat, setLat] = useState(20.5937);
  const [zoom, setZoom] = useState(4);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLocationEditable, setIsLocationEditable] = useState(false);

  const handleNavigationHome = () => {
    navigate("/");
  };

  const [formData, setFormData] = useState({
    project_name: "",
    category: "",
    description: "",
    history: "",
    location: "",
    status: "true",
    latitude: "",
    longitude: "",
  });

  const [locationName, setLocationName] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://res2e4sb2oz6ta7mlagcaelvlm0mpadg.lambda-url.us-west-1.on.aws/dynamodb/categories",
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("dataCatogry", data);
          setCategories(data);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

      // Check the textField if empty disabled the button
      const anyFieldEmpty = Object.values({
        ...formData,
        [name]: value,
      }).some((value) => value === "");
      setIsButtonDisabled(anyFieldEmpty);
    },
    [formData]
  );

  const handleLatitudeChange = (e) => {
    const { value } = e.target;
    setLat(parseFloat(value) || 0);

    setFormData((prevFormData) => ({
      ...prevFormData,
      latitude: value,
    }));
  };

  const handleLongitudeChange = (e) => {
    const { value } = e.target;
    setLng(parseFloat(value) || 0);

    setFormData((prevFormData) => ({
      ...prevFormData,
      longitude: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setLoading(true);

    try {
      const response = await fetch(
        "https://res2e4sb2oz6ta7mlagcaelvlm0mpadg.lambda-url.us-west-1.on.aws/dynamodb/add-project",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success("Project added successfully");

        // set Time 3 second by default to redirect Home page
        setTimeout(() => {
          navigate("/");
        }, 6000);

        // Reset all form fields
        setFormData({
          project_name: "",
          category: "",
          description: "",
          history: "",
          location: "",
          status: "true",
          latitude: "",
          longitude: "",
        });

        // Reset map coordinates and disable further edits
        setLat(0);
        setLng(0);
        setIsLocationEditable(false);
      } else {
        throw new Error("Failed to send data");
      }
    } catch (error) {
      console.error("Error sending data:", error);

      // Show error notification
      toast.error("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  //  set the location using the drag and drop
  // useEffect(() => {
  //   mapboxgl.accessToken =
  //     'pk.eyJ1IjoicmF3YXRhbW1pZSIsImEiOiJjbG5rNzgzN28wandvMnFwMm1qbWduZ25hIn0.zjWDLv9gL6YI1uIIwPgA7A';
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: 'mapbox://styles/mapbox/streets-v12',
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });
  //   const zoomControls = new mapboxgl.NavigationControl();
  //   map.current.addControl(zoomControls, 'top-right');
  //   marker.current = new mapboxgl.Marker({ color: 'red', draggable: true })
  //     .setLngLat([lng, lat])
  //     .addTo(map.current);
  //   const handleMarkerDragEnd = (e) => {
  //     const { lng, lat } = e.target.getLngLat();
  //     setLng(lng);
  //     setLat(lat);
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       latitude: lat.toString(),
  //       longitude: lng.toString(),
  //     }));
  //     setIsLocationEditable(true);
  //     getReverseGeocode(lat, lng).then((locationName) => {
  //       setLocationName(locationName || 'Location not found');
  //     });
  //     map.current.setCenter([lng, lat]);
  //   };
  //   marker.current.on('dragend', handleMarkerDragEnd);

  //   return () => {
  //     map.current.remove();
  //   };
  // }, []);
  // set the location to click on the mapBox

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicmF3YXRhbW1pZSIsImEiOiJjbG5rNzgzN28wandvMnFwMm1qbWduZ25hIn0.zjWDLv9gL6YI1uIIwPgA7A";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    const zoomControls = new mapboxgl.NavigationControl();
    map.current.addControl(zoomControls, "top-right");

    marker.current = new mapboxgl.Marker({ color: "red", draggable: true })
      .setLngLat([lng, lat])
      .addTo(map.current);

    const handleMapClick = (e) => {
      const { lng, lat } = e.lngLat;

      // Update the marker position
      marker.current.setLngLat([lng, lat]);

      // Update the latitude and longitude state
      setLng(lng);
      setLat(lat);

      // Update the form data
      setFormData((prevFormData) => ({
        ...prevFormData,
        latitude: lat.toString(),
        longitude: lng.toString(),
      }));

      // Fetch the location name using reverse geocoding
      getReverseGeocode(lat, lng).then((locationName) => {
        setLocationName(locationName || "Location not found");
      });
      map.current.setCenter([lng, lat]);
    };

    // Attach the click event listener to the map container
    map.current.on("click", handleMapClick);

    const handleMarkerDragEnd = (e) => {
      const { lng, lat } = e.target.getLngLat();
      setLng(lng);
      setLat(lat);
      setFormData((prevFormData) => ({
        ...prevFormData,
        latitude: lat.toString(),
        longitude: lng.toString(),
      }));
      setIsLocationEditable(true);
      getReverseGeocode(lat, lng).then((locationName) => {
        setLocationName(locationName || "Location not found");
      });
      map.current.setCenter([lng, lat]);
    };
    marker.current.on("dragend", handleMarkerDragEnd);

    return () => {
      // Cleanup function to remove the map when the component is unmounted
      map.current.remove();
    };
  }, []);

  const mapContainerStyle = {
    position: "relative",
    top: "0%",
    bottom: "0%",
    width: "100%",
    height: "80vh",
    borderRadius: "20px",
    marginLeft: "50px",
    marginTop: "-10px",
  };

  return (
    <>
      <Box className="newproject_header">
        <Box
          className="newproject_header_right"
          style={{ paddingLeft: "20px" }}
        >
          <h1 className="pro_heading">New Project</h1>
          <p style={{ fontSize: "12px" }}>
            Enter project details and organize better with BotLab Dynamics
          </p>
        </Box>
        <Box
          className="newproject_header_left"
          style={{ paddingRight: "20px" }}
        >
          <Button
            onClick={handleNavigationHome}
            startIcon={<ArrowBackIcon />}
            variant="contained"
            style={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: "12px",
              backgroundColor: "#1c213e",
              padding: "10px 16px",
              borderRadius: "30px",
            }}
            className="ProjectBtn"
          >
            Back TO Project
          </Button>
        </Box>
      </Box>
      <div
        className="newproject_head"
        style={{ margin: "10px 12px", borderRadius: "2px" }}
      >
        <Grid container  style={{backgroundColor:"#F5F6FF"}}>
          <Grid item xs={4}  >
            <Box className="left_form">
              <form onSubmit={handleSubmit}>
                <TextField
                  // label="Project Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="project_name"
                  placeholder="Project Name"
                  value={formData.project_name}
                  onChange={handleChange}
                  margin="normal"
                  InputProps={{
                    style: {
                      backgroundColor: "#1c213e",
                      color: "#96979f",
                      fontWeight: "bold",
                      border: "none",
                      height: "45px",
                      borderRadius: "45px",
                    }, // Removes the border
                  }}
                />

                <FormControl
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  className="projectDropdown"
                >
                  <InputLabel>Select Project Type</InputLabel>

                  <Select
                    label="Project Type"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {categories?.map((category) => (
                      <MenuItem
                        key={category.CategoryID}
                        value={category.CategoryName}
                      >
                        {category?.CategoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  // label="Project Description (Optional)"
                  placeholder="Project Description (Optional)"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  margin="normal"
                  className="descriptionBox"
                  style={{
                    background: "#1c213e",
                    color: "red",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                />

                <TextField
                  // label="Latitude"
                  placeholder="Latitude"
                  variant="outlined"
                  fullWidth
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleLatitudeChange}
                  disabled
                  className="latitudeInputBox"
                />

                <span
                  style={{
                    color: "#da7785",
                    marginLeft: "20px",
                    fontSize: "14px",
                  }}
                >
                  Drag the marker on the map to set the Latitude*
                </span>

                <TextField
                  // label="Longitude"
                  placeholder="Longitude"
                  variant="outlined"
                  fullWidth
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleLongitudeChange}
                  margin="normal"
                  disabled
                  className="latitudeInputBox"
                  InputLabelProps={{ style: { color: "red" } }}
                />

                <span
                  style={{
                    color: "#da7785",
                    marginLeft: "20px",
                    fontSize: "14px",
                  }}
                >
                  Drag the marker on the map to set the Longitude*
                </span>

                <TextField
                  // label="Location Name"
                  placeholder="Location Name"
                  variant="outlined"
                  fullWidth
                  value={locationName}
                  margin="normal"
                  disabled
                  className="latitudeInputBox"
                  InputLabelProps={{
                    shrink: !!locationName, // Shrink label if input has content
                    style: {
                      color:"red",
                      position: "absolute", // Set label position to absolute
                      top: "-4px", // Adjust top position to move the label up or down
                    },
                  }}
                 
                />

                <span
                  style={{
                    color: "#da7785",
                    marginLeft: "20px",
                    fontSize: "14px",
                  }}
                >
                  Drag the marker on the map to set the Location Name*
                </span>

                <Box mt={2}>
                  <Button
                  className="NewBtn"
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {loading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "Create New Project"
                    )}
                  </Button>
                </Box>
                <ToastContainer />
              </form>
            </Box>
          </Grid>

          <Grid item xs={7}>
            <Box className="Right_map">
              <p style={{ marginLeft: "50px", fontSize: "14px", fontFamily:"sans-serif" }}>
                Select Project Location 
              </p>

              <Box className="map_content" style={{ marginTop: "20px" }}>
                <div style={mapContainerStyle} ref={mapContainer} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default NewProject;
