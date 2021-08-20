import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import * as postsService from '../services/postsService.js';

export const getPosts = async (req, res) => {
    const page = (req.query.page) || 1;
    const limit = (req.query.limit) || 6;

    try{
        const postMessage = await PostMessage.find(); // finding something inside model takes time, which means its a async function
        // get all the tags
        const tags = postsService.tagService(postMessage);
        const postMessages = postMessage.slice((page - 1)*limit, (page - 1)*limit + limit);
        const totalCount = Math.ceil(postMessage.length/limit);
        res.status(200).json({ postMessages, totalCount, tags });
    } catch(err) {
        res.status(404).json({ msg: err.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try{
        await newPost.save();
        res.status(201).json(newPost);
    } catch(err) {
        res.status(409).json({ msg: err.message })
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags, nickName } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id, nickName };

    const post = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    
    updatedPost.name = post.name;
    updatedPost.likeCount = post.likeCount;
    updatedPost.likes = post.likes;
    updatedPost.createdAt = post.createdAt;

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with such id');
    }
    try {
        const deletedPost = await PostMessage.findByIdAndDelete(id);
        res.json(deletedPost);
    } catch (err) {
        res.json({ msg: err.message })
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) {
        return res.json({ msg: "User is not authenticated" })
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).send('No post with such id');
    }
    try{
        const post = await PostMessage.findById(id);
        const index = post.likes.findIndex((id) => id===String(req.userId)); // find if the id is already in there
        // if id is already in there, then cannot like no more
        if(index===-1){
            post.likes.push(req.userId);
            post.likeCount = post.likeCount + 1;
        } else {
            post.likes = post.likes.filter(id => id!==String(req.userId));
            post.likeCount = post.likeCount - 1;
        }
        await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.json(post);
    } catch(err){
        res.status(500).json({ msg: err.message })
    }
}

export const sortedPost = async (req, res) => {
    const tags = req.query.tags || [];
    const page = req.query.page || 1;
    const limit = req.query.limit || 6;
    const sortBy = req.query.sortBy || '';

    try {
        let sortedPosts;
        switch(sortBy) {
            case 'Likes':
                sortedPosts = tags.length? await PostMessage.find({ tags: { $in: tags } }).sort({ likeCount: -1 }): await PostMessage.find().sort({ likeCount: -1 });
                break;
            case 'Date':
                sortedPosts = tags.length? await PostMessage.find({ tags: { $in: tags } }).sort({ createdAt: -1 }):await PostMessage.find().sort({ createdAt: -1 });
                break;
            case '':
                sortedPosts = tags.length? await PostMessage.find({ tags: { $in: tags } }):await PostMessage.find();
                break;
        }
        const postMessages = sortedPosts.slice((page - 1)*limit, (page - 1)*limit + limit);
        const totalCount = Math.ceil(sortedPosts.length/limit);
        res.status(200).json({ postMessages, totalCount });
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

export const getPostDetail = async (req, res) => {
    const post_id = req.query.post_id;
    if (!mongoose.Types.ObjectId.isValid(post_id)) return res.status(404).send(`No post with id: ${post_id}`);

    try {
        const post = await PostMessage.findById(post_id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }

}
