import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  ButtonBase,
  CircularProgress, // Import CircularProgress
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import News from './News.jsx'; 
import MatchFixtures from './Fixtures.jsx';
import MatchResults from './Results.jsx'; // Assuming you have a MatchResults component
import TopScorerCard from './TopScorerCard.jsx';

const apiUrl = import.meta.env.VITE_API_URL;

const StatCard = ({ title, players, onPlayerClick }) => (
  <Box
    border="1px solid #ddd"
    borderRadius={2}
    px={2}
    py={1.5}
    minWidth={240}
    flex={1}
  >
    <Typography variant="subtitle2" color="text.secondary" mb={1}>
      {title}
    </Typography>
    {players.map((p, i) => (
      <ButtonBase
        key={p.id || i}
        onClick={() => onPlayerClick(p.id)}
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
          py: 1,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar src={p.photo_url} sx={{ width: 28, height: 28 }} />
          <Typography variant="body2">{p.name}</Typography>
        </Box>
        {p.stat != null && (
          <Box
            bgcolor="#efefef"
            borderRadius={1}
            px={1}
            fontSize={13}
            fontWeight={500}
          >
            {p.stat}
          </Box>
        )}
      </ButtonBase>
    ))}
  </Box>
);

const ClubDetailsCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [teamContent, setTeamContent] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setLoading(true); // Set loading to true on mount or ID change
    
    // Use Promise.all to fetch both data sets in parallel
    Promise.all([
      fetch(`${apiUrl}/clubs/${id}/`).then(res => res.json()),
      fetch(`${apiUrl}/clubs-content/${id}`).then(res => res.json())
    ])
    .then(([teamData, contentData]) => {
      setTeam(teamData);
      setTeamContent(contentData);
      setLoading(false); // Set loading to false after both fetches complete
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      setLoading(false); // Make sure to set loading to false on error too
    });
  }, [id]);

  // Conditional rendering for the loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Handle case where team data is not found after loading
  if (!team) {
    return <Typography align="center" variant="h6" sx={{ mt: 4 }}>Club not found.</Typography>;
  }

  return (
    <Box maxWidth={1000} margin="auto" px={2} py={4} sx={{minHeight: '75vh'}}>
      {/* Header */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar src={team.logo_url} alt={team.name} sx={{ width: 64, height: 64 }} />
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {team.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {team.coach ? `Coach: ${team.coach}` : 'No coach info'}
          </Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: '1px solid #ddd', mb: 3 }}
      >
        <Tab label="Squad" />
        <Tab label="Stats" />
        <Tab label="News" />
        <Tab label="Fixtures" />
        <Tab label="Results" />
      </Tabs>

      {/* Squad Tab */}
      {activeTab === 0 && (
        <TableContainer >
          <Table>
            <TableHead sx={{ backgroundColor: '#f6f3f3ff' }}>
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {team.players.map((player) => (
                <TableRow
                  key={player.id}
                  hover
                  onClick={() => navigate(`/players/${player.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar src={player.photo_url} sx={{ width: 28, height: 28 }} />
                      {player.name}
                    </Box>
                  </TableCell>
                  <TableCell>{player.position || '-'}</TableCell>
                  <TableCell>{player.number || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Stats Tab */}
      {activeTab === 1 && (
        <Box>
          <TopScorerCard player={team.top_scorer}/>
        </Box>
      )}

      {/* News Tab */}
      {activeTab === 2 && (
        <Box>
          <News articles={teamContent.news} />
        </Box>
      )}

      {/* Fixtures Tab */}
      {activeTab === 3 && (
        <Box>
          <MatchFixtures fixtures={teamContent.fixtures} />
        </Box>
      )}

      {/* Results Tab */}
      {activeTab === 4 && (
        <Box sx={{  }}>
          <MatchResults results={teamContent.results} />
        </Box>
      )}
    </Box>
  );
};

export default ClubDetailsCard;