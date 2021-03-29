import React, { useContext } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core'

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
        width: '100vw',
        maxWidth: '700px',
    },
    register: {
        color: theme.palette.secondary.main,
        cursor: 'pointer'
    },
    inputFields:{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        margin: theme.spacing(2),
        alignItems: 'center',
    },
    noAccount: { margin: theme.spacing(2),
    }
}))

const initialFValues = {
    email: '',
    password: '',
}

const ViewerLogin = ({ setPage }) => {
    const { setViewerData } = useContext(ViewerLoginContext)

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
            const viewerData = await callLoginAPI(values.email, values.password);
            setViewerData(viewerData);
            resetForm();
        }
    }
    return(
        <Form onSubmit={handleSubmit}>
            <Grid container className={classes.form}>
                <Grid item className={classes.formItems}>
                    <div className={classes.inputFields}>
                        <Input
                            label='Email'
                            name='email'
                            type='email'
                            error={errors.email}
                            value={values.email}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    <Input
                        label='Password'
                        name='password'
                        type='password'
                        error={errors.password}
                        value={values.password}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        text="Login"
                        onSubmit={ handleSubmit }
                    />
                    <Typography className={classes.noAccount}>Don't have an account? <span className={classes.register} onClick={ () => setPage(1) }>Register Here </span> </Typography>
                    <br/>
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
        url: `${serverURL}api/user/viewer/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    }
    return axios(loginAPI)
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

export default ViewerLogin
