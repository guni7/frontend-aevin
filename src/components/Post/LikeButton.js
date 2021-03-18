import { useContext, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';

import { IconButton } from '@material-ui/core'

import FavoriteIcon from '@material-ui/icons/Favorite';

import ViewerLoginContext from './../../context/ViewerLoginContext'

import axios from 'axios'
import { serverURL } from './../../global'

const useStyles = makeStyles(theme => ({

    liked:{
        marginTop: '5px',
        color: 'red'
    },
    notLiked: {
        marginTop: '5px',
        color: 'black'
    }

}));

const LikeButton = ({ likes, postId, username }) => {

    const classes = useStyles()

    const [ isLiked, setIsLiked ] = useState(false)

    const { viewerData } = useContext(ViewerLoginContext)

    //check if viewer has liked the post

    let liked;

    if (viewerData){
        liked = likes.find( likeObj => likeObj.viewerObj === viewerData.viewer.username )
    }

    const handleLiked = async(e) => {
        e.stopPropagation()

        const editData = {
                editData: [{
                    postID: postId,
                    viewerUsername: viewerData.viewer.username,
                    viewerName: viewerData.viewer.name,
                    userUsername: username
                }]
        }
        const createLikeData = JSON.stringify(editData)

        const res = await callLikeAPI(createLikeData, viewerData.token)
    }

    return(
        <div>
            {
                liked ? (
                    <FavoriteIcon className={classes.liked}/>
                ) : (
                    <FavoriteIcon className={classes.notLiked} onClick={handleLiked}/>
                )
            }
        </div>
    )
}
const callLikeAPI = async (createLikeData, token) => {
    const config = {
      method: 'post',
      url: `${serverURL}` + createLikeData,
      headers: {
        'auth-token-viewer': token,
      },
    };

    return axios(config)
        .then(() => console.log('liked') )
        .catch(() => console.log('like failed'))

}

export default LikeButton
