import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import FileBase from 'react-file-base64';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import TitleIcon from '@material-ui/icons/Title';
import InstagramIcon from '@material-ui/icons/Instagram';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { Link } from 'react-router-dom';
import animeNodding from '../../images/animeNodding.gif';
import animeQuestion from '../../images/animeQuestion.jpg';

const Form = ({ currentId, setCurrentId, tags, setSearchTags, setSearching, setPage }) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const dispatch = useDispatch();
    const post = useSelector(state => currentId? state.posts.find(post => post._id===currentId): null);
    const user = JSON.parse(localStorage.getItem('profile'));

    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        if(post){
            setPostData(post);
        }
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            console.log(currentId);
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        setCurrentId(0);
        clear();
    }

    const clear = () => {
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }
    
    const changeShowForm = () => {
        setCurrentId(0);
        setShowForm(true);
    }
    const hideForm = () => {
        setShowForm(false);
        setCurrentId(0);
        clear();
    }

    const searchTag = (value) => {
        if(value.length) {
            setSearching(true);
            setPage(1);
        } else {
            setSearching(false);
        }
        setSearchTags(value);
    }

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <img src={animeQuestion} alt="animeQuestion" style={{ overflow: 'hidden', width: '100%' }} />
                <Typography variant="h6" align="center">
                    <Button component={ Link } to="/auth" variant="contained" color="primary">Sign in to share a secret of yours</Button>
                    <br />
                    Or search below
                    <br />
                </Typography>
                <Autocomplete 
                multiple
                options={ tags }
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField 
                    {...params}
                    variant="outlined"
                    label="search tags"
                    placeholder="next tag"></TextField>
                )}
                onChange={(event, value) => searchTag(value)}
                ></Autocomplete>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            {(showForm||currentId)? 
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6" style={{ fontFamily: 'Comic Sans MS' }}>
                    <LockOpenIcon/>
                    {currentId ? `Editing "${post.title}"` : 'Secret unfolding'}
                </Typography>
                <div className={classes.formComponent}>
                    <TitleIcon/>
                    <TextField name="title" variant="outlined" label="Your secret title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                </div>
                <div>
                    <InstagramIcon/>
                    <TextField name="message" variant="outlined" label="Your story" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                </div>
                <div>
                    <LoyaltyIcon/>
                    <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                </div>
                <div className={classes.fileInput}><AddPhotoAlternateIcon/><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" style={{ backgroundColor: '#339900' }} size="large" type="submit" fullWidth>
                    <SendIcon/>Share
                </Button>
                <Button variant="contained" style={{ backgroundColor: '#ffcc00' }} size="small" onClick={clear} fullWidth>Clear</Button>
                <Button variant="contained" color="secondary" size="small" onClick={hideForm} fullWidth>Cancel</Button>
            </form>
            :<div>
                <img src={animeNodding} alt="animeNodding" style={{ overflow: 'hidden', width: '100%' }}/>
                <Typography variant="h6" align="center">
                    <Button variant="contained" color="primary" onClick={changeShowForm} fullWidth>Start sharing your secret</Button>
                    <br />
                    Or search below
                    <br />
                </Typography>
                <Autocomplete 
                multiple
                id="tags-outlined"
                options={ tags }
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => {
                    return (
                        <TextField 
                        {...params}
                        variant="outlined"
                        label="search tags"
                        placeholder="next tag"></TextField>
                    )
                }}
                onChange={(event, value) => searchTag(value)}
                ></Autocomplete>
            </div>}
        </Paper>
    )
}
export default Form;