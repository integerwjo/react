import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Box,
  Avatar,
  Container,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const MatchFixtures = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/fixtures/`)
      .then((res) => res.json())
      .then((data) => {
        setFixtures(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching match fixtures:", err);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 2,
        minHeight: "78vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Small caption instead of big title */}
      <Typography
        variant="overline"
        textAlign="center"
        color="text.secondary"
        sx={{ letterSpacing: 2, mb: 3 }}
      >
        Upcoming Fixtures
      </Typography>

      {loading ? (
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : fixtures.length === 0 ? (
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          <Typography textAlign="center" color="text.secondary">
            No upcoming fixtures available.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          <AnimatePresence>
            {fixtures.map((match, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      border: "1px solid #e5e7eb",
                      borderRadius: 2,
                      backgroundColor: "background.paper",
                      transition: "transform 0.25s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <CardContent>
                      {/* Teams Row */}
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={1}
                        flexWrap="wrap"
                      >
                        {/* Team A */}
                        <Box
                          display="flex"
                          alignItems="center"
                          flex={1}
                          justifyContent="flex-end"
                          minWidth={0}
                          sx={{ overflow: "hidden" }}
                        >
                          <Avatar
                            src={match.team_a?.logo_url}
                            alt={match.team_a?.name}
                            sx={{
                              width: 42,
                              height: 42,
                              mr: 1,
                              bgcolor: "#e0e7ff",
                              color: "#1e3a8a",
                              fontWeight: 700,
                            }}
                          >
                            {match.team_a?.name?.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography variant="subtitle1" fontWeight={600} noWrap>
                            {match.team_a?.name}
                          </Typography>
                        </Box>

                        {/* VS */}
                        <Typography
                          variant="body1"
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
                          sx={{ overflow: "hidden" }}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            noWrap
                            sx={{ mr: 1 }}
                          >
                            {match.team_b?.name}
                          </Typography>
                          <Avatar
                            src={match.team_b?.logo_url}
                            alt={match.team_b?.name}
                            sx={{
                              width: 42,
                              height: 42,
                              bgcolor: "#e0e7ff",
                              color: "#1e3a8a",
                              fontWeight: 700,
                            }}
                          >
                            {match.team_b?.name?.charAt(0).toUpperCase()}
                          </Avatar>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      {/* Date & Venue */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "center", fontStyle: "italic" }}
                      >
                        {new Date(match.date).toLocaleString([], {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        | {match.venue}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      )}
    </Container>
  );
};

export default MatchFixtures;
