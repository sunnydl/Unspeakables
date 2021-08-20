import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Auth from '../components/Auth/Auth';
import DetailedPage from '../components/DetailedPage/DetailedPage';

const AppLayout = () => {
  
    return (
      <BrowserRouter>   
        <Container maxWidth="lg">
          <Navbar/>
          <Switch>
            <Route path='/Home' exact component={Home}/>
            <Route path='/Home/auth' exact component={Auth}/>
            <Route path='/Home/detail/:post_id' component={DetailedPage}/>
          </Switch>
        </Container>
      </BrowserRouter>
    );
  };

export default AppLayout;
