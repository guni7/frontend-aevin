import React, { useContext } from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'

import HomePageContext from './../../context/HomePageContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(-5),
      overflow: 'hidden',
      maxHeight: '80px',

  },
  title: {
    flexGrow: 1,
  },
  appbar: {
      backgroundColor: theme.palette.neutral.light,
      color: 'grey',
      boxShadow: 'none'
  },
    logo:{
        maxHeight: '175px',
        width: 'auto',
    },
    button:{
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.neutral.light,
        borderRadius: '25px',
        minWidth: '75px',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        }
    }
}));

const NavBar = ( ) => {

    const { setPage } = useContext(HomePageContext)
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <AppBar className={classes.appbar} position="static">
            <Toolbar>
                <IconButton onClick={ () => setPage('0')} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <img  className={classes.logo} src='https://res.cloudinary.com/companyofmine/image/upload/v1608577364/logo_transparent_u7ihve.png'></img>
              </IconButton>
              <Typography variant="h6" className={classes.title}>
              </Typography>
                <Button onClick={ () => setPage('2') } size='large' variant='outlined' className={classes.button} color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
    );
}

export default NavBar;
