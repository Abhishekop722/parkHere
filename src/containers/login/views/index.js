import React, { useEffect } from 'react'
import { CircularProgress } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { useSnackbar } from 'notistack';
import LoginComp from './login'
import SignupComp from './register'

import MobileLoginComp from './mobileLogin'
import MobileSignupComp from './mobileRegister'

const LoginPage = (props) => {

  const { signup } = props
  const dispatch = useDispatch()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { isMobile, loginResponse, loginLoader } = useSelector(state => ({
    isMobile: state.theme.isMobile,
    loginResponse: state.login.loginResponse,
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

  useEffect(() => {
    if (loginResponse && loginResponse.error) {
      enqueueSnackbar('Login failed.', {
        variant: 'error',
      });
    }
    dispatch({ type: 'SET_LOGIN_RESPONSE', payload: null })

  }, [loginResponse])

  useEffect(() => {
    dispatch({ type: 'HIDE_LOGIN_LOADER' })
    if (document.location.pathname === "/login/confirm") {
      if (document.location.search) {
        let str = new URLSearchParams(document.location.search)
        let status = str.get('status')
        let message = str.get('msg')
        status.toLowerCase() === 'true' ? enqueueSnackbar(message, {
          variant: 'success',
        }) : enqueueSnackbar(message, {
          variant: 'error',
        })
      }
    }
  }, [])


  return (<>{
    loginLoader &&
    <div className={classes.loader}>
      <CircularProgress />
    </div>}
    {isMobile ?
      <div>
        {signup ?
          <MobileSignupComp />
          :
          <MobileLoginComp />}
      </div>
      : <div>
        {signup ?
          <SignupComp />
          :
          <LoginComp />}
      </div>
    }
  </>)
}

export default LoginPage
