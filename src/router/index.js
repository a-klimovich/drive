import { Routes, Route } from 'react-router-dom';
import Appeals from 'pages/Appeals';
import Drive from 'pages/Drive';
import Profile from 'pages/Profile';
import Reports from 'pages/Reports';

const Router = () => (
  <Routes>
    <Route path="/" element={<Drive />} />
    <Route path="/:folderId" element={<Drive />} />
    <Route path="/user" element={<Profile />} />
    <Route path="/reports" element={<Reports />} />
    <Route path="/appeals" element={<Appeals />} />
  </Routes>
);

export default Router;
