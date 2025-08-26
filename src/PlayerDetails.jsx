import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";

const PlayerDetailsCard = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

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
    photo_url,
    foot,
    club_name,
    stats,
  } = player;

  return (
    <Card sx={{ maxWidth: 820, mx: "auto", borderRadius: 1 }}>
      <CardContent
        sx={{
          px: { xs: 3, sm: 5 },
          py: { xs: 4, sm: 6 },
          display: "flex",
          flexDirection: "column",
          gap: 4, // SECTION GAP — big breathing room between sections
        }}
      >
        {/* Top: Avatar + Name */}
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2.5, // spacing between avatar, name, chip
          }}
        >
          <Avatar
            src={photo_url}
            alt={name}
            sx={{ width: 150, height: 150, border: '1px solid #010b4eff', }}
          />
          <Typography variant="h5" fontWeight={800}>
            {name}
          </Typography>
          <Chip label={position} color="primary" size="medium" />
        </Box>

        <Divider />

        {/* Player Info — two rows (3 per row at sm+). */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Player Info
          </Typography>

          <Grid
            container
            rowSpacing={3}
            columnSpacing={3}
            // This layout becomes 3 columns at sm+, 2 columns on xs.
          >
            {[
              { label: "Club", value: club_name },
              { label: "Number", value: number },
              { label: "Age", value: age },
              { label: "Height", value: height ? `${height} cm` : "—" },
              { label: "Foot", value: foot || "—" },
            ].map((item, idx) => (
              <Grid item xs={6} sm={4} key={idx}>
                <Box
                  sx={{
                    p: 1.5, // inner padding so each tile has air
                  }}
                >
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {item.value}
                  </Typography>
                </Box>
              </Grid>
            ))}

            {/* Filler to keep 3 items per row at sm+ (forces a visible second row). */}
            <Grid
              item
              xs={6}
              sm={4}
              sx={{ display: { xs: "none", sm: "block" } }}
            />
          </Grid>
        </Box>

        <Divider />

        {/* Stats — two rows, two items each with strong spacing */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Stats
          </Typography>

          <Grid container rowSpacing={3} columnSpacing={3}>
            {[
              { label: "Goals", value: stats?.goals },
              { label: "Assists", value: stats?.assists },
              { label: "Yellow Cards", value: stats?.yellow_cards },
              { label: "Red Cards", value: stats?.red_cards },
            ].map((item, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Box
                  sx={{
                    p: 2.5, // generous padding for each stat box
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="h4" fontWeight={800}>
                    {item.value ?? "—"}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlayerDetailsCard;
