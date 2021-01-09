import React from 'react';
import CallToAction from './../CallToAction/CallToAction'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles( theme => ({
    root: {
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    introHeading: {
        display: 'flex',
        maxWidth: '500px',
        justifyContent: 'center',
        padding: theme.spacing(2),
        fontWeight: '800',
        textAlign: 'center',
        fontSize: '25px'
    },
    introSubtitle: {
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: '20px'
    }
}))

const IntroText = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography  className={classes.introHeading}>
                Your Very Own App In A Minute
            </Typography>
            <Typography className={classes.introSubtitle}>
                1 click to place you directly on the homescreens of fans who really care. Just you. No Distractions.
            </Typography>
            <Typography  className={classes.introHeading}>
                Earn revenue every time your supporters shop online
            </Typography>
            <Typography className={classes.introSubtitle}>
                Your fans support you whenever they shop online with just 1 click and WITHOUT PAYING ANYTHING OUT OF THEIR POCKETS!
            </Typography>
            <Typography  className={classes.introHeading}>
                A forum dedicated to you
            </Typography>
            <Typography className={classes.introSubtitle}>
                Your community loves talking about you! Bring it together in one place
            </Typography>
            <CallToAction/>
        </div>
    )
}

export default IntroText;
