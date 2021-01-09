import React from 'react'
import { makeStyles, Grid } from '@material-ui/core'

import IntroText from './../IntroText/IntroText'
import PhoneImage from './../PhoneImage/PhoneImage'

const useStyles = makeStyles( theme => ({
    section: {
        height: 'auto',
        backgroundColor: '#FAF9F7'
    },
    container:{
        display: 'flex',
        height: '80%',
        width: '100%',
        justifyContent: 'center'
    },
    introTextContainer:{
        display: 'flex',
        margin: theme.spacing(2),
        justifyContent: 'center'
    },
    phoneImageContainer:{
        display: 'flex',
        margin: theme.spacing(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
}))

const Landing = () => {
    const classes = useStyles();
    return(
        <div>
            <section className={classes.section}>
                <Grid className={classes.container} container >
                    <Grid className={classes.introTextContainer} item xs={12} md={4}>
                        <IntroText />
                    </Grid>
                    <Grid className={classes.phoneImageContainer} item xs={12} md={4}>
                        <PhoneImage />
                    </Grid>
                </Grid>
            </section>
        </div>
    )
}
export default Landing;
