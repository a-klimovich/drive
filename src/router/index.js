import { Routes, Route } from "react-router-dom";
import Folders from "components/folders";
import Profile from "../pages/Profile";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Folders />} />
      <Route path="/:folderId" element={<Folders />} />
      <Route path="/user" element={<Profile />} />
    </Routes>
  );
};

export default Router;
