import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  Divider,
} from "@mui/material";

const TopTeamFixtures = ({ fixtures }) => {
  return (
    <Grid container spacing={3}>
      {fixtures.map((fixture, index) => (
        <Grid item xs={12} sm={12} md={6} key={index}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 3,
              borderColor: '#e5e7eb',
              boxShadow: 1,
              backgroundColor: 'background.paper',
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              {/* Teams Row */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                sx={{ gap: 2 }}
              >
                {/* Team A */}
                <Box
                  display="flex"
                  alignItems="center"
                  flex={1}
                  justifyContent="flex-end"
                >
                  <Avatar
                    src={fixture.team_a?.logo_url}
                    alt={fixture.team_a_name}
                    sx={{
                      width: 48,
                      height: 48,
                      mr: 1.5,
                      bgcolor: '#e0e7ff',
                      color: '#1e3a8a',
                      fontWeight: 700,
                    }}
                  >
                    {fixture.team_a_name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    {fixture.team_a_name}
                  </Typography>
                </Box>

                {/* VS */}
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="primary"
                  sx={{ mx: 2 }}
                >
                  VS
                </Typography>

                {/* Team B */}
                <Box
                  display="flex"
                  alignItems="center"
                  flex={1}
                  justifyContent="flex-start"
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mr: 1.5, whiteSpace: 'nowrap' }}
                  >
                    {fixture.team_b_name}
                  </Typography>
                  <Avatar
                    src={fixture.team_b?.logo_url}
                    alt={fixture.team_b_name}
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: '#e0e7ff',
                      color: '#1e3a8a',
                      fontWeight: 700,
                    }}
                  >
                    {fixture.team_b_name?.charAt(0).toUpperCase()}
                  </Avatar>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Date & Venue */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center', fontStyle: 'italic' }}
              >
                {new Date(fixture.date).toLocaleString([], {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                | {fixture.venue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopTeamFixtures;

