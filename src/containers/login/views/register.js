import React, { useState, useEffect } from 'react'
import { CircularProgress, Divider, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import styles from './login.less'
import FormItem from '../../../components/FormItem'
import {
    RegisterAction
} from '../actions'
import logo from '../../../assets/logo.png'
import { useSnackbar } from 'notistack';
import { push } from 'connected-react-router'

const SignupComp = (props) => {

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const { loginLoader, RegisterPayload } = useSelector(state => ({
        RegisterPayload: state.login.RegisterPayload,
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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    useEffect(() => {
        if (RegisterPayload && RegisterPayload.success && RegisterPayload.data && !loginLoader) {
            enqueueSnackbar(`Register success. ${RegisterPayload.message}`, {
                variant: 'success',
            });
            dispatch(push('/login'))
        }

    }, [RegisterPayload])
    const checkReqiredFields = () => {
        if (!values.firstName) return ({ error: true, success: false, message: 'Please enter first name.' })
        if (!values.lastName) return ({ error: true, success: false, message: 'Please enter last name.' })
        if (!values.email) return ({ error: true, success: false, message: 'Please enter email address.' })
        if (!values.password) return ({ error: true, success: false, message: 'Please enter password.' })
        if (values.password.length < 9) return ({ error: true, success: false, message: 'Password should be longer than 8 characters.' })
        if (values.email === values.password.toLowerCase()) {
            return ({ error: true, success: false, message: 'Email address and password must be different for your safety.' })
        }
        return ({ error: false, success: true })
    }
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
                username: values.firstName + ' ' + values.lastName,
            }
            dispatch(RegisterAction(payload, enqueueSnackbar))
        } else {
            enqueueSnackbar(` ${message}`, {
                variant: 'warning',
            });
        }

    }

    return (<>{
        loginLoader &&
        <div className={classes.loader}>
            <CircularProgress />
        </div>}
        <div className={styles.contentSignup}>
            <div className={styles.mainSignup}>
                <div className={styles.logo}>
                    <div className={classes.flexCenter}>
                        <img src={logo} className={styles.wealthLogo} />
                        <Typography className={classes.navLogo} varient='h4' color="primary" >
                            Park Here
              </Typography>
                    </div>
                    <Typography className={styles.logos} varient='h6' >
                        {'Create an account to continue'}
                    </Typography>
                </div>
                <div className={styles.formsignup}>
                    <form autoComplete='on' onClick={(e) => {
                        e.preventDefault()
                    }}>
                        <FormItem
                            value={values.firstName}
                            id={'firstName'}
                            autoComplete={'firstName'}
                            label={'First Name'}
                            handleChange={onChange('firstName')}
                        />
                        <FormItem
                            id={'lastName'}
                            autoComplete={'lastName'}
                            value={values.lastName}
                            label={'Last Name'}
                            handleChange={onChange('lastName')} />

                        <FormItem
                            id={'email'}
                            autoComplete={'username email'}
                            value={values.email}
                            label={'Email Address'}
                            handleChange={onChange('email')} />

                        <FormItem
                            inputType={'PASSWORD'}
                            id={'password'}
                            autoComplete={'new-password'}
                            strength={true}
                            label={'Password'}
                            value={values.password}
                            email={values.email}
                            showPassword={values.showPassword}
                            handleChange={onChange('password')} />

                        <div className={styles.lower} />
                        <FormItem inputType={'LOGINBUTTON'} label={'REGISTER'} className={styles.button} onClick={() => onSubmit()} />
                    </form>
                    <div className={styles.orLogin}>
                        <Divider className={classes.divider} />
                        <span>or Sign Up using</span>
                        <Divider className={classes.divider} />
                    </div>
                   

                </div>
            </div>
            <div className={styles.bottom}>
                Already have an account? <a href='/login' style={{ color: '#006DEA', marginLeft: '5px' }}>Login</a>

            </div>
        </div>
    </>)
}

export default SignupComp
