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
  Paper
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
  const topTeams = ['Team A', 'Team B']; // ← replace with actual top two team names
  const apiUrl = import.meta.env.VITE_API_URL;
  const wsUrl = import.meta.env.VITE_WEBSOCKET_URL;
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;

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
        setTopScorers(data.slice(0, 3)); // take top 3
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
            background: 'linear-gradient(180deg, rgba(30,60,114,0.7), rgba(42,82,152,0.85))',
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
            <HeroTyping/>
        </Container>
      </Box>

      {/* Content */}
      <Container sx={{ py: 6 }}>
        {/* News Section */}
   <Section title="Latest News">
  {loadingNews ? (
    <Typography>Loading articles...</Typography>
  ) : articles.length === 0 ? (
    <Typography>No articles available.</Typography>
  ) : (
    <Grid container spacing={4} >
      {articles.map(article => (
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
              '&:hover': {
                borderColor: '#e6e5e5ff',
              },
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
                  <a href="/news" style={{ color: '#1976d2', textDecoration: 'none' }}>
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

<Section title="Top Scorers">
  {loadingScorers ? (
    <Typography>Loading top scorers...</Typography>
  ) : topScorers.length === 0 ? (
    <Typography>No top scorers data.</Typography>
  ) : (
    <Grid container spacing={2}>
      {topScorers.map((player) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={player.player_id}
          sx={{ px: 3 }} // horizontal spacing
        >
          <Card
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              width: '100%',
              maxWidth: '100%',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.01)',
              },
              border: 'none',
              borderRadius: 0,
              boxShadow: 'none',
              border: '1px solid #ddd',
            }}
          >
            <Avatar
              src={player.photo_url}
              alt={player.ima}
              sx={{ width: 64, height: 64, mr: 2 }}
              variant="rounded"
            />
            <CardContent sx={{ flex: '1 1 auto', p: 0 }}>
              <Typography variant="h6" fontWeight={700} noWrap>
                {player.player_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {player.club_name}
              </Typography>
              <Box mt={1} display="flex" gap={2}>
                <Typography variant="body2" color="text.primary">
                  <strong>{player.goals}</strong> Goals
                </Typography>
                <Typography variant="body2" color="text.primary">
                  <strong>{player.assists}</strong> Assists
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )}
</Section>


    {/* Top Teams Fixtures Section */}
        <Section title="Upcoming Fixtures for top teams" variant="h6">
      {loadingFixtures ? (
        <Typography>Loading fixtures...</Typography>
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
