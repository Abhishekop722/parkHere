import _ from 'lodash';
const initialState = {
  currentUser: null,
  ownerUser: null,
  token: null,
  buttonLoading: false,
  otpSession: '',
  sessionId: false,
  selectedCurrency: ''
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'SET_CURRENT_USER':
      if (!_.isMatch(state.currentUser, action.user)) {
        return {
          ...state,
          currentUser: action.user
        }
      }
      else {
        return {
          ...state
        }
      }
    case 'SET_OWNER_USER':
      return {
        ...state,
        ownerUser: action.user
      }
      case 'SET_MANIFEST_FILE':
        return {
          ...state,
          manifestFile: action.user
        }
    case 'SET_CURRENCY':
      if (!_.isMatch(state.selectedCurrency, action.currency)) {
        return {
          ...state,
          selectedCurrency: action.currency
        }
      }
      else {
        return {
          ...state
        }
      }
    case 'LOGOUT':
      localStorage.clear()
      window.location.reload()
      return initialState

    case 'SHOW_BTN_LOADING':
      return {
        ...state,
        buttonLoading: true
      }

    case 'HIDE_BTN_LOADING':
      return {
        ...state,
        buttonLoading: false
      }


    case 'SET_AUTH_TOKEN':

      localStorage.setItem('token', action.token)
      return {
        ...state,
        token: action.token
      }

    case 'SET_OTP_SESSION':
      return {
        ...state,
        otpSession: action.sessionId
      }

    case 'SET_SESSION_ID':
      return {
        ...state,
        sessionId: action.sessionId
      }

    default:
      return state
  }
}
