import React, { useState, useEffect, useContext } from 'react'
import { TextField, Button, Typography } from '@material-ui/core'

import ViewerLoginContext from './../../context/ViewerLoginContext'
import UserLoginContext from './../../context/UserLoginContext'

import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios'
import { serverURL } from './../../global'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '98%',
        padding: theme.spacing(1)
    },
    addComment: {
        width: '100%',
        paddingBottom: theme.spacing(1)
    },
    button: {
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: '25px',
        border: 'none',
        color: 'white',
        fontWeight: '600',
        justifySelf: 'flex-end',
        alignSelf: 'flex-end',
        padding: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        }
    }
}));

const AddComment = ( { post } ) => {

    const classes = useStyles();

    const { viewerData } = useContext(ViewerLoginContext)
    const { userData, setUserData } = useContext(UserLoginContext)

    const [ comment, setComment ]= useState('');

    let editData;

    console.log(viewerData.loginSuccess)
    useEffect(() => {

        if ( viewerData.loginSuccess) {
            editData = {
                editData: [{
                    postID: post.id,
                    viewerUsername: viewerData.viewer.username,
                    viewerName: viewerData.viewer.name,
                    userUsername: userData.user.username,
                    viewerProfilePicture: viewerData.viewer.profilePicture,
                    commentData: comment
                }]
            }
        }
        if ( userData.loginSuccess) {
            editData = {
                editData: [{
                    postID: post.id,
                    viewerUsername: userData.user.username,
                    viewerName: userData.user.name,
                    userUsername: userData.user.username,
                    viewerProfilePicture: userData.user.profilePicture,
                    commentData: comment
                }]
            }
        }

    }, [comment])

    const handleCommentPostViewer = () => {
        if (comment === "") return

        const createCommentData = JSON.stringify(editData)

        const config = {
          method: 'post',
          url: `${serverURL}api/addComment/?editData=` + createCommentData,
          headers: {
            'auth-token-viewer': viewerData.token,
          },
        };
        let index = userData.user.posts.findIndex(posts => posts.id === post.id)

        axios(config)
            .then(res => {
                let { posts } = userData.user;
                posts[index].comments.push({ id: `temp${posts[index].comments.length}`, commentData: comment, userUsername: userData.user.username, viewerUsername: viewerData.viewer.username, viewerName: viewerData.viewer.name })
                let user = {userData}
                setUserData({
                    ...userData,
                    user: {
                        ...userData.user,
                        posts
                    }
                })
                console.log(res)
            })
            .catch(err => console.log(err))
        setComment('')
    }
    const handleCommentPostUser = () => {
        if (comment === "") return

        const createCommentData = JSON.stringify(editData)

        const config = {
          method: 'post',
          url: `${serverURL}api/addCommentUser/?editData=` + createCommentData,
          headers: {
            'auth-token': userData.token,
          },
        };
        let index = userData.user.posts.findIndex(posts => posts.id === post.id)

        axios(config)
            .then(res => {
                let { posts } = userData.user;
                posts[index].comments.push({ id: `temp${posts[index].comments.length}`, commentData: comment, userUsername: userData.user.username, viewerUsername: userData.user.username, viewerName: userData.user.name })
                let user = {userData}
                setUserData({
                    ...userData,
                    user: {
                        ...userData.user,
                        posts
                    }
                })
                console.log(res)
            })
            .catch(err => console.log(err))
        setComment('')
    }

    const handleCommentChange = (e) => {
        setComment(e.target.value)
        console.log(e.target.value)
    }


    return(
        <div className={classes.root}>
            <TextField value={comment} className={classes.addComment} variant='outlined' onChange={(e) => handleCommentChange(e)}/>

            {
                userData.loginSuccess ?
                    (
                        <Button onClick={handleCommentPostUser} variant='outlined' size='small'  className={classes.button} color="inherit">
                            <Typography className={classes.text}>
                                Post
                            </Typography>
                        </Button>

                    )
                    :
                    ("")

            }
            {
                viewerData.loginSuccess ?
                    (
                        <Button onClick={handleCommentPostViewer} variant='outlined' size='small'  className={classes.button} color="inherit">
                            <Typography className={classes.text}>
                                Post
                            </Typography>
                        </Button>

                    )
                    :
                    ("")

            }
        </div>
    )
}

export default AddComment
