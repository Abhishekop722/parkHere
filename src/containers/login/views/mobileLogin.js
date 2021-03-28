import React, { useState, useEffect } from 'react'
import { Checkbox, Divider, FormControlLabel } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import styles from './login.less'
import FormItem from '../../../components/FormItem'
import {
    LoginAction
} from '../actions'
import { useSnackbar } from 'notistack';
import { push } from 'connected-react-router'

const MobileLoginComp = (props) => {

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const { loginPayload } = useSelector(state => ({
        loginPayload: state.login.loginPayload
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
            height: '9rem',
            boxShadow: 'unset',
            backgroundImage: 'url(/images/vectorBgSmall.png)',
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: '10px',
            position: 'relative',

        },
        checkBox: {
            color: '#B9BDCA',
            width:'50%'
        },
        navLogo: {
            fontSize: '28px',
            fontFamily: 'Ubuntu Condensed',
            color: 'white'

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
        mobile: '',
        password: '',
    })

    useEffect(() => {
        if (loginPayload && loginPayload.success && loginPayload.data) {
            let token = loginPayload.data.auth_token
            let user = loginPayload.data?.user
            // let decodedUser = jwt_decode(token)
            if (user) {
                
                dispatch({ type: 'SET_CURRENT_USER', user })
            }
            dispatch({ type: 'SET_AUTH_TOKEN', token: loginPayload.data.auth_token })
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
        if (!values.mobile) return ({ error: true, success: false, message: 'Enter Mobile No.' })
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
            dispatch(LoginAction(values))
        } else {
            enqueueSnackbar(` ${message}`, {
                variant: 'warning',
            });
        }
    }
    return (<>
        <AppBar position="fixed" className={classes.appBar}>
            <div className={styles.logosSmall}>
                <img src={'/logo.svg'} className={styles.logoSmall} />
            </div>
            <div className={styles.title}>Welcome Back</div>
            <div>Login to continue</div>


        </AppBar>
        <div className={styles.mobileView}>
            <div className={styles.mobileForm}>
                <form autoComplete='on' onClick={(e) => {
                    e.preventDefault()
                }}>
                    <FormItem
                        id={'mobile'}
                        autoComplete={'username mobile'}
                        value={values.email}
                        label={'Mobile No.'}
                        className={styles.mobileInput}
                        handleChange={onChange('mobile')} />


                    <FormItem
                        inputType={'PASSWORD'}
                        id={'password'}
                        autoComplete={'new-password'}
                        label={'Password'}
                        className={styles.password}
                        value={values.password}
                        showPassword={values.showPassword}
                        handleChange={onChange('password')} />

                    <FormItem inputType={'LOGINBUTTON'} label={'LOGIN'} className={styles.button} onClick={() => onSubmit()} />
                </form>
                
            </div>
           
            <div className={styles.mobileBottom}>
                            <div className={styles.mobileBottomTop}>
                            Don't have an account yet?
                            </div>
          <FormItem inputType={'BUTTON'} label={'CREATE AN ACCOUNT'} onClick={() => {
                    dispatch(push('/signup'))
                }} className={styles.mobileButton} labelStyle={styles.labelStyle} />

            </div>

        </div>
    </>)
}

export default MobileLoginComp
