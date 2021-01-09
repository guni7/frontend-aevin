import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'

export const useForm = (initialFValues) => {
    const [values, setValues] = useState(initialFValues)
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetForm = () => {
        setValues(initialFValues)
        setErrors({})
    }
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export const Form = (props) => {

    const classes = useStyles();
    const { children, ...other } = props
    return(
        <form className={classes.root} {...other}>
            {
                props.children
            }
        </form>
    )
}
