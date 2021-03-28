import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import Drawer from '../components/baseMenu'
import NavBar from '../components/navBar'
import { push } from 'connected-react-router';
import DocumentTitle from 'react-document-title'
import Exception from '../components/Exception'
import { Link } from 'react-router-dom';
import Colors from '../utils/color'
const Exp = () => (<Exception
  type="404"
  desc={'You Seems lost !!'}
  linkElement={Link}
  redirect={'/dashboard'}
  backText={'Go To Homepage?'}
/>)


function BasicLayout(props) {
  const dispatch = useDispatch()
  const { redux, token, currentUser } = useSelector(state => ({
    redux: state.theme,
    token: state.global.token,
    currentUser: state.global.currentUser
  }))

  useEffect(() => {
    if (!token || !currentUser) {
      dispatch(push('/login'))
    }
  }, [currentUser, token])
  // console.log(redux)
  const { component, item , onPathChange, isPathOpen} = props
  // console.log(component)
  const useStyles = makeStyles(theme => ({
    basicWraper: {
      display: 'flex',
      maxWidth: '100vw',
      overflow: 'hidden'
    },
    container: {
      display: 'flex',
      overflowY: 'auto',
      flexFlow: 'column',
      margin: 0,
      marginTop: `${redux.navBarHeight}px`,
      padding: '2rem',
      maxWidth: `calc(100vw - ${redux.isMobile ? 0 : redux.maxSideMenuWidth}px)`,
      // height: `100vh`,
      backgroundColor: Colors.containerBackground,
      minHeight: `calc(100vh - ${redux.navBarHeight}px)`,
      position: 'relative',
      left: `${redux.isMobile ? 0 : redux.maxSideMenuWidth}px`
    },
    marginLeft: {
      marginLeft: '1rem'
    },
    marginVertical: {
      margin: '0 1rem'
    },
    appBar: {
      backgroundColor: Colors.siderMenuColor,
      borderBottom: `1px solid ${Colors.primaryColorMain}`,
      minHeight: '75px'
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: '10px',
      paddingBottom: '10px',
    },
    sideBtns: {
      display: 'flex',
      alignItems: 'center'
    },
    leftHead: {
      display: 'flex',
      alignItems: 'center'
    }
  }));



  const classes = useStyles();
  return (
    <div className={classes.basicWraper}>
      <NavBar item={item} currentUser={currentUser} />
      <Drawer currentUser={currentUser} isPathOpen={isPathOpen} onPathChange={onPathChange} />
      <Container className={classes.container}>
        <DocumentTitle title={'PHB | ' + item.title || item.name}>
          {!!component ? <Suspense fallback={<div>Loading...</div>}>
            {component}
          </Suspense> : <Exp />}
        </DocumentTitle>
      </Container>
    </div>
  );
}

export default React.memo(BasicLayout)