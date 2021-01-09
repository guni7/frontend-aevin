import React, { useState, useContext } from 'react'

import HomePageContext from './../../context/HomePageContext'

import Landing from './../Landing/Landing'
import RegisterForm from './../RegisterForm/RegisterForm'
import LoginForm from './../LoginForm/LoginForm'

const LandingPageView = () => {
    const { page } = useContext(HomePageContext)
    const renderView = () => {
        switch( page ){
            case '0':
                return <Landing />
            case '1':
                return <RegisterForm />
            case '2':
                return <LoginForm />
            default:
                return <Landing />
        }
    }
    return(
        <div>
            {
                renderView()
            }
        </div>
    )
}


export default LandingPageView;
