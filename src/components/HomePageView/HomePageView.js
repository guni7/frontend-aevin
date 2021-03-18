import React, { useState, useContext }from 'react'

import UserPage from './../../pages/UserPage'

import NavBar from './../NavBar/NavBar'
import LandingPageView from './../LandingPageView/LandingPageView'

import HomePageContext from './../../context/HomePageContext'
import UserLoginContext from './../../context/UserLoginContext'

const HomePageView = () => {
    //use context here
    const [ page, setPage ] = useState({
        page: '0'
    })

    const { userData } = useContext(UserLoginContext)

    return(
        <div>
                <HomePageContext.Provider value={{ page, setPage }}>
                    <div>
                        {
                            userData.user ?
                                (
                                    <UserPage />
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
        </div>
    )
}
export default HomePageView
