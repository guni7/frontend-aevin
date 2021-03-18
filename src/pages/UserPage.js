import UserLoginContext from './../context/UserLoginContext'

import { useState } from 'react'

import PostFeed from './../components/PostFeed/PostFeed'
import TopBar from './../components/TopBar/TopBar'
import NewPost from './../components/NewPost/NewPost'
import BottomBar from './../components/BottomBar/BottomBar'
import LinksContainer from './../components/Links/LinksContainer'
import EditUserData from './../components/EditUserData/EditUserData'

import { makeStyles } from '@material-ui/core/styles';

import { serverURL } from './../global'

import axios from 'axios'

const useStyles = makeStyles( theme => ({
    root: {
        width: '100%',
    }
}))

const UserPage = () => {
    const classes = useStyles()

    const [tab, setTab] = useState(0);

    const renderView = () => {
        switch(tab){
            case 0:
                //if viewerData then return interactable else return login popup on interaction page
                return (
                    <>
                        <LinksContainer />
                        <NewPost />
                        <PostFeed />
                    </>
                )
            case 1:
                return <PostFeed />
            case 2:
                return <EditUserData />
            default:
                return new Error('This does not exist');
        }
    }

    return(
        <div className={classes.root}>
            <TopBar />
            {
                renderView()
            }
            <BottomBar value={tab} onChange={setTab} />
        </div>
    )
}

export default UserPage;
