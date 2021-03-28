import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import styles from './login.less'
import FormItem from '../../../components/FormItem'
import {
    RegisterAction
} from '../actions'
import line from '../../../assets/line.png'
import { useSnackbar } from 'notistack';
import { push } from 'connected-react-router'

const MobileSignupComp = (props) => {

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
        parking_lot_name: '',
        mobile: '',
        password: '',
        lat: null,
        long: null,
        total_parking_slots: null
    })

    useEffect(() => {
        if (RegisterPayload && RegisterPayload.success && RegisterPayload.data && !loginLoader) {
            enqueueSnackbar(`Register Success. ${RegisterPayload.message}`, {
                variant: 'success',
            });
            dispatch(push('/login'))
        }

    }, [RegisterPayload])
    const checkReqiredFields = () => {
        if (!values.parking_lot_name) return ({ error: true, success: false, message: 'Please enter parking lot name.' })
        if (!values.total_parking_slots) return ({ error: true, success: false, message: 'Please enter parking slots available.' })
        if (!values.mobile) return ({ error: true, success: false, message: 'Please enter mobile no..' })
        if (!values.password) return ({ error: true, success: false, message: 'Please enter password.' })
        if (!values.lat) return ({ error: true, success: false, message: 'Please enter lattidtude coordinate.' })
        if (!values.long) return ({ error: true, success: false, message: 'Please enter longitude coordinate.' })

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
            dispatch(RegisterAction(values, enqueueSnackbar))
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
            <div className={styles.title} variant='h4'>Sign Up with Us</div>
            <div variant='h4'>Create an account to continue</div>
        </AppBar>
        <div className={styles.mobileView}>
            <div className={styles.mobileForm}>
                <form autoComplete='on' onClick={(e) => {
                    e.preventDefault()
                }}>
                    <FormItem
                        value={values.parking_lot_name}
                        id={'parking_lot_name'}
                        autoComplete={'parking_lot_name'}
                        label={'Parking Lot Name'}
                        handleChange={onChange('parking_lot_name')}
                    />
                    <FormItem
                        value={values.total_parking_slots}
                        id={'total_parking_slots'}
                        autoComplete={'total_parking_slots'}
                        label={'Parking Slots'}
                        handleChange={onChange('total_parking_slots')}
                    />
                    <FormItem
                        value={values.lat}
                        id={'lattitude'}
                        autoComplete={'lat'}
                        label={'Lattitude'}
                        handleChange={onChange('lat')}
                    />
                    <FormItem
                        value={values.long}
                        id={'longitiude'}
                        autoComplete={'long'}
                        label={'Longitude'}
                        handleChange={onChange('long')}
                    />
                    <FormItem
                        id={'mobile'}
                        autoComplete={'username mobile'}
                        value={values.mobile}
                        label={'Mobile No.'}
                        handleChange={onChange('mobile')} />

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
                    <div className={styles.lower}>

                    </div>
                    <FormItem inputType={'LOGINBUTTON'} label={'REGISTER'} className={styles.button} onClick={() => onSubmit()} />
                </form>
                <div className={styles.orLogin}>
                    <img src={line} style={{ padding: '10px' }}></img>
                    <span>or Sign Up Using</span>
                    <img src={line} style={{ padding: '10px' }}></img>


                </div>
            </div>
            <div className={styles.mobileBottom}>
                Already have an account?
          <FormItem inputType={'BUTTON'} label={'LOGIN'} onClick={() => {
                    dispatch(push('/login'))
                }} className={styles.mobileButton} />

            </div>

        </div>

    </>)
}

export default MobileSignupComp
