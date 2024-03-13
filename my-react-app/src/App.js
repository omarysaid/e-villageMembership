import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './layout/Navbar';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Admin from './Dashboard/Admin';
import User from './Dashboard/User';
import AllUsers from './Users/AllUsers';
import AllWards from './Wards/AllWards';
import AllMembers from './Members/AllMembers';
import AddMembers from './Members/AddMembers';
import EditMembers from './Members/EditMembers';
import ViewMembers from './Members/ViewMembers';
import AllLeader from './Leaders/AllLeader';
import AddLeader from './Leaders/AddLeader';
import EditLeader from './Leaders/EditLeader';
import ViewLeader from './Leaders/ViewLeader';
import AddWards from './Wards/AddWards';
import ViewWard from './Wards/ViewWard';
import EditWard from './Wards/EditWard';
function App() {
  return (
    <Router>
      {/* Navbar rendered outside of Routes */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/user" element={<User />} />

        <Route exact path="/allmembers" element={<AllMembers />} />
        <Route exact path="/addmembers" element={<AddMembers />} />
        <Route exact path="/editmembers/:id" element={<EditMembers />} />
        <Route exact path="/viewmembers/:id" element={<ViewMembers />} />

        <Route exact path="/allleader" element={<AllLeader />} />
        <Route exact path="/addleader" element={<AddLeader />} />
        <Route exact path="/viewleader/:id" element={<ViewLeader />} />
        <Route exact path="/editleader/:id" element={<EditLeader />} />


        <Route exact path="/allwards" element={<AllWards />} />
        <Route exact path="/addwards" element={<AddWards />} />
        <Route exact path="/viewward/:id" element={<ViewWard />} />
        <Route exact path="/editward/:id" element={<EditWard />} />



        <Route exact path="/allusers" element={<AllUsers />} />
        <Route exact path="/allwards" element={<AllWards />} />

      </Routes>
    </Router>
  );
}

export default App;
