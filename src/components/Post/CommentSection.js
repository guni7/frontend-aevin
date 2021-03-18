import Comment from './Comment';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '650px',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        margin: theme.spacing(0.2),
        borderRadius: '5px',
    },
}));

const CommentSection = ({ comments }) => {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            {
                comments.map(comment =>
                    <div key={comment.id}>
                        <Comment comment={comment} />
                    </div>
                )
            }
        </div>
    )
}

export default CommentSection
