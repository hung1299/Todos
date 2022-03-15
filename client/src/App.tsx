import { Container, CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RootState } from './app/store';
import { GetUser } from './features/userSlice';
import Home from './pages/Home';
import Login from './pages/Login';

import './App.css';

function App() {
  const user = useSelector((state: RootState) => state.user.value.username);
  const dispatch = useDispatch();

  useEffect(() => {
    const JSONdata = localStorage.getItem('user');
    if (!JSONdata) return;
    const userParse = JSON.parse(JSONdata);

    if (userParse) dispatch(GetUser(userParse));
  }, [user, dispatch]);

  return (
    <div className='App'>
      <CssBaseline />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route
              path='/login'
              element={user ? <Navigate to='/' /> : <Login />}
            />
            <Route
              path='/*'
              element={user ? <Home /> : <Navigate to='/login' />}
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
