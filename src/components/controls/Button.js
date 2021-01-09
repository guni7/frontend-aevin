import React from 'react'
import { Button as MuiButton } from '@material-ui/core'

const Button = (props) => {
    const { text, size, color, variant, onClick, type } = props
    return(
        <MuiButton
        variant={variant}
        size={size}
        color={color}
        type={type}
        onClick={onClick}>
            {text}
        </MuiButton>
    )
}

export default Button;
