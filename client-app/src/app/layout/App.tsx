import React, { useEffect, useState } from 'react';
// import logo from '../../logo.svg';
// import '../../App.css';
// import { ducks } from '../../demo';
// import DuckItem from '../../DuckItem';
//import axios from 'axios';
import { Button, Container } from 'semantic-ui-react';
//import List from 'semantic-ui-react/dist/commonjs/elements/List';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';


function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/' ? <HomePage/> : (
        <div>
        <NavBar/>
        <Container style={{ marginTop: '7em' }}>
          <Outlet />
        </Container>
        </div>
      )}
    </div>
  );
}

export default observer(App);
