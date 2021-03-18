import React, { useState, useEffect,  useContext }from 'react';
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';

import { Card, CardHeader, Avatar, CardContent, Typography, CardActions, IconButton, CardMedia } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

import axios from 'axios'

import LikeButton from './LikeButton'

import UserLoginContext from './../../context/UserLoginContext'

import ViewerLoginContext from './../../context/ViewerLoginContext'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        margin: '0px',
        marginBottom: '3px',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        width: '100%'
    },
    card:{
        height: 'auto',
        width: '100%',
        maxWidth: '650px',
        boxShadow: 'none',
        backgroundColor: theme.palette.neutral.light,
    },
    caption: {
        marginTop: '-20px',
        fontWeight: 800
    },
    imageContainer: {
        width: '100%',
        height: 'auto'
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '3px'
    },
    interactionsContainer: {
        display: 'flex',
    },
    interactions: {
        display: 'flex'
    },
    likeButtonInactive: {
        color: 'red'
    },
    likeButtonActive: {
        color: 'red'
    },
    likeButtonUnauthenticated: {
        color: 'green'
    },

}));

const PostComponentAuthenticated = ({ post, onClick }) => {

    const { userData } = useContext(UserLoginContext)

    const { viewerData } = useContext(ViewerLoginContext)

    const { viewer } = viewerData

    const history = useHistory();

    const [ isLiked, setIsLiked ] = useState()

    let viewerUsername

    if(viewer){
        viewerUsername = viewer.username
    }

    const { user } = userData

    const classes = useStyles();

    const handlePostClick = () => {
        history.push({pathname: "/post/"+post.id,
                    postData: { post }
                    })
    }

    return(
        <div className={classes.root} onClick={handlePostClick}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar src={user.profilePicture}/>
                    }
                    title={user.name}
                    subheader={getDate(post.time)}
                />
                <CardContent className={classes.caption}>
                    <Typography variant="body2" component="p">
                        {post.content[0].text}
                    </Typography>
                </CardContent>
                <div className={classes.imageContainer}>
                    <CardMedia>
                        <img className={classes.image} src={post.content[0].url}></img>
                    </CardMedia>
                </div>
                <CardActions className={classes.interactionsContainer}>
                    <IconButton className={classes.interactions}>

                        {
                            viewerUsername ? (
                                <LikeButton likes={post.likes} postId={post.id} username={userData.user.username}/>
                            ) : (
                                <FavoriteIcon className={classes.likeButtonUnauthenticated}/>
                            )
                        }

                    </IconButton>
                    <IconButton className={classes.interactions}>
                        <ChatBubbleIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}
const getDate = ( unixTime ) => {
    const dateObject = new Date(unixTime)
    const humanDateFormat = dateObject.toLocaleString("en-US", {day: "numeric", month: "long", year: 'numeric'})
    return humanDateFormat
}

export default PostComponentAuthenticated;
