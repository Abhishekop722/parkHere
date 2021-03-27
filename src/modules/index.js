import { combineReducers } from 'redux'
import theme from './theme'
import global from './global'
import { connectRouter } from 'connected-react-router'
import dashboard from '../containers/dashboard/reducers/dashboardReducer'
import login from '../containers/login/reducers'


export default (history)=> combineReducers({
  theme,
  global,
  dashboard,
  login,
  router: connectRouter(history)
})
