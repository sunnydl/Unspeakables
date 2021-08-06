import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#f5f0e1',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    display: 'flex',
    marginBottom: 10,
  },
  formComponent: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageUpload: {
    margin: 'auto',
    width: '75%',
  },
}));