//TODO The backend profile Picture must return the new url for the image in the response
//TODO Change the local state to reflect the new Profile Picture

import React, { useState, useContext, useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core'
import { Typography } from '@material-ui/core';

import Button from './../controls/Button';

import { serverURL } from './../../global'

import axios from 'axios'

import UserLoginContext from './../../context/UserLoginContext'

const useStyles = makeStyles(theme => ({
    root: {
        height: '250px',
        display: 'flex',
        justifyContent: 'center',
    },
    profilePictureContainer: {
        width: '150px',
        height: '150px',
        borderRadius: '75px'
    },
    wrapper: {
        width: '150px',
        height: '150px',
        borderRadius: '75px',
        overflow: 'hidden'
    },
    photo: {
        width: '150px',
        height: '150px',
        borderRadius: '75px',
    },
    choosePhoto: {
        height: "40px",
        width: "100%",
        bottom: "0",
        left: "50%",
        transform: "translateY(-110%)",
        textAlign: "center",
        background:"rgba(0, 0, 0, 0.7)" ,
        color: "wheat",
        lineHeight: "30px",
        fontFamily: "sans-serif",
        fontSize: "15px",
        cursor: "pointer",
        display: "block",
        overflow: 'hidden'
    },
    file: {
        display: 'none'
    },
    button: {
        paddingTop: '20px'
    }
}))

const ChangePictureNew = ({isNew}) => {

    const history = useHistory();

    const classes = useStyles();

    const [imageToUpload, setImageToUpload] = useState(null);

    const [imageSrc, setImageSrc] = useState('https://developers.google.com/web/images/contributors/no-photo.jpg')

    const [imageSrcExt, setImageSrcExt] = useState(null)

    const imageMaxSize = 10000000;

    const { userData } = useContext(UserLoginContext)

    useEffect(() => {
        if (userData.user){
            setImageSrc(userData.user.profilePicture)
        }
    }, [])

    const verifyFiles = ( files ) => {
        //TODO rejectedFiles have fileType in currentFile.file.type
        if( files && files.length > 0 ){
            const currentFile = files[0];
            const currentFileType = currentFile.type;
            const currentFileSize = currentFile.size;
            console.log(currentFile)
            if(currentFileSize > imageMaxSize){
                console.log('too big')
                alert('The file is too big. Maximum file size is' + imageMaxSize);
                return false;
            }
        }
        return true;
    }

    const handleFileUpload = (event) => {
        if (!imageToUpload) return
        event.preventDefault()
        const fd = new FormData();
        console.log(imageToUpload);
        fd.append('image', imageToUpload, imageToUpload.name)

        const config = {
          method: 'post',
          url:`${serverURL}api/upload/profilePicture`,
          headers: {
            'auth-token': userData.token,
          },
          data : fd
        };
        console.log(fd)

        axios(config)
            .then(res => {

                if (isNew){
                    history.goBack();
                }
            })
            .catch(err => console.log(err))
    }

    const handleFileSelect = (event) => {

        const files = event.target.files
        if(files && files.length > 0 ){
            const isVerified = verifyFiles(files)
            if( isVerified ){
                const currentFile = files[0]
                const myFileItemReader = new FileReader()
                myFileItemReader.addEventListener('load', () => {
                    const myResult = myFileItemReader.result;
                    setImageSrc(myResult);
                    //setImageSrcExt(extractImageFileExtensionFromBase64(myResult))
                } , false)
                myFileItemReader.readAsDataURL(currentFile)
                setImageToUpload(currentFile);
            }
        }
    }

    return(
        <>
            <div className={classes.root}>
                <div className={classes.profilePictureContainer}>
                    <div className={classes.wrapper}>
                        <img src={imageSrc} className={classes.photo} id='photo' />
                        <label htmlFor="file" className={classes.choosePhoto}>Choose Photo</label>
                    </div>
                    <div className={classes.button}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            text="Upload Image"
                            onClick={(e) => handleFileUpload(e)}
                        />
                    </div>
                    <input type="file" id="file" className={classes.file} onChange={handleFileSelect} />
                </div>
            </div>
        </>
    )
}
export default ChangePictureNew;
