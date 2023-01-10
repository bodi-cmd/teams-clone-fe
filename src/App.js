import "./App.scss";
import RequireAuth from "./components/requireAuth/RequireAuth";
import { CONFIG } from "./config/app.config";
import { Route, Routes } from "react-router-dom";
import LeftNavbar from "./components/leftNavbar/LeftNavbar";
import VideoBackground from "./components/videoBackground/VideoBackground";
import LeftTopNavbarLayout from "./layouts/leftTopNavbarLayout/LeftTopNavbarLayout";
import TopNavbar from "./components/topNavbar/TopNavbar";
import ChatPage from "./pages/chatPage/ChatPage";
import GroupsPage from "./pages/groupsPage/GroupsPage";
import Login from "./pages/loginPage/Login";
import Register from "./pages/registerPage/Register";
import ViewGroupPage from "./pages/viewGroupPage/ViewGroupPage";
import ViewProfile from "./pages/viewProfile/ViewProfile";
import ViewNotifications from "./pages/viewNotifications/ViewNotifications";
import ViewGradesPage from "./pages/viewGradesPage/ViewGradesPage";
import ViewAssignmentsPage from "./pages/viewAssignmentsPage/ViewAssignmentsPage";
import UsersPage from "./pages/usersPage/UsersPage";

function App() {
  const application = (
    <LeftTopNavbarLayout leftNavbar={<LeftNavbar/>} topNavbar={<TopNavbar/>}>
      <Routes>
        <Route path="/chat" element={<ChatPage/>}></Route>
        <Route path="/groups" element={<GroupsPage/>}></Route>
        <Route path="/group/:id" element={<ViewGroupPage/>}></Route>
        <Route path="/profile" element={<ViewProfile/>}></Route>
        <Route path="/notifications" element={<ViewNotifications/>}></Route>
        <Route path="/grades" element={<ViewGradesPage/>}></Route>
        <Route path="/tasks" element={<ViewAssignmentsPage/>}></Route>
        <Route path="/users" element={<UsersPage/>}></Route>
      </Routes>
    </LeftTopNavbarLayout>
  );

  const page_router = CONFIG.PRODUCTION ? <RequireAuth>{application}</RequireAuth> : application;

  return (
    <>
      <VideoBackground />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={page_router} />
      </Routes>
    </>
  );
}
export default App;
