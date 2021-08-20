import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import AppLayout from './layout/AppLayout';

const App = () => {
  
    return (
      <BrowserRouter>
        <Switch>
            <Route path='/' exact component={LandingPage}/>
            <Route path='/Home' component={AppLayout}/>
        </Switch>
      </BrowserRouter>
    );
  };

export default App;
