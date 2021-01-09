import React, { useContext } from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import HomePageContext from './../../context/HomePageContext'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '20px',
        padding: '20px'
    },
    button: {
        borderRadius: '35px',
        width:'100%',
        backgroundColor: theme.palette.secondary.dark,
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        }
    },
    text:{
        fontSize: '20px',
        fontWeight: '600',
        padding: '10px',
    }
}));

const CallToAction = () => {

    const { setPage } = useContext(HomePageContext)

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button onClick={ () => setPage('1') } variant='outlined' size='large' fullWidth={true} className={classes.button} color="inherit">
                <Typography className={classes.text}>
                   I WANT MY APP
                </Typography>
            </Button>
        </div>
    )
}

export default CallToAction;
