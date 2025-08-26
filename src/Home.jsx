import React, { useEffect, useState } from 'react';
import stadiumImg from './assets/stadium.jpg';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Avatar,
  CardActionArea,
  CircularProgress,
} from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import HeroTyping from './HeroTyping';
import TopTeamFixtures from './TopTeamsFixtures.jsx';

function Home() {
  const [articles, setArticles] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingFixtures, setLoadingFixtures] = useState(true);
  const [loadingScorers, setLoadingScorers] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch news
    fetch(`${apiUrl}/news/`)
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoadingNews(false);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
        setLoadingNews(false);
      });

    // Fetch fixtures
    fetch(`${apiUrl}/top-teams-fixtures/`)
      .then(res => res.json())
      .then(data => {
        setFixtures(data);
        setLoadingFixtures(false);
      })
      .catch(err => {
        console.error('Error fetching fixtures:', err);
        setLoadingFixtures(false);
      });

    // Fetch top scorers
    fetch(`${apiUrl}/top-scorers/`)
      .then(res => res.json())
      .then(data => {
        setTopScorers(data.slice(0, 3)); // top 3
        setLoadingScorers(false);
      })
      .catch(err => {
        console.error('Error fetching top scorers:', err);
        setLoadingScorers(false);
      });
  }, []);

  const handleCardClick = (id) => {
    console.log('Navigate to article with ID:', id);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `url(${stadiumImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: { xs: 8, md: 12 },
          color: '#fff',
          textAlign: 'center',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(30,60,114,0.7), rgba(42,82,152,0.85))',
            zIndex: 1,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '200%',
            height: '100%',
            backgroundImage: `url('/images/smoke.png')`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'cover',
            opacity: 0.15,
            animation: 'smokeMove 60s linear infinite',
            zIndex: 2,
          },
          '@keyframes smokeMove': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(50%)' },
          },
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 3 }}>
          <SportsSoccerIcon sx={{ fontSize: 50 }} />
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Endebess Football League
          </Typography>
          <HeroTyping />
        </Container>
      </Box>

      {/* Content */}
      <Container sx={{ py: 6 }}>
        {/* News Section */}
        <Section title="Latest News">
          {loadingNews ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : articles.length === 0 ? (
            <Typography>No articles available.</Typography>
          ) : (
            <Grid container spacing={4}>
              {articles.map((article) => (
                <Grid item xs={12} sm={6} md={4} key={article.id}>
                  <Card
                    elevation={0}
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      margin: '0 auto',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid #ddd',
                      borderRadius: 1,
                      transition: '0.2s',
                      '&:hover': { borderColor: '#e6e5e5ff' },
                    }}
                  >
                    <CardActionArea
                      sx={{ height: '100%' }}
                      onClick={() => handleCardClick(article.id)}
                    >
                      {article.image_url && (
                        <CardMedia
                          component="img"
                          image={article.image_url}
                          alt={article.title}
                          height="220"
                        />
                      )}
                      <CardContent>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(article.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="h6" fontWeight={600} mt={1}>
                          {article.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                          {article.summary.length > 100
                            ? `${article.summary.slice(0, 100)}...`
                            : article.summary}{' '}
                          <a
                            href="/news"
                            style={{ color: '#1976d2', textDecoration: 'none' }}
                          >
                            Read more
                          </a>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Section>

        {/* Top Scorers */}
        <Section title="Top goal scorers">
          {loadingScorers ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : topScorers.length === 0 ? (
            <Typography align="center" variant="h6" sx={{ py: 4 }}>
              No top scorers data.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {topScorers.map((player) => (
                <Grid item xs={12} sm={6} md={4} key={player.player_id}>
                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 3,
                      borderRadius: 1,
                      boxShadow: '0 3px 6px rgba(0,0,0,0.04)',
                      transition:
                        'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 6px 12px rgba(0,0,0,0.06)',
                      },
                    }}
                  >
                    <Avatar
                      src={player.photo_url}
                      alt={player.name}
                      sx={{
                        width: 84,
                        height: 84,
                        mr: 3,
                        border: '1.5px solid #010b4eff',
                        borderRadius: '50%',
                      }}
                    />
                    <CardContent sx={{ flex: 1, p: 0 }}>
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{ mb: 0.5, color: 'text.primary' }}
                      >
                        {player.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {player.club_name}
                      </Typography>
                      <Box display="flex" gap={3}>
                        <Typography
                          variant="body1"
                          fontWeight={700}
                          color="success.main"
                        >
                          {player.goals} Goals
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={700}
                          color="warning.main"
                        >
                          {player.assists} Assists
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Section>

        {/* Fixtures */}
        <Section title="Upcoming Fixtures for top teams" variant="h6">
          {loadingFixtures ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : fixtures.length === 0 ? (
            <Typography>No upcoming fixtures.</Typography>
          ) : (
            <TopTeamFixtures fixtures={fixtures} />
          )}
        </Section>
      </Container>
    </Box>
  );
}

// 📦 Reusable section wrapper
function Section({ title, children }) {
  return (
    <Box mb={6}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        {title}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {children}
    </Box>
  );
}

export default Home;
