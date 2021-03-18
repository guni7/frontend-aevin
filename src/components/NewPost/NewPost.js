import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, makeStyles } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex',
        justifyContent: 'center'
    },
  button: {
    margin: theme.spacing(0.5),
  },
    file:{
        display: 'none'
    },
    uploadButton: {
        borderRadius: '20px',
        padding: '10px',
        fontWeight: 800,
        fontSize: '15px',
        backgroundColor: theme.palette.secondary.main,
        color: '#fff'
    }
}));

const CreatePostButton = () => {

    const history = useHistory();

    const classes = useStyles();

    const handleFileSelect = (e) => {
        //redirect to post page with

        const selectedFile = e.target.files[0]

        if(selectedFile) {
            history.push({pathname: '/edit/createPost',
                selectedFile: selectedFile
            })
        }
    }

    return (
       <div className={classes.root}>
            <input type="file" id="file" className={classes.file} onChange={handleFileSelect} />
            <label htmlFor="file" className={classes.uploadButton}>CREATE POST</label>
        </div>
    )
}

export default CreatePostButton;
