import React from 'react';
import {
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const News = ({ articles }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/news/${id}`);
  }; 

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            sx={{
              background: "linear-gradient(90deg, #1f2937, #6b7280)", // dark gray to light gray
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 1,
              mb: 2,
            }}
          >
      Latest Sports News
    </Typography>



      <Stack spacing={4} alignItems="center">
        {articles.map((article) => (
       <Card
  key={article.id}
  sx={{
    width: '100%',
    maxWidth: 550,
    borderRadius: 1,
    overflow: 'hidden',
    boxShadow: '0 3px 6px rgba(0,0,0,0.06)',
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      boxShadow: '0 6px 12px rgba(0,0,0,0.12)',
    },
  }}
>
  {article.image_url && (
    <CardMedia
      component="img"
      height="260"
      image={article.image_url}
      alt={article.title}
      sx={{ objectFit: 'cover' }}
    />
  )}
  <CardContent sx={{ p: 3 }}>
    <Typography
      variant="caption"
      sx={{ color: 'text.secondary', fontSize: '0.8rem' }}
    >
      {article.date}
    </Typography>
    <Typography
      variant="h6"
      fontWeight={700}
      mt={1}
      sx={{ lineHeight: 1.3 }}
    >
      {article.title}
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: 'text.secondary', mt: 1 }}
    >
      {article.summary}
    </Typography>
  </CardContent>
</Card>

        ))}
      </Stack>
    </Container>
  );
};

export default News;
