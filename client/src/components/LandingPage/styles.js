import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    welcomeContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomePage: {
        width: '40%',
        marginTop: theme.spacing(30),
        margin: 'auto',
    },
}));
