import React from 'react'
import { useLocation } from 'react-router-dom'
import { IconButton } from '@material-ui/core';
import TopBarBackButton from './../components/TopBar/TopBarBackButton'
import { makeStyles } from '@material-ui/core/styles';

import AuthenticatedPost from './../components/Post/AuthenticatedPost'
import AddComment from './../components/Post/AddComment'
import CommentSection from './../components/Post/CommentSection'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '650px'
    }
}));


const PostExpandPage = () => {

    const classes = useStyles();

    const location = useLocation();

    const { post } = location.postData;

    const handleBackButtonClick = () => {
        console.log('going back');
    }

    console.log(post)
    return(
        <div className={classes.root}>
            <TopBarBackButton />
            <AuthenticatedPost post={post} />
            <AddComment post={post} />
            <CommentSection comments={post.comments}/>
        </div>
    )
}

export default PostExpandPage
