import React , { useContext }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserLoginContext from './../../context/UserLoginContext'
import ViewerLoginContext from './../../context/ViewerLoginContext'
import AuthenticatedPost from './../Post/AuthenticatedPost'

const PostFeedUser = ({ profilePicture, username, name }) => {
    const classes= useStyles()

    const { userData, setUserData } = useContext(UserLoginContext)

    const posts = userData.user.posts

    //conditionally render based on authenticated/ unauthenticated user
    return(
        <div className={classes.root}>
            {
                userData.user.token ? (
                    <div>
                        {

                            posts ? (
                                posts.map(post => <AuthenticatedPost key={post.id} post={post}/>)
                            ) : ('')
                        }
                    </div>

                ) : (
                    <div>
                        {
                            posts ? (
                                posts.map(post => <AuthenticatedPost key={post.id} post={post}/>)
                            ) : (' This should render Unauthenticated post ')
                        }
                    </div>
                )
            }
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        margin:'0px',
        padding: '0px',
        paddingBottom: '45px'
    }
}))
export default PostFeedUser;
