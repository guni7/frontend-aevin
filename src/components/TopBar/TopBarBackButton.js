import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AppBar, Toolbar, Typography, CssBaseline, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

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


const TopBarBackButton = ( ) => {

    const { userData } = useContext(UserLoginContext)

    const { profilePicture, name } = userData.user

    const classes = useStyles();

    const history = useHistory();

    const handleBack = () => {
        history.goBack();
    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Toolbar>
                    <IconButton onClick={() => handleBack()}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </Toolbar>
                <Typography className={classes.name}>{name.toUpperCase()}</Typography>
            </AppBar>
            <CssBaseline />
        </div>
    );
}

export default TopBarBackButton;
