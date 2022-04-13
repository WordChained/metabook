import React, { useEffect, Suspense } from 'react';
import { AppHeader } from './cmps/header/AppHeader';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import styles from './App.module.css'
import { HomePage } from './views/HomePage';
import { MyProfilePage } from './views/MyProfilePage';
import { LandingPage } from './views/LandingPage';
import { StoriesPage } from './views/StoriesPage';
import { ErrorPage } from './views/ErrorPage';

import { Users } from './views/Users';
import { UserMsg } from './cmps/UserMsg'
import { PostMediaModal } from './cmps/singlePost/PostMediaModal';
import { setReady, setLoggedIn } from './store/actions/userActions';
import { getUserFromLocalStorage } from './services/userService'
import { CoverScreen } from './UI/CoverScreen'
import { socketService } from './services/socketService';

const Profiles = React.lazy(() => import("./views/Profiles"))
// import styles from './App.module.css'
function App() {
  // const currUser = getUserFromLocalStorage()
  const { ready, loggedInUser, isCoverOn } = useSelector(
    (state) => state.userModule
  );
  const dispatch = useDispatch()
  useEffect(() => {
    const currUser = getUserFromLocalStorage()
    if (currUser) {
      dispatch(setLoggedIn(true, currUser))
      socketService.setup()
      socketService.on('connect', () => {
        socketService.emit('setUserId', currUser.userId)
      })
    }
    dispatch(setReady(true))
  }, []);

  //other routes:

  const PrivateRoute = ({ children }) => {
    const checkUser = !!loggedInUser
    return checkUser ? children : <Navigate to="/:landing-page" />;
  };
  const GuestsRoute = ({ children }) => {
    const checkUser = !!loggedInUser
    return !checkUser ? children : <Navigate to="/" />;
  };
  if (!ready)
    return (
      <div className={styles['lds-grid']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  return (
    <BrowserRouter>
      {isCoverOn && <CoverScreen />}
      {loggedInUser && <AppHeader />}
      <UserMsg />
      <PostMediaModal />
      <Routes>
        <Route path='*' element={<ErrorPage />} />
        {/* removed privateRoute from 'Profiles' cause it caused an endless loop */}
        <Route path='/profiles/:id' element={<Suspense fallback={(<div className={styles['lds-grid']}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>)}><Profiles /></Suspense>} />
        <Route path='/my-profile' element={<PrivateRoute><MyProfilePage /></PrivateRoute>} />
        <Route path='/stories' element={<PrivateRoute><StoriesPage /></PrivateRoute>} />
        <Route path='/:landing-page' element={<GuestsRoute><LandingPage /></GuestsRoute>} />
        <Route path='/search-users' element={<PrivateRoute>
          <Users />
        </PrivateRoute>} />
        <Route path='/' element={<PrivateRoute><HomePage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
