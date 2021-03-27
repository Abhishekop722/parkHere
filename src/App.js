import React, { useEffect, Suspense, useState } from 'react'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import menuData from './routes'
import BasicLayoutWrapper from './layouts/BasicLayout'
import Login from './containers/login/views'

import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import Exception from './components/Exception'
import DocumentTitle from 'react-document-title'
import { GetSubUserAction } from './containers/dashboard/actions/dashboardAction'
const ResetPassword = React.lazy(() => import('./containers/login/views/resetPassword'));

const Exp = () => (<Exception
  type="404"
  desc={'You Seems lost !!'}
  linkElement={Link}
  redirect={'/dashboard'}
  backText={'Go To Homepage?'}
/>)

const routesExcludeWIthPermissions = [
  'addInvestment',
  'addLoan',
  'addCash'
]

export default () => {
  const dispatch = useDispatch()
  const [isPathOpen, setPathOpen] = useState({});
  const { token, currentUser, ownerUser } = useSelector(state => ({
    currentUser: state.global.currentUser,
    ownerUser: state.global.ownerUser,
    token: state.global.token
  }))

  const onPathChange = (key) => {
    let newArr = _.clone(isPathOpen)

    newArr[key] = !newArr[key]
    setPathOpen(() => newArr);
  };

  return (<Suspense fallback={<div>Loading...</div>}>
    <Switch>
      {/* <AddToHomescreen onAddToHomescreenClick={handleAddToHomescreenClick} /> */}

      {menuData.map((item, key) => {
        if (!item.children && !(ownerUser?.permission?.View === true && routesExcludeWIthPermissions.includes(item.key))) {
          return (<Route exact path={item.path} key={item.path} render={(route) => {
            return <BasicLayoutWrapper isPathOpen={isPathOpen} onPathChange={onPathChange} component={item.component} item={item} menuData={menuData} />
          }} />)
        }
      })}

      {menuData.map((item, key) => {
        if (item.children) {
          return item.children.map((child, k) => {
            return (<Route exact path={child.path} key={child.path} render={(route) => {
              return <BasicLayoutWrapper isPathOpen={isPathOpen} onPathChange={onPathChange} component={child.component} item={item}  /* user={user} */
                menuData={menuData} />
            }} />)
          })
        }
      })}

      {/* Asset Routes  */}

      {/* {assetList.map((item, key) => {
        let assetPath = `/asset/${item.id}`
        return (<Route exact path={assetPath} key={assetPath} render={(route) => {
          return <BasicLayoutWrapper component={assetMenu.component} item={assetMenu} menuData={menuData} />
        }} />)
      })} */}

      <Route exact path="/login" render={(route) => {
        return (
          <DocumentTitle title={'PH | Login'}>
            <Login />
          </ DocumentTitle>
        )
      }} />
      <Route exact path="/login/confirm" render={(route) => {
        return (
          <DocumentTitle title={'PH | Login'}>
            <Login />
          </ DocumentTitle>
        )
      }} />
      <Route exact path="/resetPassword/:id" render={(route) => {
        return (
          <DocumentTitle title={'PH | Login'}>
            <ResetPassword />
          </ DocumentTitle>
        )
      }} />
      <Route exact path="/signup" render={(route) => {
        return (
          <DocumentTitle title={'PH | Sign up'}>
            <Login signup={true} />
          </ DocumentTitle>
        )
      }} />
      <Route exact path="/" render={(route) => {
        return (
          <Redirect to="/dashboard" />
        )
      }} />
      <Route component={Exp} />


    </Switch>
  </Suspense>)
};