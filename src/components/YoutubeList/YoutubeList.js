import React, { useEffect, useState, useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { serverURL } from './../../global'

import axios from 'axios'

import UserLoginContext from './../../context/UserLoginContext'

import YoutubeVideo from './YoutubeVideo'

const useStyles = makeStyles(theme => ({
    root: {

    }
})
)


const YoutubeList = () => {
    const classes = useStyles()

    const [ videos, setVideos ] = useState([])

    const { userData } = useContext(UserLoginContext)

    const { youtubeid } =  userData.user

    useEffect(() => {
        axios.get(serverURL + youtubeid + "/blog")
            .then(res => { setVideos(res.data.thumbnails) })
            .catch(err => { console.log(err) })
    }, [])

    console.log(videos)

    return(
        <div className={classes.root}>
            {
                videos.map(video =>
                    <YoutubeVideo video={video}/>
                )

            }

        </div>
    )
}

export default YoutubeList;
