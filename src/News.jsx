import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const apiUrl = import.meta.env.VITE_API_URL; // ✅ adjust to your env
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/news/`)
      .then((res) => res.json())
      .then((data) => setNewsArticles(data))
      .catch((err) => console.error('Error fetching news articles:', err))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  const handleCardClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <Container maxWidth="md" sx={{ py: 2, minHeight: "80vh" }}>
      <Typography
        variant="h5"
        fontWeight={700}
        textAlign="center"
        sx={{
          background: 'linear-gradient(90deg, #1f2937, #6b7280)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: 1,
          mb: 2,
        }}
      >
        Latest Sports News
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={10}>
          <CircularProgress size={40} thickness={4} />
        </Box>
      ) : newsArticles.length === 0 ? (
        <Typography textAlign="center" color="text.secondary" py={4}>
          No articles available.
        </Typography>
      ) : (
        <Stack spacing={4} alignItems="center">
          {newsArticles.map((article) => (
            <Card
              key={article.id}
              onClick={() => handleCardClick(article.id)}
              sx={{
                width: '100%',
                maxWidth: 550,
                borderRadius: 1,
                overflow: 'hidden',
                boxShadow: '0 3px 6px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
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
                  {new Date(article.date).toLocaleDateString()}
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
      )}
    </Container>
  );
};

export default News;
