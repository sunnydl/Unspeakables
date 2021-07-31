import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardMedia, CardHeader, Button, Typography, Avatar, Chip } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LabelIcon from '@material-ui/icons/Label';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'))?.result;
  const showFeature = user && ((user?.googleId===post.creator)||(user?._id===post.creator));

  // hover effect
  const [raiseState, setRaiseState] = useState({
    raise: false,
    shadow: 1,
  });

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

  return (
    <Card className={classes.card} raised={raiseState.raise} onMouseOver={()=>setRaiseState({ raise: true, shadow: 3, })} onMouseOut={()=>setRaiseState({ raise: false, shadow: 1, })} zdepth={raiseState.shadow}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.name.charAt(0)}
          </Avatar>
        }
        title={
          <div>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          </div>
        }
      ></CardHeader>
      <Link to={`/detail/${post._id}`}>
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      </Link>
      <Link to={`/edit/${post._id}`}>
        <div className={classes.overlay2}>
          {showFeature && <Button style={{ color: 'black' }} size="small" onClick={() => {setCurrentId(post._id)}}><EditIcon fontSize="default" /></Button>}
        </div>
      </Link>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2" style={{ fontFamily: 'Comic Sans MS' }}>{post.tags.map((tag, index) => <Chip key={index} icon={<LabelIcon/>} label={tag} clickable color="primary"/>)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2" style={{ fontFamily: 'Comic Sans MS' }}>{post.title}</Typography>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user} onClick={() => {dispatch(likePost(post._id))}}><FavoriteIcon fontSize="small" /> Like {post.likeCount} </Button>
        {showFeature && <Button size="small" color="primary" onClick={() => handleDelete(post.creator, post._id)}><DeleteIcon fontSize="small" /> Delete</Button>}
      </CardActions>
    </Card>
  );
};

export default Post;
