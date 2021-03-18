import { useEffect, useContext, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import UserLoginContext from './../context/UserLoginContext'

import { TextareaAutosize, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import axios from 'axios'

import { serverURL } from './../global'

const useStyles = makeStyles( theme => ({
    root: {
        width: '100%',
        height: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textfield: {
        width: '100%',
        marginLeft: '30px',
        border: 'none',
        padding: '10px',
        fontSize: '25px',
        backgroundColor: theme.palette.neutral.light
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
}))


const AddCaptionPage = () => {

    const classes = useStyles()

    const { userData, setUserData } = useContext(UserLoginContext)

    const { token } = userData

    const [ caption, setCaption ] = useState('')

    const [ file, setFile ] = useState()

    const location = useLocation();

    const history = useHistory();

    useEffect(() => {

        const selectedFile = location.selectedFile

        if (selectedFile) {
            setFile(selectedFile)
        }
        else{
            history.push('/')
        }
    }, [])

    const handlePost = async () => {
        const editData = {
            editData: [{
                "type": 'image-post',
                "content": [{
                    text: caption,
                    url: ''
                }]
            }]
        }

        const createPostData = JSON.stringify(editData)
        const res = await callPostAPI( file, createPostData, token)
        if(res){

            let { user } = userData
            let { posts } = user

            setUserData({
                ...userData,
                user: {
                        ...user,
                        posts: [res.data, ...posts]
                    }
            })
            history.push('/')
        }
    }

    const handleCaptionChange = (e) => {
        setCaption(e.target.value)
    }

    return(
        <div className={classes.root}>
            <TextareaAutosize
                className={classes.textfield}
                onChange={handleCaptionChange}
                rowsMax={4}
                aria-label="maximum height"
                placeholder="Add a caption"/>
            <Button onClick={handlePost} size='large' variant='outlined' className={classes.button} color="inherit">Post</Button>
        </div>
    )
}

const callPostAPI = async ( imageToUpload, createPostData, token ) => {

    const fd = new FormData();

    fd.append('image', imageToUpload, imageToUpload.name)

    const config = {
        method: 'post',
        url: `${serverURL}api/createPost/?editData=` + createPostData,
        headers: {
          'auth-token': token,
        },
        data : fd
    };

    return axios(config)
        .then( res => {
            return res
        })
        .catch( err => {
            return err
        })
}

export default AddCaptionPage
