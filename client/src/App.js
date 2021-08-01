import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import DetailedPage from './components/DetailedPage/DetailedPage';

const App = () => {
  
    return (
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar></Navbar>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/auth' exact component={Auth}></Route>
            <Route path='/detail' component={DetailedPage}></Route>
          </Switch>
        </Container>
      </BrowserRouter>
    );
  };

export default App;
