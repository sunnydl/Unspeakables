import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& > * + *': {
        marginTop: theme.spacing(2),
      },
    display: 'flex',
    flexWrap: 'wrap',
  },
  pageTab: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  pagination: {
    paddingLeft: theme.spacing(1),
  },
}));
