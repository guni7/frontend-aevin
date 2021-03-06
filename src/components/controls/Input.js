import React from 'react';
import { TextField } from '@material-ui/core'

const Input = (props) => {
    const { name, label, value, type, error=null, onChange } = props
    return(
        <TextField
            variant='outlined'
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            fullWidth
            {...(error && {error: true, helperText: error})}
        />
    )
}

export default Input;
