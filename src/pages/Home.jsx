import React, { useEffect, useState, useRef } from "react";
import HomeDashbordHeader from "../components/HomeDashbordHeader";
import "../style/home.css";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FilterListIcon from "@mui/icons-material/FilterList";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { parseISO, format } from 'date-fns'
import mapboxgl from "mapbox-gl";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink, useNavigate } from 'react-router-dom';
import moment from 'moment';
import  Bom from   "../Images/business-corporate-protection-safety-security-concept.jpg"
import api from '../services'
import { startTokenRefreshInterval } from "../helper/refreshToken";
import { sortProjectsByDate } from "../helper/sortProjectsByDate";



const Home = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [lng, setLng] = useState(78.9629);
  const [lat, setLat] = useState(20.5937);
  const [zoom, setZoom] = useState(4);

  const [defaultLng, setDefaultLng] = useState(78.9629);
  const [defaultLat, setDefaultLat] = useState(20.5937);

  const [mapCenter, setMapCenter] = useState([defaultLng, defaultLat]);

  const [searchText, setSearchText] = useState("");
  const [searchCategory, setSearchCategory] = useState(""); // New state for category search
  const [selectedValue, setSelectedValue] = useState("0");

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [expandedProject, setExpandedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchProjects = async () => {
    // startTokenRefreshInterval()
    

    try {

      const response = await api.dashboardApi.getAllProjectstList()
    
      if (response.status===200) {
        const data= sortProjectsByDate(response?.data,1)
        console.log("data", data)
        if(Array.isArray(data)){
          
          setFilteredProjects(data);
          setProjects(data);

        }
        setLoading(false);
      } 
    } catch (error) {
      console.log("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicmF3YXRhbW1pZSIsImEiOiJjbG5rNzgzN28wandvMnFwMm1qbWduZ25hIn0.zjWDLv9gL6YI1uIIwPgA7A";

    const initialLng = isNaN(lng) ? defaultLng : lng;
    const initialLat = isNaN(lat) ? defaultLat : lat;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: mapCenter,
      zoom: zoom,
    });

    const zoomControls = new mapboxgl.NavigationControl();
    map.current.addControl(zoomControls, "top-right");

    return () => {
      markers.current.forEach((marker) => marker.remove());
      map.current.remove();
    };
  }, [lng, lat, zoom, defaultLng, defaultLat, mapCenter]);

  const mapContainerStyle = {
    position: "relative",
    top: "0%",
    bottom: "0%",
    width: "90%",
    height: "57vh",
    borderRadius: "20px",
    marginLeft: "50px",
    marginTop: "-10px",
  };


//   const handleChange = (event) => {
//   const value = event.target.value;
//   setSelectedValue(value);

//   let sortedProjects;

//   console.log('Original Projects:', projects);

//   if (value === '0') {
//     sortedProjects = [...projects].sort((a, b) => {
//       const dateA = parseISO(a.CreationTimeStep);
//       console.log("IF Statement A", dateA);

//       const dateB = parseISO(b.CreationTimeStep);
//       console.log("IF StateMent B", dateB);
//       return dateA - dateB;
//     });
//   } else {
//     sortedProjects = [...projects].sort((a, b) => {
//       const dateA = parseISO(a.CreationTimeStep);
//       console.log("Else date A", dateA);
//       const dateB = parseISO(b.CreationTimeStep);
//       console.log("else Data B", dateB);
//       return dateB - dateA;
//     });
//   }

//   console.log('Sorted Projects:', sortedProjects);

//   setFilteredProjects(sortedProjects);
// };






const handleChange = (event) => {
  const value = Number(event.target.value);
  console.log('value change sort',value)
  setSelectedValue(value);
  let sortedProjects=sortProjectsByDate(projects,value)

  console.log('sortedProjects:', sortedProjects)

  setFilteredProjects(sortedProjects);
};
  
  

  const buttonStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    cursor: "pointer",
    border: "none",
    outline: "none",
    transition: "background-color 0.3s",
    marginLeft: "12px",
  };

  const iconStyles = {
    marginRight: "8px",
  };
  const navigate = useNavigate()

  const handleRedirectSignUP = () => {
    navigate('/SignUp');
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchText(searchTerm);

    const filteredProjects = projects.filter(
      (project) =>
        project?.project_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project?.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProjects(filteredProjects);
  };

  const categoryImages = {
    Highways: Bom,
  };

  const handleCategorySearch = (event) => {
    const category = event.target.value;
    setSearchCategory(category);

    const filteredProjectsByCategory = projects.filter(
      (project) => project.category.toLowerCase().includes(category.toLowerCase())
    );

    setFilteredProjects(filteredProjectsByCategory);
  };

  const handleMouseEnter = (projectId, lat, lng) => {
    setExpandedProject(projectId);

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
  };

  const handleMouseLeave = () => {
    setExpandedProject(null);
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];
  };


  const handleDeactivateProject=async()=>{
    try {
  const res=await api.user.deactiveProject()
      
    } catch (error) {
      console.error('Error::whle calling deactivate project api',error)
      
    }

  }

  return (
    <>
      <HomeDashbordHeader />
      <Box className="outer_wraper">
        <Box className="outer_header mr-9 pb-2">
          <Box className="flex gap-4">
            <TextField
            size="small"
              variant="outlined"
              label="Search Project By Name"
              value={searchText}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              className="nameField"
            />
            <TextField
              variant="outlined"
              size="small"
              id="outlined-basic" 
              label="Search Project By Category"
              value={searchCategory}
              onChange={handleCategorySearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              className="nameField"
           
            />
          </Box>

          <Box className="outer_right">
            <Box className="combo_value"></Box>
            <FormControl  >
              <Select 
               size="small"
               id="demo-simple-select"
               value={selectedValue}
               onChange={handleChange}
              >
                <MenuItem value="1">  
                </MenuItem>
                <MenuItem value="0">Sort By Asc Date</MenuItem>
                <MenuItem value="1">Sort By Desc Date</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box className="inner_wraper"  style={{ marginTop:"8px"  }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={5}>
              <div className="card-content">
                {loading ? (
                  <CircularProgress style={{ marginTop: "10rem" }} />
                ) : filteredProjects?.length === 0 ? (
                  <h3 style={{ marginTop: "10rem" }} className="font-semibold text-gray-400">
                    No projects available for this name or category.
                  </h3>
                ) : (
                  filteredProjects?.map((project, index) => (
                    <div
                      className={`card ${
                        expandedProject === project.project_id ? "expanded" : ""
                      }`}
                      onMouseEnter={() =>
                        handleMouseEnter(
                          project.project_id,
                          project.latitude,
                          project.longitude
                        )
                      }
                      onMouseLeave={handleMouseLeave}
                      key={index}
                  
                    >
                      <div className="card-content-wrapper">
                        <h5><span className="text-white">Project Name : </span>{project.project_name}</h5>
                        <h5><span className="text-white">Project Category :</span> {project.category}</h5>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Grid>

            <Grid xs={12} md={6} lg={7} style={{marginTop:"12px"}}>
              <Box
                className="header_map"
                style={{ height: "auto", width: "98%" }}>
                <div style={mapContainerStyle} ref={mapContainer} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Home;
