import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Chip,
  Divider,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const PlayerDetailsCard = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetch(`${apiUrl}/players/${id}/`)
      .then((res) => res.json())
      .then((data) => setPlayer(data))
      .catch((err) => console.error("Failed to fetch player:", err));
  }, [id]);

  if (!player) return null;

  const {
    name,
    position,
    number,
    age,
    height,
    nationality,
    photo_url,
    foot,
    club_name,
    stats,
  } = player;

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        px: { xs: 3, sm: 5 },
        py: { xs: 4, sm: 6 },
        bgcolor: theme.palette.mode === "dark" ? "#121212" : "#fafafa",
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      {/* Avatar */}
      <Avatar
        src={photo_url}
        alt={name}
        sx={{
          width: 160,
          height: 160,
          mx: "auto",
          mb: 2,
        }}
      />

      {/* Player Info */}
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {name}
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
      >
        <Chip
          label={position}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            fontWeight: 600,
          }}
        />
        {foot && (
          <Chip
            label={`${foot}-footed`}
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#333" : "#eee",
              fontWeight: 500,
            }}
          />
        )}
      </Stack>

      {/* Player Details */}
      <Grid container spacing={4} justifyContent="center" mb={3}>
        {[
          { label: "Club", value: club_name },
          { label: "Number", value: number },
          { label: "Age", value: age },
          { label: "Height", value: height ? `${height} cm` : "—" },
        ].map((item, idx) => (
          <Grid item xs={6} sm={3} key={idx}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {item.label}
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {item.value ?? "—"}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Stats */}
      <Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Player Stats
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {[
            { label: "Goals", value: stats.goals },
            { label: "Assists", value: stats.assists },
            { label: "Yellow Cards", value: stats.yellow_cards },
            { label: "Red Cards", value: stats.red_cards },
          ].map((item, idx) => (
            <Grid item xs={6} sm={3} key={idx}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {item.label}
              </Typography>
              <Typography variant="h5" fontWeight={700} color="primary">
                {item.value ?? "—"}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PlayerDetailsCard;
