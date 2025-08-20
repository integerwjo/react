import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Grid,
  Stack,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("access");
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // Fetch current logged-in user
  useEffect(() => {
    fetch(`${apiUrl}/users/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Failed to fetch user:", err));
  }, [apiUrl, token]);

  // Fetch user posts/messages
  useEffect(() => {
    fetch(`${apiUrl}/messages/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, [apiUrl, token]);

  // Delete account
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      await fetch(`${apiUrl}/users/me/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/login");
    } catch (err) {
      console.error("Failed to delete account:", err);
    }
  };

  // Delete post
  const handleDeletePost = async (postId) => {
    try {
      await fetch(`${apiUrl}/messages/${postId}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((p) => p.id !== postId));
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  if (!user) return null;

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 },
      }}
    >
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "center", sm: "center" }}
        justifyContent={{ xs: "center", sm: "space-between" }}
        spacing={2}
        mb={5}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 70,
              height: 70,
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            {user.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h5" fontWeight={700}>
            {user.username}
          </Typography>
        </Stack>

        <IconButton
          onClick={handleDeleteAccount}
          sx={{ color: "error.main" }}
          aria-label="delete account"
        >
          <DeleteOutlineIcon fontSize="large" />
        </IconButton>
      </Stack>

      {/* User Posts */}
      <Box>
        <Typography
          variant="h6"
          fontWeight={600}
          mb={3}
          textAlign={{ xs: "center", sm: "left" }}
        >
          Your Messages
        </Typography>

        <Grid container spacing={2}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Grid item xs={12} key={post.id}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    px: 2,
                    py: 2,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                  }}
                >
                  <Typography>{post.content}</Typography>
                  <IconButton
                    onClick={() => handleDeletePost(post.id)}
                    sx={{ color: "error.main" }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Stack>
              </Grid>
            ))
          ) : (
            <Typography
              color="text.secondary"
              textAlign="center"
              width="100%"
              mt={2}
            >
              No messages yet.
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserProfile;
