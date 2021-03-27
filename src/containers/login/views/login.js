import React, { useState, useContext, useEffect, useRef } from 'react'
import { Checkbox, CircularProgress, Divider, FormControlLabel, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import styles from './login.less'
import FormItem from '../../../components/FormItem'
import {
    LoginAction,
    ResetPasswordRequestAction,
} from '../actions'
import logo from '../../../assets/logo.png'
import { useSnackbar } from 'notistack';
import { push } from 'connected-react-router'

const LoginComp = (props) => {

    const dispatch = useDispatch()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { loginLoader, loginPayload } = useSelector(state => ({
        isMobile: state.theme.isMobile,
        loginResponse: state.login.loginResponse,
        loginPayload: state.login.loginPayload,
        loginLoader: state.login.loginLoader
    }))
    const useStyles = makeStyles(theme => ({
        marginLeft: {
            marginLeft: '1rem',
        },
        marginVertical: {
            margin: '0 1rem',
        },
        appBar: {
            backgroundColor: '#006DEA',
            width: '100vw',
            // justifyContent: 'center',
            height: '12rem',
            boxShadow: 'unset',
            backgroundImage: 'url(/images/vectorBgSmall.png)',
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: '10px',
            position: 'relative',

        },
        checkBox: {
            color: '#B9BDCA',
            overflow: 'visible'
        },
        navLogo: {
            fontSize: '28px',
            fontFamily:'Ubuntu Condensed',
            color:'white'

        },
        flexCenter: {
            display: 'flex',
            alignItems: 'center'
        },
        divider: {
            height: "1px",
            width: "50px",
            margin: "0 1rem",
            backgroundColor: "#ffffff4a"
        },
        loader: {
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.3)'
        }
    }))
    const classes = useStyles()
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const [rememberMe, setRememberMe] = useState(false)
    useEffect(() => {
        if (loginPayload && loginPayload.success && loginPayload.data) {
            let token = loginPayload.data.autho_token
            // let decodedUser = jwt_decode(token)
            // if (decodedUser && decodedUser['user-data']) {
            //     if (rememberMe)
            //         setCookie()
            //     dispatch({ type: 'SET_CURRENT_USER', user: decodedUser['user-data'] })
            // }
            dispatch({ type: 'SET_AUTH_TOKEN', token: loginPayload.data.autho_token })
            dispatch(push('/dashboard'))
        }
        else if (loginPayload && loginPayload.error && loginPayload.err && loginPayload.err.message) {
            enqueueSnackbar(`Login failed. ${loginPayload.err.message}`, {
                variant: 'error',
            });
        }
        dispatch({ type: 'NATIVE_LOGIN', payload: null })

    }, [loginPayload])


    const checkReqiredFields = () => {
        if (!values.email) return ({ error: true, success: false, message: 'Enter Email Address' })
        if (!values.password) return ({ error: true, success: false, message: 'Enter password' })
        return ({ error: false, success: true })
    }
    useEffect(() => {
        dispatch({ type: 'NATIVE_REGISTER', payload: null })
    }, [])
    const onChange = (prop) => (e) => {
        e.preventDefault()
        e.persist()
        setValues(() => ({ ...values, [prop]: prop === 'email' ? e.target.value?.toLowerCase() : e.target.value }))
    }
    
    const onSubmit = async () => {
        let { success, message } = await checkReqiredFields()
        if (success) {
            let payload = {}
            payload = {
                ...payload,
                ...values,
                remember_me: rememberMe
            }
            dispatch(LoginAction(payload))
        } else {
            enqueueSnackbar(` ${message}`, {
                variant: 'warning',
            });
        }
    }
    const ResetPassword = () => {
        if (values.email) {
            let payload = {}
            payload = {
                email_id: values.email
            }
            dispatch(ResetPasswordRequestAction(payload, enqueueSnackbar))
        } else {
            enqueueSnackbar(`Enter Email Address`, {
                variant: 'warning',
            });
        }
    }

    return (<>{
        loginLoader &&
        <div className={classes.loader}>
            <CircularProgress />
        </div>}

        <div className={styles.content}>
            <div className={styles.main}>
                <div className={styles.logo}>
                    <div className={classes.flexCenter}>
                        <img src={logo} className={styles.wealthLogo} />
                        <Typography className={classes.navLogo} varient='h4' color="primary" >
                            Park Here
              </Typography>
                    </div>
                    <Typography className={styles.logos} varient='h6' >
                        Welcome back! Login to continue
            </Typography>
                </div>
                <div autoComplete='on' className={styles.form}
                >
                    <form autoComplete='on' onClick={(e) => {
                        e.preventDefault()
                    }}>
                        <FormItem id={'email'}
                            label={'Email Address'}
                            autoComplete={'username email'}
                            value={values.email}
                            handleChange={onChange('email')} />
                        <FormItem inputType={'PASSWORD'}
                            id={'password'}
                            autoComplete={'new-password'}
                            label={'Password'}
                            className={styles.password}
                            value={values.password}
                            showPassword={values.showPassword}
                            handleChange={onChange('password')} />
                        <div className={styles.lower}>
                            {/* <FormControlLabel
                                className={classes.checkBox}
                                control={
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={(e) => onRememberMe(e.target.checked)}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            /> */}
                            <div className={styles.forget} >
                                <a href='#' onClick={() => ResetPassword()}>

                                    Forgot Password?
                            </a>
                            </div>
                        </div>
                        <FormItem inputType={'LOGINBUTTON'} type='submit' label={'LOGIN'} className={styles.button} onClick={() => onSubmit()} />
                    </form>
                    <div className={styles.orLogin}>
                        <Divider className={classes.divider} />

                        <span>or login using</span>
                        <Divider className={classes.divider} />


                    </div>
                   
                </div>
            </div>
            <div className={styles.bottom}>
                Don't have an account? <a href='/signup' style={{ color: '#006DEA', marginLeft: '5px' }}>Register</a>
            </div>
        </div>

    </>)
}

export default LoginComp
