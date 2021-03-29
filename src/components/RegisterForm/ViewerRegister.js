import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core'
import { Typography, Grid } from '@material-ui/core'

import { useForm, Form } from './../useForm/useForm'
import Input from './../controls/Input'
import Button from './../controls/Button'

import HomePageContext from './../../context/HomePageContext'
import ViewerLoginContext from './../../context/ViewerLoginContext'

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
    login: {
        color: theme.palette.secondary.main,
        cursor: 'pointer',
    },
    inputFields:{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        justifyContent: 'center',
        margin: theme.spacing(2),
        alignItems: 'center',
    },
    haveAccount:{
        margin: theme.spacing(2),

    }
}))

const initialFValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const RegisterForm = ({ setPage }) => {

    const classes = useStyles();
    const history = useHistory();
    const { viewerData, setViewerData } = useContext(ViewerLoginContext)

    const { registerState, setRegisterState } = useState({
        loading: null,
        user: null,
        error: null
    })
    const validate = () => {
        let temp = {}

        temp.name = values.name? "" : "Name is required"
        temp.name = values.name.length > 5 ? "" : "Name must have minimum length of 6 characters"

        temp.email = (/.+@.+..+/).test(values.email)? "" : "Email is invalid"

        temp.username = values.username ? "" : "This field is required"
        temp.username = values.username.length > 5 ? "" : "Username must have minimum length of 6 characters"

        temp.password = values.password ? "" :  "This field is required"
        temp.password = values.password.length > 6 ?  ""  : "Password must be greater than 6 characters"

        temp.confirmPassword = values.confirmPassword ? "" :  "This field is required"
        temp.confirmPassword = values.password === values.confirmPassword ? "" : "Passwords do not match"
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
            const ViewerData = await callRegisterAPI(values.name, values.username, values.email, values.password)
            setViewerData(ViewerData);
        }
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Grid container className={classes.form}>
                <Grid item className={classes.formItems}>
                    <div className={classes.inputFields}>
                        <Input
                            label='Name'
                            name='name'
                            type='text'
                            error={errors.name}
                            value={values.name}
                            onChange={handleInputChange}
                        />
                        <Input
                            label='Username'
                            name='username'
                            type='text'
                            error={errors.username}
                            value={values.username}
                            onChange={handleInputChange}
                        />
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
                        <Input
                            label='Confirm Password'
                            name='confirmPassword'
                            type='password'
                            error={errors.confirmPassword}
                            value={values.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        text="Register"
                        onSubmit={handleSubmit}
                    />
                    <Typography className={classes.haveAccount}>Have an account? <span className={classes.login} onClick={ () => setPage('0') }>Login Here </span> </Typography>
                </Grid>
            </Grid>
        </Form>
    )
}

const callRegisterAPI = async ( name, username, email, password ) => {
    let data = JSON.stringify({
        email: email,
        password: password,
        name: name,
        username: username,
        }
    )
    var registerAPI = {
        method: 'post',
        url: `${serverURL}api/user/viewer/register`,
        headers: {
          'Content-Type': 'application/json'
        },
        data : data
    };
    return axios(registerAPI)
        .then( res => {
            localStorage.setItem('auth-token-viewer', res.data.token)
            const viewerData = {
                viewer: res.data.viewer,
                token: res.data.token,
                loginSuccess: res.data.loginSuccess
            }
            return viewerData;
        })
        .catch( error => {
            return error
        });

}
export default RegisterForm;
