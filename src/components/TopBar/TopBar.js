import React, { useContext } from 'react'
import { AppBar, Toolbar, Typography, Avatar, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'

import UserLoginContext from './../../context/UserLoginContext';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'space-around',
    },
    appbar: {
        width: '100vw',
        maxWidth: '650px',
        backgroundColor: theme.palette.neutral.light,
        color: 'grey',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'row',
        height: '70px',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userPicture: {
        width: '50px',
        height: '50px',
    },
    name: {
        fontSize: '1.3rem',
        fontWeight: '800',
        letterSpacing: '0.5vw',
        justifySelf: 'center',
        color: 'black',
        marginRight: theme.spacing(2)
    }
}));

const TopBar = ( ) => {

    const { userData } = useContext(UserLoginContext)

    const { profilePicture, name } = userData.user

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Toolbar>
                    <Avatar src={profilePicture} className={classes.userPicture} />
                </Toolbar>
                <Typography className={classes.name}>{name.toUpperCase()}</Typography>
            </AppBar>
            <CssBaseline />
        </div>
    );
}

export default TopBar;
