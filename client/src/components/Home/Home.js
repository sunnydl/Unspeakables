import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid, Fab, CircularProgress, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import SortIcon from '@material-ui/icons/Sort';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts, getSortedPosts } from '../../actions/posts';
import useStyles from './styles';

function Home() {
    const [currentId, setCurrentId] = useState(0);
    const [page, setPage] = useState(1);
    const [tags, setTags] = useState([]);
    const [searchTags, setSearchTags] = useState([]);
    const [totalCount, setTotalCount] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const dispatch = useDispatch();
    const classes = useStyles();
  
    useEffect(() => {
      if(!searching && !showSort) {
        dispatch(getPosts(page, 6, setTotalCount, setLoading, setTags));
      } else {
        dispatch(getSortedPosts(page, 6, searchTags, setTotalCount, setLoading, sortBy));
      }
    }, [currentId, page, searching, searchTags, sortBy, dispatch]);

    const handleChange = (event, page) => {
      setPage(page);
    }

    const sortChange = (e) => {
      setShowSort(!showSort);
    }

    const chooseSort = (e) => {
      setSortBy(e.target.value);
    }

    return (
      <Grow in>
        <Container>
          <div className={classes.root}>
            <FormControl component="fieldset" className={classes.pageTab}>
              <FormLabel component="legend">
                <Fab variant="extended" color="primary" aria-label="add" disableRipple disableFocusRipple onClick={sortChange} className={classes.margin}>
                  <SortIcon className={classes.extendedIcon} />
                  Sort
                </Fab>
              </FormLabel>
              <RadioGroup row aria-label="position" name="position" defaultValue="top" onChange={chooseSort}>
              <Grow in={showSort}
                  style={{ transformOrigin: '0 0 0' }}
                  {...(showSort ? { timeout: 500 } : {})}
                >
                  <FormControlLabel
                    value=""
                    control={<Radio color="secondary" />}
                    label="None"
                    labelPlacement="top"
                  />
                </Grow>
                <Grow in={showSort}
                  style={{ transformOrigin: '0 0 0' }}
                  {...(showSort ? { timeout: 1000 } : {})}
                >
                  <FormControlLabel
                    value="Likes"
                    control={<Radio color="secondary" />}
                    label="Likes"
                    labelPlacement="top"
                  />
                </Grow>
                <Grow in={showSort}
                  style={{ transformOrigin: '0 0 0' }}
                  {...(showSort ? { timeout: 1500 } : {})}
                >
                  <FormControlLabel
                    value="Date"
                    control={<Radio color="secondary" />}
                    label="Date"
                    labelPlacement="top"
                  />
                </Grow>
              </RadioGroup>
            </FormControl>
            <Pagination count={totalCount} page={page} size="large" color="secondary" onChange={handleChange}/>
          </div>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              {loading? <CircularProgress color="primary" size="10rem" thickness={5} />:<Posts setCurrentId={setCurrentId} />}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} tags={tags} setSearchTags={setSearchTags} setSearching={setSearching} setPage={setPage}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home
