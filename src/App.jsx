import { Routes, Route } from "react-router-dom";
// STYLES
import 'antd/dist/antd.min.css';
import './assets/scss/index.scss';
// COMPONENTS
import Layout from "./components/layout";
// PAGES
import Authorization from './Pages/Auth';
import ResetPassword from './Pages/ResetPassword';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/authorization' element={<Authorization />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        
        <Route path='/' element={ <Layout /> }>
          <Route index element={<Home />} />
          <Route path="folder" element={<p>folder</p>} />
          <Route path="folder/:folderID" element={<p>folderID</p>} />
          <Route path='/*' element={<p>netu nichego</p>} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
