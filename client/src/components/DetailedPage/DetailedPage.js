import React, { useEffect, useState } from 'react'
import { Typography, TextField, Grow, Container, Paper, CircularProgress, Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TitleIcon from '@material-ui/icons/Title';
import InstagramIcon from '@material-ui/icons/Instagram';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import UpdateIcon from '@material-ui/icons/Update';
import ImageUploader from 'react-images-upload';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostDetail } from '../../api/index'
import { likePost, deletePost, updatePost } from '../../actions/posts'

import useStyles from './styles';

export default function DetailedPage({ match }) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const post_id = match.params.post_id;
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const [showFeature, setShowFeature] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        const getDetail = async() => {
            if(!post_id) {
                return;
            }
            try {
                const { data } = await fetchPostDetail(post_id);
                setPost(data);
                setPostData(data);
                setUser(JSON.parse(localStorage.getItem('profile'))?.result);
                setShowFeature(user && ((user?.googleId===post.creator)||(user?._id===post.creator)));
            } catch (err) {
                console.log(err);
            }
        }
        getDetail();
    }, [post_id, user?.googleId, user?._id]);

    const handleDelete = (creator, id) => {
        if(user?.googleId){
            if(user.googleId===creator){
            dispatch(deletePost(id));
            }
        } else if(user?._id){
            if(user._id===creator){
            dispatch(deletePost(id));
            }
        }
    }

    const EditOnClick = () => {
        setShowEdit(!showEdit);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePost(post_id, { ...postData, name: user?.result?.name }));
        console.log(post_id);
        cancelEdit();
    }

    const onUpload = (picture) => {
        if(picture.length) {
            const getBase64 = (file, callback) => {
                const reader = new FileReader();
                reader.addEventListener('load', () => callback(reader.result));
                reader.readAsDataURL(file);
            }
            getBase64(picture[0], function(base64Data) {
                setPostData({ ...postData, selectedFile: base64Data })
            });
        } else {
            setPostData({ ...postData, selectedFile: post.selectedFile })
        }
    }

    const cancelEdit = () => {
        setPostData(post);
        setShowEdit(false);
    }

    return (
        <Grow in
        style={{ transformOrigin: '0 0 0' }}
        {...({ timeout: 1000 })}
        >
            <Container className={classes.root}>
                {post? 
                    <Paper className={classes.paper}>
                        <Typography variant="h5" className={classes.postTitle}>
                            {post.title}
                        </Typography>
                        <div className={classes.postDiv}>
                            <img 
                                src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
                                alt="postImg" 
                                style={{ overflow: 'hidden', width: '40%' }}
                            />
                            <div className={classes.postContent}>
                                <div className={classes.details}>
                                    <Typography variant="h6" color="textSecondary" component="p" style={{ fontFamily: 'Comic Sans MS' }}>{post.message}</Typography>
                                </div>
                            </div>
                            <div className={classes.buttons}>
                                {showFeature && <Button size="small" color="primary" onClick={EditOnClick}><EditIcon/>Edit</Button>}
                                <div className={classes.subButtons}>
                                    <Button size="small" color="primary" disabled={!user} onClick={() => {dispatch(likePost(post._id))}}><FavoriteIcon fontSize="small" /> Like {post.likeCount} </Button>
                                    {showFeature && <Button size="small" color="primary" onClick={() => handleDelete(post.creator, post._id)}><DeleteIcon fontSize="small" /> Delete</Button>}
                                </div>
                            </div>
                        </div>
                    </Paper> : <CircularProgress color="primary" size="10rem" thickness={5} />}
                    
                    {showEdit && <Grow in={showEdit}><div className={classes.formContainer}>
                        <Paper className={classes.formWrapper}>
                            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                                <Typography variant="h6" className={classes.editHeading}>
                                    {`Editing`}
                                </Typography>
                                <div className={classes.editInputs}>
                                    <TitleIcon/>
                                    <TextField name="title" variant="outlined" label="Your secret title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                                </div>
                                <div className={classes.editStory}>
                                    <InstagramIcon/>
                                    <TextField name="message" variant="outlined" label="Your story" fullWidth multiline rowsMax={10} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                                </div>
                                <div>
                                    <LoyaltyIcon/>
                                    <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                                </div>
                                <div className={classes.imageUpload}>
                                    <ImageUploader
                                        withIcon={true}
                                        withPreview
                                        singleImage
                                        label="Upload your image here"
                                        buttonText='Choose images'
                                        onChange={onUpload}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                    />
                                </div>
                                <Button className={classes.buttonSubmit} variant="contained" style={{ backgroundColor: '#339900' }} size="large" type="submit" fullWidth>
                                    <UpdateIcon/>Update
                                </Button>
                                <Button variant="contained" color="secondary" size="small" onClick={cancelEdit} fullWidth>Cancel</Button>
                            </form>
                        </Paper>
                    </div></Grow>}
            </Container>
        </Grow>
    )
}
