import React, { useContext }from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

import UserLoginContext from './../../context/UserLoginContext'

import Link from './Link'

const useStyles = makeStyles( theme => ({
    container: {
        width: '100%',
        maxWidth: '650px',
        height: '80px',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: theme.palette.neutral.light,
        margin: '0px',
        padding: '0px'
    }
}))

const LinksContainer = () => {

    const classes= useStyles()

    const { userData } = useContext(UserLoginContext);

    const { links } = userData.user


    return(
        <div>
            {
                links ? (
                    links.length > 0 ?
                        (
                            <Card className={classes.container}>
                                {
                                    links.map( link => <Link key={link.id} link={link.linkURL} name={link.name} image={link.url} isAffiliate={link.isAffiliate} /> )
                                }
                            </Card>
                        )
                        :
                        (
                           ''
                        )

                ) : ('')
            }
        </div>

    )
}

export default LinksContainer
