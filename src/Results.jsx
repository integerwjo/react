import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  Container,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const MatchResults = ({ results }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getInitials = (name) =>
    !name ? '?' : (name.trim().split(' ').map(w => w[0]).join('') || '?').toUpperCase();

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            sx={{
              background: "linear-gradient(90deg, #1f2937, #6b7280)", // dark gray to light gray
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 1,
              mb: 5,
            }}
          >
      Match Results
    </Typography>
      <Grid container spacing={2}>
        {results.map((match, i) => (
          <Grid item xs={12} sm={12} md={6} key={i}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 1,
                borderColor: '#e0e0e0',
                backgroundColor: 'background.paper',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
                  <Box display="flex" alignItems="center" flex={1} minWidth={0}>
                    <Avatar
                      sx={{ bgcolor: 'primary.main', width: 42, height: 42, fontSize: 18, mr: 1 }}
                      src={match.team_a?.logo_url}
                      alt={match.team_a?.name || ''}
                    >
                      {!match.team_a?.logo_url && getInitials(match.team_a?.name)}
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={600} noWrap>
                      {match.team_a?.name}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight="900"
                    sx={{ mx: 2, color: 'text.primary', flexShrink: 0 }}
                  >
                    {match.score_a ?? '-'} : {match.score_b ?? '-'}
                  </Typography>

                  <Box display="flex" alignItems="center" flex={1} justifyContent="flex-end" minWidth={0}>
                    <Typography variant="subtitle1" fontWeight={600} noWrap sx={{ mr: 1 }}>
                      {match.team_b?.name}
                    </Typography>
                    <Avatar
                      sx={{ bgcolor: 'primary.main', width: 42, height: 42, fontSize: 18 }}
                      src={match.team_b?.logo_url}
                      alt={match.team_b?.name || ''}
                    >
                      {!match.team_b?.logo_url && getInitials(match.team_b?.name)}
                    </Avatar>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                  {new Date(match.date).toLocaleString([], {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  | {match.venue}
                </Typography>

                <Box display="flex" justifyContent="center" mt={1}>
                  <IconButton onClick={() => toggleExpand(i)} size="small">
                    {expandedIndex === i ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>

                <Collapse in={expandedIndex === i} timeout="auto" unmountOnExit>
                  <Box mt={3} display="flex" flexDirection="column" alignItems="left">
                    {match.goals && match.goals.length > 0 ? (
                      match.goals.map((goal, idx) => (
                        <Box
                          key={idx}
                          display="flex"
                          alignItems="center"
                          mb={2}
                          sx={{ gap: 1.5 }}
                        >
                          <Avatar
                            src={goal.photo_url || ''}
                            sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: 14 }}
                          >
                            {!goal.photo_url && getInitials(goal.player_name)}
                          </Avatar>
                          <Typography variant="body2">
                            ⚽ {goal.player_name} {goal.minute ? `- ${goal.minute}′` : ''}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No goals recorded
                      </Typography>
                    )}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MatchResults;
