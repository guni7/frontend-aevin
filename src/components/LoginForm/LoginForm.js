import React, { useContext } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core'

import { useForm, Form } from './../useForm/useForm'
import Input from './../controls/Input'
import Button from './../controls/Button'

import HomePageContext from './../../context/HomePageContext'
import UserLoginContext from './../../context/UserLoginContext'

import axios from 'axios'
import { serverURL } from './../../global'

const useStyles = makeStyles( theme => ({
    form: {
        display: 'flex',
        justifyContent: 'center',
    },
    formItems: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '700px'
    },
    register: {
        color: theme.palette.secondary.main,
        cursor: 'pointer'
    }
}))

const initialFValues = {
    email: '',
    password: '',
}

const LoginForm = () => {
    const { setPage } = useContext(HomePageContext)
    const { setUserData } = useContext(UserLoginContext)

    const classes = useStyles();

    const validate = () => {
        let temp = {}

        temp.email = (/.+@.+..+/).test(values.email)? "" : "Email is invalid"

        temp.password = values.password ? "" :  "This field is required"
        temp.password = values.password.length > 6 ?  ""  : "Password must be greater than 6 characters"

        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(validate()){
            const userData = await callLoginAPI(values.email, values.password);
            setUserData(userData);
            resetForm();
        }
    }
    return(
        <Form onSubmit={handleSubmit}>
            <Grid container className={classes.form}>
                <Grid item className={classes.formItems}>
                    <Input
                        label='Email'
                        name='email'
                        type='email'
                        error={errors.email}
                        value={values.email}
                        onChange={handleInputChange}
                    />
                    <Input
                        label='Password'
                        name='password'
                        type='password'
                        error={errors.password}
                        value={values.password}
                        onChange={handleInputChange}
                    />
                    <br/>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        text="Login"
                        onSubmit={ handleSubmit }
                    />
                    <br/>
                    <Typography>Don't have an account? <span className={classes.register} onClick={ () => setPage('1') }>Register Here </span> </Typography>
                </Grid>
            </Grid>
        </Form>
    )
}

const callLoginAPI = async ( email, password ) => {
    const data = JSON.stringify({
        email,
        password
    });
    const loginAPI = {
        method: 'post',
        url: `${serverURL}api/user/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    }
    return axios(loginAPI)
        .then( res => {
            localStorage.setItem('auth-token', res.data.token)
            const userData = {
                user: res.data.user,
                token: res.data.token,
                loginSuccess: res.data.loginSuccess
            }
            return userData;
        })
        .catch( error => {
            return error
        });
}

export default LoginForm;
