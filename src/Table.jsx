import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar,
  Typography, Box, useTheme, useMediaQuery,
  CircularProgress
} from '@mui/material';

const ScoreboardTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const apiUrl = import.meta.env.VITE_API_URL;

  const [clubStats, setClubStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/standings/`)
      .then(res => res.json())
      .then(data => setClubStats(data))
      .catch(err => console.error('Error fetching club stats:', err))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '70vh', pt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!clubStats || clubStats.length === 0) {
    return (
      <Box sx={{ minHeight: '78vh', pt: 6 }}>
        <Typography variant="h6" align="center" sx={{ color: 'text.secondary' }}>
          No scoreboard data available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '78vh', pt: 2 }}>
      <TableContainer component={Paper} elevation={0} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: isMobile ? 650 : 900 }} aria-label="league table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e8f0fe' }}>
              <TableCell><strong>Pos</strong></TableCell>
              <TableCell><strong>Club</strong></TableCell>
              <TableCell align="center"><strong>Pts</strong></TableCell>
              <TableCell align="center"><strong>MP</strong></TableCell>
              <TableCell align="center"><strong>W</strong></TableCell>
              <TableCell align="center"><strong>D</strong></TableCell>
              <TableCell align="center"><strong>L</strong></TableCell>
              {!isMobile && <TableCell align="center"><strong>GF</strong></TableCell>}
              {!isMobile && <TableCell align="center"><strong>GA</strong></TableCell>}
              {!isMobile && <TableCell align="center"><strong>GD</strong></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {clubStats.map((team, index) => (
              <TableRow key={team.id || index} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {team.club.logo_url && (
                      <Avatar src={team.club.logo_url} alt={team.club.name} sx={{ mr: 1 }} />
                    )}
                    <Typography variant="body1">
                      {team.club.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">{team.points}</TableCell>
                <TableCell align="center">{team.played}</TableCell>
                <TableCell align="center">{team.wins}</TableCell>
                <TableCell align="center">{team.draws}</TableCell>
                <TableCell align="center">{team.losses}</TableCell>
                {!isMobile && (
                  <TableCell align="center">{team.goals_for}</TableCell>
                )}
                {!isMobile && (
                  <TableCell align="center">{team.goals_against}</TableCell>
                )}
                {!isMobile && (
                  <TableCell align="center">{team.goal_difference}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ScoreboardTable;
