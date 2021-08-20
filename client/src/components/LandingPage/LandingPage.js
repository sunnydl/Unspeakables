import React from 'react'
import { Button, Container, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import welcomeImage from '../../images/welcomeImage.jpg'
import useStyles from './styles'

export default function LandingPage() {

    const classes = useStyles();

    return (
        <div>
            <Container className={classes.welcomeContainer}>
                <Paper className={classes.welcomePage} variant="outlined">
                    <img src={welcomeImage} alt="welcomeImage" style={{ overflow: 'hidden', width: '100%' }} />
                    <Button component={Link} to="/Home">hi I am Button</Button>
                </Paper>
            </Container>
        </div>
    )
}
