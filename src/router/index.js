import { Routes, Route } from 'react-router-dom';
import Apeals from 'pages/Apeals';
import Drive from 'pages/Drive';
import Profile from 'pages/Profile';
import Reports from 'pages/Reports';

const Router = () => (
  <Routes>
    <Route path="/" element={<Drive />} />
    <Route path="/:folderId" element={<Drive />} />
    <Route path="/user" element={<Profile />} />
    <Route path="/reports" element={<Reports />} />
    <Route path="/appeals" element={<Apeals />} />
  </Routes>
);

export default Router;
