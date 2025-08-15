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
import dayjs from "dayjs";
const apiUrl = import.meta.env.VITE_API_URL;
const wsUrl = import.meta.env.VITE_WEBSOCKET_URL;
const mediaUrl = import.meta.env.VITE_MEDIA_URL;

const TopTeamFixtures = ({ fixtures }) => {
  return (
    <Grid container spacing={2}>
      {fixtures.map((fixture, index) => (
       <Grid item xs={12} sm={12} md={6} key={index}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 2,
              borderColor: '#e0e0e0',
              width: '100%',
              backgroundColor: 'background.paper',
              transition: 'border-color 0.2s ease',
              '&:hover': {
                borderColor: 'primary.main',
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
                <Box display="flex" alignItems="center" flex={1} justifyContent="flex-end">
                  <Avatar
                    src={fixture.team_a?.logo_url}
                    alt={fixture.team_a_name}
                    sx={{ width: 42, height: 42, mr: 1 }}
                  />
                  <Typography variant="subtitle1" fontWeight={600}>
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
                <Box display="flex" alignItems="center" flex={1} justifyContent="flex-start">
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mr: 1 }}>
                    {fixture.team_b_name}
                  </Typography>
                  <Avatar
                    src={fixture.team_b?.logo_url}
                    alt={fixture.team_b_name}
                    sx={{ width: 42, height: 42 }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              {/* Date & Venue */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center' }}
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
