import { useState, useEffect } from "react"; 
import { BrowserRouter , useParams} from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import AnnouncementsPage from "./Announcements.jsx";
import CustomizedTables from "./Table.jsx";
import MatchFixtures from "./Fixtures.jsx";
import Clubs from './Clubs.jsx'
import MatchResults from "./Results.jsx"; 
import ScoreboardTable from "./Table.jsx";
import ClubDetailsCard from "./ClubDetail.jsx";
import PlayerDetailsCard from "./PlayerDetails.jsx"; 
import SignIn from "./SignIn.jsx";
import SignUpForm from "./SignUp.jsx";
import News from "./News.jsx"; 
import ChatScreen from "./Chats.jsx"; 
import ChatRoom from "./ChatRoom.jsx"; 
import UserProfile from './Profile.jsx'

const apiUrl = import.meta.env.VITE_API_URL;
const wsUrl = import.meta.env.VITE_WEBSOCKET_URL;



function App() {


const ChatRoomWrapper = () => {
  const { roomName } = useParams();
  return <ChatRoom roomName={roomName} />;
};

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/players/:id" element={<PlayerDetailsCard  />} />
          <Route path="/clubs/:id" element={<ClubDetailsCard   />} />
          <Route path="/fixtures" element={<MatchFixtures  />} />
          <Route path="/league-table" element={<ScoreboardTable  />} />
          <Route path="/results" element={<MatchResults  />} />
          <Route path="/clubs" element={<Clubs  />} />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

