import React, { useState, useEffect }from 'react'

import NavBar from './../NavBar/NavBar'
import LandingPageView from './../LandingPageView/LandingPageView'

import HomePageContext from './../../context/HomePageContext'
import UserLoginContext from './../../context/UserLoginContext'

import { serverURL } from './../../global'

import axios from 'axios'

const HomePageView = () => {
    //use context here
    const [ page, setPage ] = useState({
        page: '0'
    })
    const [ userData, setUserData ] = useState({
        token: null,
        user: null,
        loginSuccess: null
    })

    const [ viewerData, setViewerData ] = useState({
        token: null,
        user: null,
        loginSuccess: null
    })

    //check logged in
    useEffect(async () => {
        const isUserLoggedIn = await checkUserLoggedIn()
        const isViewerLoggedIn = await checkViewerLoggedIn()

        if (isUserLoggedIn){
            setUserData(isUserLoggedIn)
        }
        if(isViewerLoggedIn){
            setViewerData(isViewerLoggedIn)
        }
    }, [])
    //add the user page here
    return(
        <div>
            <UserLoginContext.Provider value={{ userData, setUserData }}>
                <HomePageContext.Provider value={{ page, setPage }}>
                    <div>
                        {
                            userData.user ?
                                (
                                    'hi'
                                )
                                :
                                (
                                    <div>
                                        <NavBar />
                                        <LandingPageView />
                                    </div>
                                )
                        }
                    </div>
                </HomePageContext.Provider>
            </UserLoginContext.Provider>
        </div>
    )
}
const checkUserLoggedIn = async () => {
    let token = localStorage.getItem('auth-token')
    if (token === null) {
        localStorage.setItem('auth-token', '')
        token = '';
    }
    const tokenRes =  await verifyUserToken(token)
    if(tokenRes.data.valid){
        return({token, user: tokenRes.data.userObj, loginSuccess: true })
    }
    else{
        return false
    }
}

const verifyUserToken = async ( token ) => {
    const tokenRes = await axios.post(
        `${serverURL}api/user/tokenIsValid`, null,
        { headers: {'auth-token' : token} }
    );
    return tokenRes
}

const checkViewerLoggedIn = async () => {
    let token = localStorage.getItem('auth-token-viewer')
    if (token === null) {
        localStorage.setItem('auth-token-viewer', '')
        token = '';
    }
    const tokenRes =  await verifyUserToken(token)
    if(tokenRes.data.valid){
        return({token, viewer: tokenRes.data.viewerObj, loginSuccess: true })
    }
    else{
        return false
    }
}

const verifyViewerToken = async ( token ) => {

    const tokenRes = await axios.post(
        `${serverURL}api/viewer/tokenIsValid`, null,
        { headers: {'auth-token-viewer' : token} }
    );
    return tokenRes
}


export default HomePageView
