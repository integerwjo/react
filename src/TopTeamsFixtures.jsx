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
    <Grid container spacing={2}>
      {fixtures.map((fixture, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Card
            variant="outlined"
            sx={{
              border: '1px solid #e5e7eb',
              borderRadius: 0,
              boxShadow: 'none',
              backgroundColor: 'background.paper',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.01)',
              },
            }}
          >
            <CardContent>
              {/* Teams Row */}
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
              >
                {/* Team A */}
                <Box
                  display="flex"
                  alignItems="center"
                  flex={1}
                  justifyContent="flex-end"
                  minWidth={0}
                  sx={{ overflow: 'hidden' }}
                >
                  <Avatar
                    src={fixture.team_a?.logo_url}
                    alt={fixture.team_a_name}
                    sx={{
                      width: 48,
                      height: 48,
                      mr: 1,
                      bgcolor: '#e0e7ff',
                      color: '#1e3a8a',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {fixture.team_a_name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    noWrap
                  >
                    {fixture.team_a_name}
                  </Typography>
                </Box>

                {/* VS */}
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="primary"
                  sx={{ mx: 1 }}
                >
                  VS
                </Typography>

                {/* Team B */}
                <Box
                  display="flex"
                  alignItems="center"
                  flex={1}
                  justifyContent="flex-start"
                  minWidth={0}
                  sx={{ overflow: 'hidden' }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    noWrap
                    sx={{ mr: 1 }}
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
                      flexShrink: 0,
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
