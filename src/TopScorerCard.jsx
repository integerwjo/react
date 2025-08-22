import React from "react";
import { Card, CardContent, Avatar, Typography, Box } from "@mui/material";

const TopScorerCard = ({ player }) => {
  if (!player) return null;

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 2,
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        p: 2,
        maxWidth: 360,
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={player.photo_url}
          alt={player.name}
          sx={{
            width: 64,
            height: 64,
            border: "2px solid #e0e0e0",
          }}
        />
        <Box>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              letterSpacing: 1,
              opacity: 0.9,
            }}
          >
            TOP SCORER
          </Typography>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ color: "#212121", lineHeight: 1.2 }}
          >
            {player.name}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: "#6c757d", // Muted grey for the stat
              lineHeight: 1.2,
              mt: 0.5,
            }}
          >
            {player.stat} Goals
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopScorerCard;