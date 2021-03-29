import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Home, AccountCircle} from '@material-ui/icons';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import { makeStyles } from '@material-ui/core/styles'


const BotNav = ({value, onChange}) => {
    const classes = useStyles();
    return(
        <BottomNavigation className={classes.botnav} value={value} onChange={(e, tab) => onChange(tab)}>
            <BottomNavigationAction className={classes.icons} icon={<Home/>} />
            <BottomNavigationAction className={classes.icons} icon={<PlayCircleFilledIcon/>} />
            <BottomNavigationAction className={classes.icons} icon={<AccountCircle/>} />
        </BottomNavigation>
    )
}

const useStyles = makeStyles( theme => ({
    botnav: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        backgroundColor: theme.palette.neutral.light
    },
    icons: {
    }
})
)

export default BotNav;
