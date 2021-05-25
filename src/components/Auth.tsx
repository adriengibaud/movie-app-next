import React, { useEffect, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { auth, provider } from '../../firebase';
import {
  selectUserEmail,
  selectUserName,
  setActiveUser,
  setUserLogoutState,
} from '../reducers/userSlice';

const Auth = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const userName = useSelector(selectUserName);

  const handleSignIn = () => {
    auth.signInWithPopup(provider);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => dispatch(setUserLogoutState()));
  };

  useEffect(() => {
    if (userName === null) {
      auth.onAuthStateChanged((user) => {
        if (user !== null && userEmail === null) {
          dispatch(
            setActiveUser({
              userName: user.displayName,
              userEmail: user.email,
              userId: user.uid,
              userImage: user.photoURL,
            })
          );
        }
      });
    }
  }, []);

  return (
    <div>
      <button onClick={() => handleSignIn()}>Sign In</button>
      <button onClick={() => handleSignOut()}>Sign out</button>
    </div>
  );
};

export default Auth;
