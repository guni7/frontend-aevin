import { makeStyles } from '@material-ui/core'
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '98%',
        maxWidth: '650px',
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(2),
        margin: theme.spacing(0.2),
        borderRadius: '5px',
        backgroundColor: theme.palette.neutral.dark
    },
    commentContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        width: '100%',

    },
    commentorName: {
        fontWeight: '600'
    },
    commentData: {
        maxWidth: '100%',
        width: '50%'
    }
}));

const Comment = ({ comment }) => {

    const classes = useStyles();
    return(
        <div>
            <div className={classes.root} key={comment.id}>
                <Avatar alt="R" src="" />
                <div className={classes.commentContainer}>
                    <Typography className={classes.commentorName}> {comment.viewerName} </Typography>
                    <div className={classes.commentData} >
                        <Typography > {comment.commentData} </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;
