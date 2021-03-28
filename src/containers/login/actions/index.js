import axios from 'axios'
import {
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
export const LoginAction = (payload) => async (dispatch) => {
    dispatch({ type: 'SET_LOGIN_RESPONSE', payload: null })
    dispatch({ type: 'SHOW_LOGIN_LOADER' })
    await axios
        .post(nativeLoginUrl(), { ...payload })
        .then(async function ({ data: x = {} }) {
            dispatch({ type: 'HIDE_LOGIN_LOADER' })
            dispatch({ type: 'NATIVE_LOGIN', payload: x })
        })
        .catch(function ({ response: x = {} }) {
            dispatch({ type: 'HIDE_LOGIN_LOADER' })
            dispatch({ type: 'NATIVE_LOGIN', payload: { error: true, err: x.data } })

        })
}