import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import "../style/model.css"
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';



const FilterModal = ({ open, handleClose }) => {

  const [searchValue, setSearchValue] = useState('');
  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };
  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter(item => item !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const checkboxValues = ['Mining', 'Sloar', 'Agriculture', 'Transmission Inspection', 'Wind Inspection', 'Corridor Inspection'];
  const checkboxValues1 = ['Personal', 'Shared'];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
    >
      <Box sx={{ width: 500, height: "100vh", bgcolor: 'background.paper', boxShadow: 24, }}>
        <Box className="fixed_header">
          <Box className="model_right_content">
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              lineHeight: '1.875rem',
              letterSpacing: '0rem',
              fontFamily: 'Satoshi-Variable',
              textTransform: 'none'
            }}>Filters</h3>
            <p>Apply filters to data.</p>

          </Box>
          <Box className="model_left_content">
            <CloseIcon onClick={handleClose} />
          </Box>
        </Box>



        <Box className="body_content">
          <div style={{ height: '200px', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#888 #f0f0f0', position: 'relative' }}>
            <h3 style={{ position: 'sticky', top: '0', backgroundColor: '#fff', zIndex: '1', padding: '8px' }}>Project Type</h3>
            {checkboxValues.map(value => (
              <div key={value} style={{ marginBottom: '12px', marginTop: '20px', marginLeft: '12px', fontSize: '16px' }}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    checked={selectedValues.includes(value)}
                    onChange={() => handleCheckboxChange(value)}
                  />
                  {value}
                </label>
              </div>
            ))}
          </div>
          <hr />

          <Box className="select_project">
            <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>Select Project</h4>
            <TextField
              variant="outlined"
              style={{ width: '350px', borderRadius: '50px!important', height: "40px", }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search for project for location"
              value={searchValue}
              onChange={handleChange}
            />
            {/* <hr style={{ marginTop: "25px", color: "pink" }} /> */}

            <Box className="">
              <p style={{ marginTop: "30px", marginBottom: "10px", color: "pink", fontSize: "16px" }}>Select Project</p>
              {checkboxValues1.map(value => (
                <div key={value} style={{ marginBottom: '12px', marginTop: '20px', marginLeft: '12px', fontSize: '16px' }}>
                  <label>
                    <input
                      type="checkbox"
                      value={value}
                      checked={selectedValues.includes(value)}
                      onChange={() => handleCheckboxChange(value)}
                    />
                    {value}
                  </label>
                </div>
              ))}
              <h1>
                hh
              </h1>
           
              
            </Box>

          </Box>

        </Box>
        <Box className="fixed_footer">

          <Box className="reset_text">
            <p style={{ color: "orange" }}>Reset Filter</p>
          </Box>
          <Box className="canceel_text" style={{ display: "flex", gap: "20px" }}>
            <Button style={{ backgroundColor: "white", color: "black" }} variant="contained">
              Cancel
            </Button>
            <Button style={{ backgroundColor: "red" }} variant="contained" color="primary">
              Apply
            </Button>
          </Box>

        </Box>


      </Box>
    </Modal>
  );
};

export default FilterModal;
