import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    welcomeContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomePage: {
        marginTop: theme.spacing(30),
        margin: 'auto',
        width: '30vw',
        height: '50vh',
        textAlign: 'center',
        display: 'flex',
    },
    buttonGroup: {
        margin: 'auto',
    },
    welcomeButton: {
        fontFamily: 'Comic Sans MS',
    },
}));
