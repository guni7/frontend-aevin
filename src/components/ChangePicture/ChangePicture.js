import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Button from './../controls/Button';

import UserLoginContext from './../../context/UserLoginContext'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
    },
    profilePictureContainer: {
        height: "200px",
        width: "200px",
        position: "absolute",
        borderRadius: "50%",
        overflow: "hidden",
        border: "1px solid grey",
    },
    photo: {
        height: "auto",
        width: "100%"
    },
    choosePhoto: {
        height: "40px",
        width: "100%",
        position: "absolute",
        bottom: "0",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        background:"rgba(0, 0, 0, 0.7)" ,
        color: "wheat",
        lineHeight: "30px",
        fontFamily: "sans-serif",
        fontSize: "15px",
        cursor: "pointer",
        display: "block"
    },
    file: {
        display: "none"
    },
    button: {
        display: 'none',
        justifySelf: 'center',
        alignSelf: 'center',
        marginRight: '150px',
        marginLeft: '-30px',
        marginBottom: '-50px',
        marginTop: '100px',


    }
}))
const ChangePicture = () => {
    const classes = useStyles();

    const { userData } = useContext(UserLoginContext)

    const imageSrc = userData.user ? userData.user.profilePicture : 'https://developers.google.com/web/images/contributors/no-photo.jpg'

    const handle = () => {
        console.log('hi')
    }

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const img = document.querySelector('#photo');
            const reader = new FileReader();

            reader.addEventListener('load', function(){
                img.setAttribute('src', reader.result);
            });

            reader.readAsDataURL(selectedFile);
        }
    }

    return(
        <>
        <div className={classes.root}>
            <div className={classes.profilePictureContainer}>
                <img src={imageSrc} className={classes.photo} id='photo' />
                <input type="file" id="file" className={classes.file} onChange={handleFileSelect} />
                <label htmlFor="file" className={classes.choosePhoto}>Choose Photo</label>
            </div>
        </div>
        <div className={classes.button}>
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                text="Upload Image"
                onSubmit={handle}
            />
        </div>
        </>
    )
}
export default ChangePicture;
