import React from 'react'
import { Button, Container, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles'

export default function LandingPage() {

    const classes = useStyles();

    return (
        <div>
            <Container className={classes.welcomeContainer}>
                <div className={classes.welcomePage} variant="outlined">
                    <div className={classes.buttonGroup}>
                        <Button component={Link} to="/Home" variant="contained" color="secondary" size="large" className={classes.welcomeButton}>Explore secrets First</Button>
                        <br /><br />
                        <Button component={Link} to="/Home/auth" variant="contained" color="primary" size="large" className={classes.welcomeButton}>Sign in first</Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}
