import { useParams, } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'

import UserLoginContext from './../context/UserLoginContext'

import { makeStyles } from '@material-ui/core/styles';

import TopBar from './../components/TopBar/TopBar'
import LinksContainer from './../components/Links/LinksContainer'
import BottomBar from './../components/BottomBar/BottomBar'
import PostFeed from './../components/PostFeed/PostFeed'
import ViewerProfile from './../components/ViewerProfile/ViewerProfile'
import YoutubeList from './../components/YoutubeList/YoutubeList'

import { serverURL } from './../global'

import axios from 'axios'

const useStyles = makeStyles( theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    roots:{

    }
}))

const ViewerPage = () => {
    const classes= useStyles()

    const [tab, setTab] = useState(0);

    const { usernameParam }  = useParams();

    const { userData, setUserData } = useContext(UserLoginContext)

    useEffect(() => {
        async function callUserDataAPI() {
            const user = await userDataAPI(usernameParam)
            setUserData({...userData, user: user})
        }
        callUserDataAPI()
    }, [])

    const renderView = () => {
        switch(tab){
            case 0:
                //if viewerData then return interactable else return login popup on interaction page
                return (
                    <>
                        <LinksContainer />
                        <PostFeed />
                    </>
                )
            case 1:
                return <YoutubeList />
            case 2:
                return <ViewerProfile />
            default:
                return new Error('This does not exist');
        }
    }

    return(
        <div className={classes.root}>
            {
                userData.user ?
                    (
                        <>
                        <TopBar />
                        {
                            renderView()
                        }
                        <BottomBar value={tab} onChange={setTab} />
                        </>
                    )
                    :
                    ( 'if a lion could talk you wouldnt understand it' )

            }
        </div>
    )
}

const userDataAPI = async (username) => {
    return axios.get(`${serverURL}${username}`)
        .then( res => {
            return res.data
        } )
        .catch( err => {
            return err
        })
}

export default ViewerPage;
