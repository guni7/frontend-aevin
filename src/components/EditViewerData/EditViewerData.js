import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import ViewerLoginContext from './../../context/ViewerLoginContext'
import ChangePictureViewer from './../ChangePicture/ChangePictureViewer'

import Input from './../controls/Input'
import Button from './../controls/Button'

import axios from 'axios'
import { serverURL } from './../../global'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        fontSize: '16px',
        fontWeight: '600',
        padding: theme.spacing(2),
    },
    picture: {
        width: '100%',
        height: '100%',
    },
    formItems: {
        width : '80%',
        padding: theme.spacing(2),
    },
    formButton:{
        padding:theme.spacing(2)
    }
}))

const EditViewerData = () => {

    const history = useHistory();

    const classes = useStyles()

    const { viewerData, setViewerData } = useContext(ViewerLoginContext);

    const [ name, setName ] = useState(viewerData.viewer.name);

    const [ didDataChangeName, setDidDataChangeName ] = useState(false)

    const handleDataChangeName = (e) => {
        setDidDataChangeName(true);
        setName(e.target.value)
    }

    const handleNameSubmit = () => {

        if (!didDataChangeName) return

        const config = {
          method: 'post',
          url: serverURL + "api/edit/name?editData=\"" + name + "\"" ,
          headers: {
            'auth-token-viewer': viewerData.token,
          },
        };

        axios(config)
            .then(() => {
                setViewerData({
                    ...viewerData,
                    viewer: {
                        ...viewerData.viewer,
                        name: name
                    }
                })
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = () => {
        if (didDataChangeName){
            handleNameSubmit()
        }
    }

    const handleTest = () => {
        history.push('/edit/changeProfilePicture')
    }

    const logoutViewer = () => {
        localStorage.setItem('auth-token-viewer', '')
        setViewerData({
            token: null,
            viewer: null,
            loginSuccess: null
        })
    }

    return(
        <div className={classes.root}>
                <div className={classes.heading}>
                    CHANGE PICTURE
                </div>
                <ChangePictureViewer />
            <div className={classes.heading}>
                BASIC INFORMATION
            </div>
            <div className={classes.formItems}>
                <Input
                    label='Name'
                    name='name'
                    type='text'
                    value={name}
                    onChange={(e) => handleDataChangeName(e)}
                />
            </div>
            <div className={classes.formButton}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    text="Update Name"
                    onClick={handleSubmit}
                />
            </div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    text="Logout"
                    onClick={logoutViewer}
                />

            </div>
        </div>

    )
}
export default EditViewerData;
