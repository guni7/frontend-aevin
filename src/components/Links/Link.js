import React from 'react';

import { Paper, Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ({
    link: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70px',
        maxWidth: '70px',
        height: '100%',
        padding: '5px',
        backgroundColor: theme.palette.neutral.light,
        margin: '0',
    },
    linkIcon: {
        width: '30px',
        height: '30px',
        borderRadius: '10px',
        marginBottom: '2px'
    },
    linkName: {
        fontSize: '12px',
        fontWeight: '600',
        margin: '0',
        maxWidth: '100%',
        overflow: 'hidden',
        marginRight: '0',
    }
}))

const Link = ({ name, link, image, isAffiliate }) => {

    const classes = useStyles()

    return(
            <Paper elevation={0} className={classes.link}>
                <a href={link}>
                    <img className={classes.linkIcon} src={image}/>
                </a>
                <Typography className={classes.linkName}>{name}</Typography>
                <div className={classes.affiliate}>
                    {
                        isAffiliate ?
                            ('') : ('')
                    }
                </div>
            </Paper>
    )
}

export default Link;
