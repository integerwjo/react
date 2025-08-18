import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";
import { Avatar } from "@mui/material";

// Decode JWT without external lib
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = parseJwt(token);
  if (!decoded?.exp) return true;
  return decoded.exp * 1000 < Date.now();
};

const apiUrl = import.meta.env.VITE_API_URL;
const wsUrl = import.meta.env.VITE_WEBSOCKET_URL;


const getNewAccessToken = async (refreshToken) => {
  try {
    const res = await fetch(`${apiUrl}/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    if (!res.ok) throw new Error("Failed to refresh token");
    const data = await res.json();
    if (data.access) {
      localStorage.setItem("access", data.access);
      return data.access;
    }
  } catch (err) {
    console.error("Token refresh failed:", err);
  }
  return null;
};

const getAvatarColor = (char) => {
const colors = [
  "#FF1744", "#00E676", "#2979FF", "#FFD600", "#1DE9B6",
  "#D500F9", "#F50057", "#3D5AFE", "#8D6E63", "#00ACC1",
  "#FF6D00", "#76FF03", "#651FFF", "#00B0FF", "#FF9100",
  "#00B8D4", "#FF1744", "#536DFE", "#FFC400", "#5D4037",
  "#EA80FC", "#40C4FF", "#EEEEEE", "#90A4AE", "#C6FF00", "#FF4081"
];

  const index = char.toUpperCase().charCodeAt(0) - 65; // A = 65
  return colors[index % colors.length];
};

const ChatScreen = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const username = localStorage.getItem("username") || "Guest";

  // Connect WebSocket
  const connectSocket = async () => {
    let token = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");

    if (isTokenExpired(token) && refreshToken) {
      token = await getNewAccessToken(refreshToken);
    }

    if (!token) {
      console.error("No valid token available for WS connection");
      return;
    }

   
    console.log("Connecting with token:", token);
    const ws = new WebSocket(`${wsUrl}/?token=${token}`);

    ws.onopen = () => console.log("WS opened:", wsUrl);
    ws.onerror = (err) => console.error("WebSocket error:", err);

    ws.onclose = (e) => {
      console.warn("WebSocket closed. Reconnecting in 5s...", e.reason);
      setTimeout(connectSocket, 5000);
    };

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.message !== undefined && data.user !== undefined) {
          setMessages((prev) => [
            ...prev,
            {
              user: data.user || "Anonymous",
              message: data.message || "",
              time: data.timestamp
                ? dayjs(data.timestamp).format("HH:mm")
                : dayjs().format("HH:mm"),
            },
          ]);
        } else {
          parseAndPushString(e.data);
        }
      } catch {
        parseAndPushString(e.data);
      }
    };

    setSocket(ws);
  };

  const parseAndPushString = (txt) => {
    if (!txt) return;
    const idx = txt.indexOf(":");
    if (idx > 0) {
      const user = txt.slice(0, idx).trim();
      const message = txt.slice(idx + 1).trim();
      setMessages((prev) => [
        ...prev,
        { user: user || "Anonymous", message, time: dayjs().format("HH:mm") },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { user: "Anonymous", message: txt, time: dayjs().format("HH:mm") },
      ]);
    }
  };

  useEffect(() => {
    connectSocket();
    return () => socket?.close();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const sendMessage = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    const text = input.trim();
    if (!text) return;
    const payload = { message: text, user: username };
    try {
      socket.send(JSON.stringify(payload));
      setInput("");
    } catch (err) {
      console.error("Send failed", err);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 560,
        mx: "auto",
        height: "82vh",
        display: "flex",
        flexDirection: "column",
        borderRadius: 1,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        backgroundColor: "white",
      }}
    >
      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((m, i) => {
  const firstLetter = m.user?.charAt(0)?.toUpperCase() || "?";
  const avatarColor = getAvatarColor(firstLetter);

  return (
    <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 4 }}>
      <Avatar
        sx={{
          bgcolor: avatarColor,
          fontWeight: "bold",
          fontSize: "1rem",
          width: 32,
          height: 32,
        }}
      >
        {firstLetter}
      </Avatar>

      <Paper
        elevation={0}
        sx={{
          p: 1,
          borderRadius: 1.2,
          border: "1px solid rgba(0,0,0,0.06)",
          backgroundColor: "#1f2937",
          flexGrow: 1,
        }}
      >
        <Typography variant="subtitle2" sx={{ color: "white", fontWeight: 600 }}>
          {m.user ?? "Anonymous"}
        </Typography>
        <Typography variant="body1" sx={{ mt: 0.4, color: "white" }}>
          {m.message}
        </Typography>
        <Typography
          variant="caption"
          sx={{ display: "block", textAlign: "right", color: "#f9f9f9" }}
        >
          {m.time}
        </Typography>
      </Paper>
    </Box>
  );
})}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box
        component="form"
        onSubmit={sendMessage}
        sx={{
          display: "flex",
          gap: 1,
          p: 1,
          alignItems: "center",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          bgcolor: "white",
        }}
      >
        <TextField
          placeholder="Be polite..."
          size="small"
          fullWidth
          value={input}
          onChange={(e) => {
            if (e.target.value.length <= 100) setInput(e.target.value);
          }}
          inputProps={{ maxLength: 100 }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              bgcolor: "#f6f6f6",
            },
          }}
        />

        <IconButton
          onClick={sendMessage}
          disabled={!input.trim()}
          sx={{
            bgcolor: "#128C7E",
            color: "white",
            "&:hover": { bgcolor: "#0e6f5f" },
            borderRadius: 2,
            p: 1,
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatScreen;
