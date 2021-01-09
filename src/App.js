import HomePage from './pages/HomePage'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';

import { makeStyles } from '@material-ui/core'

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
    const classes = useStyles();
    return (
        <div>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
