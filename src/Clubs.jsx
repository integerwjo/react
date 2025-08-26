import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Clubs = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/clubs/`)
      .then((res) => res.json())
      .then((data) => setClubs(data))
      .catch((err) => console.error("Error fetching clubs:", err))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  const handleRowClick = (team) => {
    navigate(`/clubs/${team.id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: '78vh', pt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!clubs || clubs.length === 0) {
    return (
      <Box sx={{ minHeight: '78vh', pt: 6 }}>
        <Typography variant="h6" align="center" sx={{ color: "text.secondary" }}>
          No clubs available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '78vh', pt: 2 }}>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} aria-label="teams and coaches table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>#</strong></TableCell>
              <TableCell><strong>Team</strong></TableCell>
              <TableCell><strong>Coach</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clubs.map((team, index) => (
              <TableRow
                key={team.id || index}
                hover
                onClick={() => handleRowClick(team)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {team.logo_url ? (
                      <Avatar src={team.logo_url} alt={team.name} sx={{ mr: 1 }} />
                    ) : (
                      <Avatar sx={{ mr: 1 }}>{team.name.charAt(0)}</Avatar>
                    )}
                    <Typography variant="body1">{team.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{team.coach}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Clubs;
