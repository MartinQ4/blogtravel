import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/public/home/Home';
import Login from './pages/public/login/Login';
import Posts from './pages/public/posts/Posts';
import PostDetail from './pages/public/postDetail/PostDetail';
import DashboardUser from './pages/private/dashboardUser/DashboardUser';
import DashboardEditor from './pages/private/dashboardEditor/DashboardEditor';
import DashboardAdmin from './pages/private/dashboardAdmin/DashboardAdmin';
import ManagePostsAdmin from './pages/private/managePostsAdmin/ManagePostsAdmin';
import ManageUsers from './pages/private/manageUsers/ManageUsers';
import ManagePostsEditor from './pages/private/managePostsEditor/ManagePostsEditor';
import WriteNewPost from './pages/private/writeNewPost/WriteNewPost';

function App() {
  const { isAuthenticated, role, currentRole } = useSelector((state) => state.auth);

  return (
    <div className="App">

      <Router>

        <Routes>

          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/posts" element={<Posts/>}/>
          <Route exact path="/posts/:id" element={<PostDetail/>}/>
          <Route exact path="/login" element={<Login/>}/>

          <Route path="/dashboard/user" element={isAuthenticated && currentRole === 'user' ? <DashboardUser/> : <Navigate to="/login"/>}/>
          
          <Route path="/dashboard/editor" element={isAuthenticated && currentRole === 'editor' ? <DashboardEditor/> : <Navigate to="/login"/>}/>
          <Route path="/manage-posts-editor" element={isAuthenticated && currentRole === 'editor' ? <ManagePostsEditor/> : <Navigate to="/login"/>}/>
          <Route path="/write-new-post" element={isAuthenticated && currentRole === 'editor' ? <WriteNewPost/> : <Navigate to="/login"/>}/>
          
          <Route path="/dashboard/admin" element={isAuthenticated && currentRole === 'admin' ? <DashboardAdmin/> : <Navigate to="/login"/>}/>
          <Route path="/manage-posts-admin" element={isAuthenticated && currentRole === 'admin' ? <ManagePostsAdmin/> : <Navigate to="/login"/>}/>
          <Route path="/manage-users" element={isAuthenticated && currentRole === 'admin' ? <ManageUsers/> : <Navigate to="/login"/>}/>



        </Routes>

      </Router>
      
    </div>
  );
}

export default App;
