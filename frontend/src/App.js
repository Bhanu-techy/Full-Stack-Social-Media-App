import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile'
import Myprofile from './components/Myprofile';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route exact path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route exact path='/profile/:id' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      <Route path='/myprofile' element={<Myprofile/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;