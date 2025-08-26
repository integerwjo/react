// src/components/ClubNews.jsx
import React from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

const ClubNews = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ mt: 2 }}
      >
        No news available for this club.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {articles.map((article, index) => (
        <Grid item xs={12} sm={6} md={4} key={article.id || index}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Paper
              elevation={1}
              sx={{
                borderRadius: 1,
                overflow: "hidden",
                height: "100%",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.25s ease",
                "&:hover": { transform: "translateY(-1px)" },
              }}
              onClick={() => window.open(article.url || "#", "_blank")}
            >
              {/* Image */}
              {article.image_url && (
                <Box
                  component="img"
                  src={article.image_url}
                  alt={article.title}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                  }}
                />
              )}

              {/* Text */}
              <Box p={2} flexGrow={1} display="flex" flexDirection="column">
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  noWrap
                >
                  {article.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    flexGrow: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {article.summary || "No description available."}
                </Typography>
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{ mt: 1, fontWeight: 500 }}
                >
                  {article.published_at
                    ? new Date(article.published_at).toLocaleDateString()
                    : ""}
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ClubNews;
