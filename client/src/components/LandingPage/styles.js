import { makeStyles } from '@material-ui/core/styles';
import welcomeImage from '../../images/welcomeImage.jpg'

export default makeStyles((theme) => ({
    welcomeContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomePage: {
        marginTop: theme.spacing(30),
        margin: 'auto',
        backgroundColor: '#f5f0e1',
        backgroundImage: `url(${welcomeImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
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
