import React, { useState } from 'react'
import { CircularProgress, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import styles from './login.less'
import FormItem from '../../../components/FormItem'
import {
    ResetPasswordAction
} from '../actions'
import logo from '../../../assets/logo.png'
import { useSnackbar } from 'notistack';
import { useParams } from "react-router-dom";
const ResetPassword = (props) => {

    const dispatch = useDispatch()
    let { id: oauth_token } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const { loginLoader } = useSelector(state => ({
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
            fontSize: '28px'
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
        Confirmpassword: '',
        password: '',
    })
    const checkReqiredFields = () => {
        if (!values.password) return ({ error: true, success: false, message: 'Enter New password' })
        if (!values.Confirmpassword) return ({ error: true, success: false, message: 'Enter Confirm password' })
        if (values.password.length < 9) return ({ error: true, success: false, message: 'Passoword Should be greater than 8 characters' })
        if (values.Confirmpassword != values.password) return ({ error: true, success: false, message: 'Password doesnot match' })

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
                oauth_token: oauth_token,
                password: values.password,
                confirm_password: values.Confirmpassword
            }
            dispatch(ResetPasswordAction(payload, enqueueSnackbar))
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
                        Reset Password !
            </Typography>
                </div>
                <div className={styles.form}
                >
                    <FormItem inputType={'PASSWORD'}
                        id={'password'}
                        label={'New Password'}
                        className={styles.password}
                        value={values.password}
                        showPassword={values.showPassword}
                        handleChange={onChange('password')} />

                    <FormItem inputType={'PASSWORD'}
                        id={'password1'}
                        label={'Comfirm Password'}
                        className={styles.password}
                        value={values.Confirmpassword}
                        showPassword={values.showPassword}
                        handleChange={onChange('Confirmpassword')} />

                    <FormItem inputType={'LOGINBUTTON'} label={'RESET'} className={styles.button} onClick={() => onSubmit()} />

                </div>
            </div>
        </div>

    </>)
}

export default ResetPassword
