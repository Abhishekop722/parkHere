import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Typography, AppBar, Toolbar, Button, Divider, IconButton, Avatar, TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import { LiveHelpOutlined, HelpOutline, Menu, ArrowBack, Edit, Settings } from '@material-ui/icons';
import moment from 'moment'
import clsx from 'clsx';
import { goBack, push } from 'connected-react-router'
import Logo from '../../assets/logo.png'
import { getUrlPushWrapper } from '../../routes';
function NavBar(props) {
    const { item, currentUser } = props
    const dispatch = useDispatch()
    const redux = useSelector(state => state.theme)

    const useStyles = makeStyles(theme => ({
        marginLeft: {
            marginLeft: '1rem'
        },
        marginVertical: {
            margin: '0 1rem'
        },
        appBar: {
            backgroundColor: theme.palette.primary.dark,
            maxWidth: '100vw',
            justifyContent: 'center',
            minHeight: `${redux.navBarHeight}px`,
            boxShadow: 'unset',
            padding: '0 !important'
        },
        borderBottom: {
            borderBottom: `1px solid ${theme.palette.primary.main}`,
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
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
        },
        logoWrapper: {
            width: redux.isMobile ? 'unset' : redux.maxSideMenuWidth,
            display: 'flex',
            alignItems: 'center'
        },
        avatar: {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
        logo: {
            cursor: 'pointer'
        },
        navLogo: {
            marginLeft: '1rem',
            fontFamily:'Ubuntu Condensed',
            color:'white'
        },
        editIcon: {
            marginLeft: '0.5rem',
            cursor: 'pointer'
        }
    }));

    const logout = () => {
        dispatch({ type: 'SET_LOGIN_RESPONSE', payload: null })
        dispatch({ type: 'NATIVE_REGISTER', payload: null })
        dispatch({ type: 'LOGOUT' })
    }

    const onHome = () => {
        dispatch(push('/dashboard'))
    }

    const classes = useStyles();
    return (
        <AppBar position="fixed" className={clsx({ [classes.appBar]: true, [classes.borderBottom]: !redux.isMobile })}>
            <Toolbar className={classes.toolbar}>
                {redux.isMobile ?
                    <>
                        <div className={classes.leftHead}>
                            {item.homepage ? <>
                                <IconButton
                                    edge="start"
                                    className={clsx(classes.menuButton)}
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR_COLLAPSED' })}
                                >
                                    <Menu />
                                </IconButton>
                                <div className={classes.logoWrapper} >
                                    <img style={{ width: '2em' }} onClick={onHome} className={classes.logo} src={'/logo.svg'} />
                                    <Typography variant="h6" color="inherit" className={classes.navLogo} >
                                        Park Here
                                </Typography>
                                </div>
                            </> :
                                <>
                                    <IconButton
                                        edge="start"
                                        className={clsx(classes.menuButton)}
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={() => { item.title.toLowerCase() === 'asset' ? onHome() : dispatch(goBack()) }}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                    <div className={clsx(classes.logoWrapper)} >
                                        <Typography variant="h6" color="inherit" className={classes.marginLeft} >
                                            {item.title.toUpperCase()}
                                        </Typography>
                                    </div>
                                </>
                            }
                        </div>
                    </> :
                    <>
                        <div className={classes.leftHead}>
                            <div className={classes.logoWrapper} >
                                <img onClick={onHome} className={classes.logo} src={Logo} />
                                {/* <img className={classes.marginLeft} src={'/wealthTracker.png'} /> */}
                                <Typography variant="h4" color="primary" className={classes.navLogo} >
                                    Park Here
                                </Typography>
                            </div>
                            <div className={classes.leftHead}>
                                <Typography variant='subtitle2' style={{ color: '#BDBDBD' }} >
                                    {moment().format('dddd, DD MMM YYYY')}
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.sideBtns}>
                            <IconButton target='_blank' href="https://www.PH.com/faq" >
                                <LiveHelpOutlined />
                            </IconButton>
                            <IconButton target='_blank' href="mailto:support@PH.com?subject=PH: Help & Feedback" >
                                <HelpOutline />
                            </IconButton>
                            <Divider orientation='vertical' flexItem />
                            <Button onClick={logout} endIcon={<img src='/images/logOutIcon.svg' />} color="primary" >Log Out</Button>
                        </div>
                    </>}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar