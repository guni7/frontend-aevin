import ChangePictureNew from './../components/ChangePicture/ChangePictureNew';

import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    picture: {
        marginTop: '150px'
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    text2 :{
        minWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}))

const AddProfilePicturePage = () => {
    const classes = useStyles();
    return(
        <div>
            <div className={classes.picture}>
                <ChangePictureNew isNew=true />
            </div>
            <div>
                <Typography className={classes.text}>
                    This will be your app icon as well.
                </Typography>
                <Typography className={classes.text2}>
                    (Your app will not be installable without this)
                </Typography>

            </div>
        </div>

    )
}

export default AddProfilePicturePage;
