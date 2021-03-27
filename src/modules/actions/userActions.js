import Request from '../../request'
import { showLoader, hideLoader } from './index'

const login = data => {
  return dispatch => {
    dispatch(showLoader())

    Request.login(data)
      .then((data) => {
        dispatch(hideLoader())
      })
  }

}


export default login