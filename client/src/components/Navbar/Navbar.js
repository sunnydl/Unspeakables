import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import MernIcon from '../../images/SecretIcon.jpg';
import useStyles from './styles';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import decode from 'jwt-decode';

function Navbar() {

    const classes = useStyles();
    const profile = JSON.parse(localStorage.getItem('profile'));
    const [user, setUser] = useState(profile);
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const logout = () => {
      dispatch({ type: 'LOGOUT' })
      history.push('/');
      window.location.reload();
      setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        if(token){
          const decodedToken = decode(token);
          // if too long then log out
          if(decodedToken.exp * 1000 < new Date().getTime()){
            logout();
          }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [isAuthenticated, user?.token]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
          <div className={classes.brandContainer}>
            <img className={classes.image} src={MernIcon} alt="icon" height="60" />
            <Typography component={Link} to="/Home" className={classes.heading} variant="h2" align="center">Unspeakables</Typography>
          </div>
          <Toolbar className={classes.toolbar}>
            {user?.result ? (
              <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Button component={Link} to="/Home/auth" variant="contained" color="primary">Sign In</Button>
            )}
          </Toolbar>
        </AppBar>
      );
}

export default Navbar;
