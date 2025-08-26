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
  useMediaQuery,
  useTheme,
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
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(`${apiUrl}/clubs/${id}/`).then((res) => res.json()),
      fetch(`${apiUrl}/clubs-content/${id}`).then((res) => res.json()),
    ])
      .then(([teamData, contentData]) => {
        setTeam(teamData);
        setTeamContent(contentData);

        if (teamData?.players?.length > 0) {
          const randomIndex = Math.floor(Math.random() * teamData.players.length);
          setCurrentPlayerIndex(randomIndex);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [id]);

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

  const currentPlayer =
    currentPlayerIndex !== null ? team.players?.[currentPlayerIndex] : null;

  return (
    <Box maxWidth="1200px" margin="auto" px={{ xs: 2, sm: 3 }} py={5} sx={{ minHeight: "75vh" }}>
      {/* Header Section */}
      <Box
        display="flex"
        flexDirection="row" // stay row always
        alignItems="center"
        justifyContent="space-between"
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 1,
          background: "#fdfdfd",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          mb: 4,
          gap: 2,
        }}
      >
        {/* Club Info + Logo */}
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src={team.logo_url}
            alt={team.name}
            sx={{
              width: isMobile ? 60 : 100,
              height: isMobile ? 60 : 100,
              border: "3px solid #ddd",
            }}
          />
          <Box>
            <Typography variant={isMobile ? "h6" : "h4"} fontWeight={700}>
              {team.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {team.coach ? `Coach: ${team.coach}` : "Coach info not available"}
            </Typography>
          </Box>
        </Box>

        {/* Player Image */}
        {currentPlayer && (
          <Avatar
            src={currentPlayer.photo_url}
            alt={currentPlayer.name}
            sx={{
              width: isMobile ? 60 : 100,
              height: isMobile ? 60 : 100,
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
          "& .MuiTab-root": {
            fontSize: { xs: "0.85rem", sm: "1rem" },
            fontWeight: 600,
            px: { xs: 1, sm: 2 },
          },
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
        <TableContainer sx={{  overflowX: "auto" }}>
          <Table size={isMobile ? "small" : "medium"}>
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
                      <Avatar src={player.photo_url} sx={{ width: 35, height: 35 }} />
                      <Typography fontWeight={500} fontSize={{ xs: "0.9rem", sm: "1rem" }}>
                        {player.name}
                      </Typography>
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
        <Box mt={2}>
          <TopScorerCard player={team.top_scorer} />
        </Box>
      )}

      {/* News Tab */}
      {activeTab === 2 && (
        <Box mt={2}>
          <ClubNews articles={teamContent.news || []} />
        </Box>
      )}

      {/* Fixtures Tab */}
      {activeTab === 3 && (
        <Box mt={2}>
          <MatchFixtures fixtures={teamContent.fixtures || []} />
        </Box>
      )}

      {/* Results Tab */}
      {activeTab === 4 && (
        <Box mt={2}>
          <MatchResults results={teamContent.results || []} />
        </Box>
      )}
    </Box>
  );
};

export default ClubDetailsCard;
