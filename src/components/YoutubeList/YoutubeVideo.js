import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, Icon,  Typography } from '@material-ui/core'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    media: {

    },
    card: {
        width: '98%',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.spacing(1)
    },
    image: {
        width: '100%'
    },
    imageOverlay:{
        width: '100%',
    },
    playButton:{
        position: 'absolute',
        transform: '(2.5%)'
    }


})
)

const YoutubeVideo = ({ video }) => {

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <div className={classes.imageOverlay}>
                    <img className={classes.image} src={video.thumbnail} alt='youtube video thumbnail' ></img>
                </div>
                    <Typography >
                        { video.title }
                    </Typography>
            </Card>
        </div>
    )

}

export default YoutubeVideo;
