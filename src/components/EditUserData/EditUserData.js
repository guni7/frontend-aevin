import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import UserLoginContext from './../../context/UserLoginContext'
import ChangePicture from './../ChangePicture/ChangePicture'
import ChangePictureNew from './../ChangePicture/ChangePictureNew'

import Input from './../controls/Input'
import Button from './../controls/Button'
import EditLinkData from './EditLinkData'

import axios from 'axios'
import { serverURL } from './../../global'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
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

const EditUserData = () => {

    const history = useHistory();

    const classes = useStyles()

    const { userData, setUserData } = useContext(UserLoginContext);

    const [ name, setName ] = useState(userData.user.name);

    const [ youtubeId, setYoutubeId ] =useState(userData.user.youtubeId);

    const [ didDataChangeName, setDidDataChangeName ] = useState(false)

    const [ didDataChangeYT, setDidDataChangeYT ] = useState(false)

    const handleDataChangeName = (e) => {
        setDidDataChangeName(true);
        setName(e.target.value)
    }

    const handleDataChangeYT = (e) => {
        setYoutubeId(e.target.value)
        setDidDataChangeYT(true);
    }

    const handleYTSubmit = () => {
        if (!didDataChangeYT) return

        const config = {
          method: 'post',
          url: serverURL + "api/edit/youtubeid?editData=\"" + youtubeId + "\"" ,
          headers: {
            'auth-token': userData.token,
          },
        };

        axios(config)
            .then(() => {
                setUserData({
                    ...userData,
                    user: {
                        ...userData.user,
                        youtubeId: youtubeId
                    }
                })
            })
            .catch(err => console.log(err))

    }
    const handleNameSubmit = () => {

        if (!didDataChangeName) return

        const config = {
          method: 'post',
          url: serverURL + "api/edit/name?editData=\"" + name + "\"" ,
          headers: {
            'auth-token': userData.token,
          },
        };

        axios(config)
            .then(() => {
                setUserData({
                    ...userData,
                    user: {
                        ...userData.user,
                        name: name
                    }
                })
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = () => {
        if (didDataChangeYT){
            handleYTSubmit()
        }
        if (didDataChangeName){
            handleNameSubmit()
        }
    }

    const handleTest = () => {
        history.push('/edit/changeProfilePicture')
    }

    return(
        <div className={classes.root}>
                <div className={classes.heading}>
                    CHANGE PICTURE
                </div>
                <ChangePictureNew />
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
            <div className={classes.formItems}>
                <Input
                    label='Youtube Id'
                    name='name'
                    type='text'
                    value={youtubeId}
                    onChange={e => handleDataChangeYT(e)}
                />
            </div>
            <div className={classes.formButton}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    text="Update Information"
                    onClick={handleSubmit}
                />
            </div>
            <EditLinkData />
        </div>

    )
}
export default EditUserData;
