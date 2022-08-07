import { Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import NewPost from "./pages/NewPost";
import Profile from "./pages/Profile";
import Profiles from "./pages/Profiles";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/create" element={<NewPost />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profiles" element={<Profiles />} />
    </Routes>
  );
};

export default CustomRoutes;