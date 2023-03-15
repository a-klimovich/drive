import { Routes, Route } from 'react-router-dom';
import Drive from 'pages/Drive';
import Profile from 'pages/Profile';

const Router = () => (
  <Routes>
    <Route path="/" element={<Drive />} />
    <Route path="/:folderId" element={<Drive />} />
    <Route path="/user" element={<Profile />} />
    {/* <Route path="/reports" element={<Profile />} /> */}
  </Routes>
);

export default Router;
