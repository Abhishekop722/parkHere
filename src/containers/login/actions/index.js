import axios from 'axios'
import {
    resetPasswordUrl, resetPasswordRequest,
    nativeLoginUrl, RegisterUrl
} from '../api'
import { push } from 'connected-react-router'

export const RegisterAction = (payload, enqueueSnackbar) => async (dispatch) => {
    dispatch({ type: 'SET_LOGIN_RESPONSE', payload: null })
    dispatch({ type: 'SHOW_LOGIN_LOADER' })
    await axios
        .post(RegisterUrl(), { ...payload })
        .then(async function ({ data: x }) {
            dispatch({ type: 'HIDE_LOGIN_LOADER' })
            dispatch({ type: 'NATIVE_REGISTER', payload: x })
        })
        .catch(function ({ response: x }) {
            dispatch({ type: 'HIDE_LOGIN_LOADER' })
            enqueueSnackbar(`Register failed. ${x.data.message}`, {
                variant: 'error',
            });
            dispatch({ type: 'NATIVE_REGISTER', payload: { error: true } })

        })
}
export const ResetPasswordAction = (payload, enqueueSnackbar) => async (dispatch) => {
    dispatch({ type: 'SET_LOGIN_RESPONSE', payload: null })
    dispatch({ type: 'SHOW_LOGIN_LOADER' })
    await axios
        .post(resetPasswordUrl(), { ...payload })
        .then(async function ({ data: x }) {
            dispatch({ type: 'HIDE_LOGIN_LOADER' })
            enqueueSnackbar(`${x.message}`, {
                variant: 'success',
            });
            dispatch(push('/login'))
        })
        .catch(function ({ response: x }) {
            dispatch({ type: 'HIDE_LOGIN_LOADER' })
            enqueueSnackbar(`Request Failed. ${x.message}`, {
                variant: 'error',
            });

        })
}
export const ResetPasswordRequestAction = (payload, enqueueSnackbar) => async (dispatch) => {
    dispatch({ type: 'SET_LOGIN_RESPONSE', payload: null })
    dispatch({ type: 'SHOW_LOGIN_LOADER' })
    await axios
        .post(resetPasswordRequest(), { ...payload })
        .then(async function ({ data: x }) {
            dispatch({ type: 'HIDE_LOGIN_LOADER' })
            enqueueSnackbar(`${x.message}`, {
                variant: 'success',
            });
        })
        .catch(function (err) {
            dispatch({ type: 'HIDE_LOGIN_LOADER' })
            enqueueSnackbar(`Reset Password Request failed .`, {
                variant: 'error',
            });

        })
}

export const LoginAction = (payload) => async (dispatch) => {
    dispatch({ type: 'SET_LOGIN_RESPONSE', payload: null })
    dispatch({ type: 'SHOW_LOGIN_LOADER' })
    await axios
        .post(nativeLoginUrl(), { ...payload })
        .then(async function ({ data: x }) {
            dispatch({ type: 'HIDE_LOGIN_LOADER' })
            dispatch({ type: 'NATIVE_LOGIN', payload: x })
        })
        .catch(function ({ response: x }) {
            dispatch({ type: 'HIDE_LOGIN_LOADER' })
            dispatch({ type: 'NATIVE_LOGIN', payload: { error: true, err: x.data } })

        })
}