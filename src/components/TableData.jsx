import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

function TableData() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('');
        const result = await response.json();
        setData(result);
        setLoading(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(true);
      }
    };


    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    fetchData();

    return () => clearTimeout(timeout); 
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dataset Details</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Processing Status</TableCell>
            <TableCell>Last Updated</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.language}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableData;
