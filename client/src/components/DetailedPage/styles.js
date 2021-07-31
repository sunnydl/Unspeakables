import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(8),
    backgroundColor: '#f5f0e1',
    display: 'flex',
    flexWrap: 'wrap',
  },
  postTitle: {
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
    fontFamily: 'Comic Sans MS',
    width: '100%',
  },
  postDiv: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  postContent: {
    padding: theme.spacing(1),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '55%',
  },
  details: {
    display: 'flex',
    margin: '20px',
  },
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
  },
  subButtons: {
    marginLeft: 'auto',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  formWrapper: {
    backgroundColor: '#f5f0e1',
    margin: 'auto',
    marginTop: theme.spacing(6),
    width: '55%',
  },
  form: {
    margin: theme.spacing(1),
    justifyContent: 'center',
  },
  editHeading: {
    fontFamily: 'Comic Sans MS',
    textAlign: 'center',
  },
  editInputs: {
    margin: 'auto',
    width: '80%',
  },
  imageUpload: {
    margin: 'auto',
    width: '50%',
  },
  buttonSubmit: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
}));