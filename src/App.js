import HomePage from './pages/HomePage'
import ViewerPage from './pages/ViewerPage'
import CreatePostPage from './pages/CreatePostPage'
import AddCaptionPage from './pages/AddCaptionPage'
import PostExpandPage from './pages/PostExpandPage'
import AddProfilePicturePage from './pages/AddProfilePicturePage'

import ChangePicture from './components/ChangePicture/ChangePicture'
import { useState, useEffect } from 'react'

import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';

import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';

import { makeStyles, CssBaseline } from '@material-ui/core'

import UserLoginContext from './context/UserLoginContext'
import ViewerLoginContext from './context/ViewerLoginContext'

import { serverURL } from './global'

import axios from 'axios'

const useStyles = makeStyles((theme) => ({
}));

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Karla',
            'sans-serif'
        ].join(','),
    },
    palette: {
        primary: {
            main: '#38BEC9',
            light: '#BEF8FD',
            dark: '#0A6C74'
        },
        secondary: {
            main: '#E66A6A',
            light: '#FACDCD',
            dark: '#BA2525'
        },
        neutral: {
            light: '#FAF9F7',
            dark: '#E8E6E1'
        }
    },
})
//provide context here
const App = () => {

    const url = window.location.href.split('/')

    const [ userData, setUserData ] = useState({
        token: null,
        user: null,
        loginSuccess: null
    })

    const [ viewerData, setViewerData ] = useState({
        token: null,
        viewer: null,
        loginSuccess: null
    })

    useEffect(() =>  {
        async function checkLoggedIn() {
            const isUserLoggedIn = await checkUserLoggedIn()
            const isViewerLoggedIn = await checkViewerLoggedIn()

            if (isUserLoggedIn){
                if(url[3] !== ""){
                }
                else{
                    setUserData({...isUserLoggedIn})
                }
            }
            if(isViewerLoggedIn){
                setViewerData({...isViewerLoggedIn})
            }
        }
        checkLoggedIn()
    }, [])

    const classes = useStyles();
    return (
        <div>
            <UserLoginContext.Provider value={{ userData, setUserData }}>
            <ViewerLoginContext.Provider value={{ viewerData, setViewerData }}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={HomePage} />
                            <Route exact path='/edit/changeProfilePicture' component={AddProfilePicturePage} />
                            <Route exact path='/:usernameParam' render={(props) => <ViewerPage {...props} />} />
                            <Route exact path='/edit/createPost' component={CreatePostPage} />
                            <Route exact path='/edit/addCaption' component={AddCaptionPage} />
                            <Route exact path='/post/:postid' render={(props) => <PostExpandPage{...props} />} />
                        </Switch>
                    </BrowserRouter>
                </ThemeProvider>
            </ViewerLoginContext.Provider>
            </UserLoginContext.Provider>
            <CssBaseline />
        </div>
    );
}

const checkUserLoggedIn = async () => {
    let token = localStorage.getItem('auth-token')
    if (token === null) {
        localStorage.setItem('auth-token', '')
        token = '';
    }
    const tokenRes =  await verifyUserToken(token)
    if(tokenRes.valid){
        return({token: token, user: tokenRes.userObj, loginSuccess: true })
    }
    else{
        return false
    }
}

const verifyUserToken = ( token ) => {
    const verifyToken = {
      method: 'post',
      url: `${serverURL}api/user/tokenIsValid`,
      headers: {
        'auth-token': token
      },
      data :''
    };
    return axios(verifyToken)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error
        });
}

const checkViewerLoggedIn = async () => {
    let token = localStorage.getItem('auth-token-viewer')
    if (token === null) {
        localStorage.setItem('auth-token-viewer', '')
        token = '';
    }
    const tokenRes = await verifyViewerToken(token)
    if(tokenRes.valid){
        return({token, viewer: tokenRes.viewerObj, loginSuccess: true })
    }
    else{
        return false
    }
}

const verifyViewerToken = ( token ) => {
    const verifyToken = {
      method: 'post',
      url: `${serverURL}api/user/viewer/tokenIsValid`,
      headers: {
        'auth-token-viewer': token
      },
      data :''
    };
    return axios(verifyToken)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error
        });
}

export default App;
