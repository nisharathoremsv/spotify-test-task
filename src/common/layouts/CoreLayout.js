import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Player from '../components/Player';
import { fetchAccessToken } from '../../redux/reducers';

function CoreLayout({ children , history }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAccessToken())
    const expiresIn = localStorage.getItem('expiresIn') || (3600);
    setTimeout(() => { dispatch(fetchAccessToken()) }, expiresIn * 1000);
  }, [dispatch]);

  return (
    <div className="main">
      <SideBar />
      <div className="main__content">
        <Header history={history} />
        <div className="main__content__child">
          {children}
        </div>
      </div>
      <Player />
    </div>
  );
}

export default CoreLayout;
