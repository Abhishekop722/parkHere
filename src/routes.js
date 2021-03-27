import React from 'react'
import { push } from 'connected-react-router'
import _ from 'lodash'
import { Path } from 'path-parser'
import DashboardIcon from '@material-ui/icons/Dashboard';
const Dashboard = React.lazy(() => import('./containers/dashboard/views'));

const menu = [
  {
    'path': '/dashboard',
    'name': 'Dashboard',
    'icon': <DashboardIcon />,
    'title': 'Dashboard',
    'key': 'dashboard',
    'homepage': true,
    'component': <Dashboard />
  }
]


export const getUrlPushWrapper = (keyString, query) => {
  return push(getUrlPath(keyString, query))
}

export const getUrlPath = (keyString, params) => {

  if (!params) params = {}

  let keyArr = keyString.split('.')
  let val = _.find(menu, p => p.key === keyArr[0])

  if (!val) {
    return `/`
  }

  if (keyArr.length === 2) {
    val = _.find(val.children, p => p.key === keyArr[1])
  }

  if (!val) {
    return `/`
  }

  let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&')

  return `${val.path}?${queryString}`
}

export const getPushPathWrapper = (keyString, params) => {

  let obj = getUrlObject(keyString)

  if (obj) {
    const path = new Path(obj.path)

    return push(path.build(params))
  }

  return 'error'
}

export const getUrlParams = (keyString, route) => {

  let obj = getUrlObject(keyString)

  if (obj) {
    const path = new Path(obj.path)
    return path.test(route)
  }

  return { error: true }
}

export const getUrlObject = (keyString) => {

  let keyArr = keyString.split('.')
  let val = _.find(menu, p => p.key === keyArr[0])
  if (!val) {

    return `/`
  }

  if (keyArr.length === 2) {
    val = _.find(val.children, p => p.key === keyArr[1])
  }

  if (!val) {
    return `/`
  }

  return val
}
//</editor-fold>
export default menu