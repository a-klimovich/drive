import { Routes, Route } from 'react-router-dom';
import Folders from 'components/Folders';
import Profile from 'pages/Profile';

const Router = () => (
  <Routes>
    <Route path="/" element={<Folders />} />
    <Route path="/:folderId" element={<Folders />} />
    <Route path="/user" element={<Profile />} />
  </Routes>
);

export default Router;
