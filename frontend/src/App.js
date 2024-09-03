import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import Complaint from './components/Complaint';
import Who from './components/Who';
import ViewComplaint from './components/ViewComplaint';
import StudentDetail from './components/StudentDetail';
import Status from './components/Status';
import Home from './components/Home';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/complaint/:id' element={<Complaint/>}/>
        <Route path="/view_Complaint" element={<ViewComplaint/>}/>
        <Route path='/logout' element={<h1>LogOut pege</h1>}/>
        <Route path='/student_detail/:id' element={<StudentDetail/>}/>
        <Route path="/status/:id" element={<Status/>}/>
        </Route>
        <Route path="/who" element={<Who/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
