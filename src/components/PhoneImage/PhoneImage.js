import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
    imageContainer: {
        width: '100%',
        minWidth:'320px',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        height: 'auto',
        margin: theme.spacing(2)
    }
}))

const PhoneImage = () => {
    const classes = useStyles();
    return(
        <div>
            <div className={classes.imageContainer}>
                <img className={classes.image} src="https://assets.stickpng.com/images/580b57fbd9996e24bc43bf87.png"></img>
            </div>
        </div>
    )
}
export default PhoneImage;
