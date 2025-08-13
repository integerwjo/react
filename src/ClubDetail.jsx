import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const ClubDetailsCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/clubs/${id}/`)
      .then(res => res.json())
      .then(setTeam)
      .catch(console.error);
  }, [id]);

  if (!team) return <Typography align="center">Loading...</Typography>;

  return (
    <Box maxWidth={1000} margin="auto">
      {/* Club Header */}
      <Card sx={{ borderRadius: 1, border: '1px solid #e0e0e0', backgroundColor: '#fafafa', mb: 4 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={3} mb={3} flexWrap="wrap">
            <Avatar
              src={team.logo_url}
              alt={team.name}
              sx={{ width: 80, height: 80, border: '2px solid #e0e0e0', backgroundColor: '#fff' }}
            />
            <Typography variant="h5" fontWeight={700}>
              {team.name}
            </Typography>
          </Box>
          <Typography variant="subtitle2" color="text.secondary">
            Coach
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {team.coach || 'N/A'}
          </Typography>
        </CardContent>
      </Card>

      {/* Top Scorer Card */}
      {team.top_scorer && (
        <Card
          onClick={() => navigate(`/players/${team.top_scorer.id}`)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            mb: 4,
            maxWidth: 400,
            borderRadius: 1,
            backgroundColor: '#fafafa',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
        >
          <Avatar
            src={team.top_scorer.photo_url}
            alt={team.top_scorer.name}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <CardContent sx={{ p: 0 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Top Scorer
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {team.top_scorer.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 0.5,
                backgroundColor: '#e0f7fa',
                color: '#006064',
                px: 1,
                py: 0.3,
                borderRadius: 2,
                display: 'inline-block',
                fontWeight: 500,
              }}
            >
              {team.top_scorer.stat} goals
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Squad List */}
      <Card sx={{ borderRadius: 1, border: '1px solid #e0e0e0', backgroundColor: '#fafafa' }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Squad
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none', overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Position</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {team.players.map((player, index) => (
                  <TableRow
                    key={player.id || index}
                    hover
                    onClick={() => navigate(`/players/${player.id}`)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        {player.photo_url && (
                          <Avatar src={player.photo_url} alt={player.name} sx={{ width: 30, height: 30, mr: 1 }} />
                        )}
                        {player.name}
                      </Box>
                    </TableCell>
                    <TableCell>{player.position}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClubDetailsCard;
