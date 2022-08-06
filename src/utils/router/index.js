import { Routes, Route } from "react-router-dom";
import Folders from "../../components/Folders";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Folders />} />
      <Route path="/:folderId" element={<Folders />} />
    </Routes>
  );
};

export default Router;
