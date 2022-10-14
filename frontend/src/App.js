import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 

// Pages
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';

// Componentes
import Navbar from './components/Navbar';
import Message from './components/Message';
import PageUser from './pages/PageUser/PageUser';
import PubliDetails from './pages/PubliDetails/PubliDetails';

// hooks
import useUserAuth from './hooks/useUserAuth';
import { useSelector } from 'react-redux';

function App() {
  const { auth, loading: loadingAuth } = useUserAuth();
  const { success } = useSelector((state) => state.auth);

  if(loadingAuth){
    <p>Carregando...</p>
  }

  return (
    
    <div className="App">
      <BrowserRouter>
        <Navbar />
        { success && <Message msg={success} isMsg='success' /> }
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={!auth ? <Auth /> : <Navigate to='/' />} />
          <Route path='/profile' element={auth ? <Profile /> : <Navigate to='/auth' />}></Route>
          <Route path='/dashboard' element={auth ? <Dashboard /> : <Navigate to='/auth' />}></Route>
          <Route path='/user/:id' element={auth ? <PageUser /> : <Navigate to='/auth' />}></Route>
          <Route path='/publi/:id' element={auth ? <PubliDetails /> : <Navigate to='/auth' />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
  
}

export default App;
