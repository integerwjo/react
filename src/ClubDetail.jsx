import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import News from "./News.jsx";
import MatchFixtures from "./Fixtures.jsx";
import MatchResults from "./Results.jsx";
import TopScorerCard from "./TopScorerCard.jsx";
import ClubNews from "./ClubNews.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

const ClubDetailsCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [teamContent, setTeamContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(`${apiUrl}/clubs/${id}/`).then((res) => res.json()),
      fetch(`${apiUrl}/clubs-content/${id}`).then((res) => res.json()),
    ])
      .then(([teamData, contentData]) => {
        setTeam(teamData);
        setTeamContent(contentData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [id]);

  // cycle player avatars
  useEffect(() => {
    if (team?.players?.length > 0) {
      const interval = setInterval(() => {
        setCurrentPlayerIndex(
          (prev) => (prev + 1) % team.players.length
        );
      }, 12000); // switch every 12 secondsss
      return () => clearInterval(interval);
    }
  }, [team]);

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!team) {
    return (
      <Typography align="center" variant="h6" sx={{ mt: 4, minHeight: "75vh" }}>
        Club not found.
      </Typography>
    );
  }

  const currentPlayer = team.players?.[currentPlayerIndex];

  return (
    <Box maxWidth="1200px" margin="auto" px={3} py={5} sx={{ minHeight: "75vh" }}>
      {/* Header Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          p: 4,
          borderRadius: 1,
          background: '#fdfdfd',
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          mb: 4,
        }}
      >
        <Box display="flex" alignItems="center" gap={3}>
          <Avatar
            src={team.logo_url}
            alt={team.name}
            sx={{ width: 100, height: 100, border: "3px solid #ddd" }}
          />
          <Box>
            <Typography variant="h4" fontWeight={700}>
              {team.name}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {team.coach ? `Coach: ${team.coach}` : "Coach info not available"}
            </Typography>
          </Box>
        </Box>

        {/* Single cycling player avatar */}
        {currentPlayer && (
          <Avatar
            src={currentPlayer.photo_url}
            alt={currentPlayer.name}
            sx={{
              width: 100,
              height: 100,
              border: "3px solid #fff",
              boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
            }}
          />
        )}
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: "2px solid #ddd",
          mb: 4,
          "& .MuiTab-root": { fontSize: "1rem", fontWeight: 600, px: 2 },
        }}
      >
        <Tab label="Squad" />
        <Tab label="Top Goal Scorer" />
        <Tab label="News" />
        <Tab label="Fixtures" />
        <Tab label="Results" />
      </Tabs>

      {/* Squad Tab */}
      {activeTab === 0 && (
        <TableContainer component={Paper} sx={{ borderRadius: 1, boxShadow: 1 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f8f9fc" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Player</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Position</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {team.players.map((player) => (
                <TableRow
                  key={player.id}
                  hover
                  onClick={() => navigate(`/players/${player.id}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={player.photo_url} sx={{ width: 40, height: 40 }} />
                      <Typography fontWeight={500}>{player.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{player.position || "-"}</TableCell>
                  <TableCell>{player.number || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Top Scorer Tab */}
      {activeTab === 1 && (
        <Box>
          <TopScorerCard player={team.top_scorer} />
        </Box>
      )}

      {/* News Tab */}
      {activeTab === 2 && (
        <Box>
          <ClubNews articles={teamContent.news || []} />
        </Box>
      )}

      {/* Fixtures Tab */}
      {activeTab === 3 && (
        <Box>
          <MatchFixtures fixtures={teamContent.fixtures || []} />
        </Box>
      )}

      {/* Results Tab */}
      {activeTab === 4 && (
        <Box>
          <MatchResults results={teamContent.results || []} />
        </Box>
      )}
    </Box>
  );
};

export default ClubDetailsCard;
