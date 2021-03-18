import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { useLocation, useHistory } from 'react-router-dom'

import { useEffect } from 'react'

import { makeStyles, AppBar, IconButton, Typography, Toolbar } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
    image: {
        margin: '10px',
        marginTop: '60px',
        width: '100%',
        height: 'auto'
    },
    appbar: {
        backgroundColor: theme.palette.neutral.dark,
        position: 'fixed',
        marginBottom: '10px',
        boxShadow: 'none'
    },
    container:{
        display: 'flex',
        justifyContent: 'space-between'
    },
    title:{
        fontWeight: 600
    },
    nextIcon: {
    }
}))

const CreatePostPage = () => {

    const history = useHistory();

    const location = useLocation();

    const classes = useStyles()

    const selectedFile = location.selectedFile

    useEffect(() => {
        if (selectedFile) {
            const img = document.querySelector('#photo');

            const reader = new FileReader();

            reader.readAsDataURL(selectedFile);

            setTimeout(() => img.setAttribute('src', reader.result), 50)

        }
        else{
            history.push('/')
        }
    }, [])

    const onClickNext = () => {
        history.push({pathname: '/edit/addCaption',
            selectedFile: selectedFile
        })
    }

    return(
        <div>
            <AppBar className={classes.appbar}>
                <Toolbar className={classes.container}>
                    <Typography variant="h6" className={classes.title}>
                        Create Post
                    </Typography>
                    <IconButton className={classes.nextIcon} onClick={onClickNext}>
                        <NavigateNextIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <img className={classes.image}src='https://developers.google.com/web/images/contributors/no-photo.jpg' id='photo'/>
        </div>
    )
}
export default CreatePostPage;

