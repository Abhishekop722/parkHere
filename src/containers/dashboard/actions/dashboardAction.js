import axios from 'axios'
import { getToken } from '../../../settings'
import {
    getUserDetailsUrl
} from '../api/dashboardApi'

export const GetUserDetailAction = (data) => async (dispatch) => {
    await axios
        .get(getUserDetailsUrl(), getToken())
        .then(async function ({ data: x }) {
            if (!x.error) {

            } else {
                dispatch({ type: 'SET_CURRENT_USER', user: null })

                console.log("Err")
            }
        })
        .catch(function (error) {
            dispatch({ type: 'SET_CURRENT_USER', user: null })
            // console.log("er", error)
        })
}
