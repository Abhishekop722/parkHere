import React, { useContext } from 'react';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    Collapse,
    List,
    Avatar, Typography, Divider
} from '@material-ui/core';
import {
    ExpandLess,
    ExpandMore,
    HelpOutline,
    LiveHelpOutlined
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx'
import menuData from '../../routes'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import Context from '../../layouts/context'
import _ from 'lodash'

function DrawerMenu(props) {

    const { currentUser, isPathOpen, onPathChange: handleClick } = props
    const dispatch = useDispatch()
    const redux = useContext(Context)
    const useStyles = makeStyles(theme => ({
        menu: {
            height: '100vh',
            position: 'fixed',
            top: 0,
            zIndex: 1,
            backgroundColor: theme.palette.base.main,
            overflowY: 'auto',
            overflowX: 'hidden'
            // boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
        },
        absolute: {
            position: 'absolute'
        },
        drawer: {
            flexShrink: 0,
            height: '100%'
        },
        selected: {
            backgroundColor: theme.palette.secondary.main,
            color: '#4285F4'
        },
        back: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '50px',
        },
        backIcon: {
            padding: '18px',
            height: '50px',
            width: '50px',
            "&:hover": {
                background: "#efefef59"
            }
        },
        fullList: {
            width: 'auto',
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            maxWidth: redux.maxSideMenuWidth,
            minWidth: redux.maxSideMenuWidth,
            backgroundColor: theme.palette.base.main,

            border: 'unset',
            zIndex: 12,
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            borderRight: 'unset',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: 0
        },
        head: {
            paddingTop: `${redux.isMobile ? '3rem' : '2rem'}`,
            marginBottom: `${redux.isMobile ? '0' : '3rem'}`
        },
        flexColumn: {
            flexDirection: 'column',
            justifyItems: 'center',
            alignItems: 'unset'
        },
        avatar: {
            width: theme.spacing(redux.isMobile ? 7 : 4),
            height: theme.spacing(redux.isMobile ? 7 : 4),
        },
        nested: {
            paddingLeft: '4.5rem'
        },
        nestedLevelThree: {
            paddingLeft: '6rem'
        },
        topMargin: {
            marginTop: `${redux.navBarHeight}px`
        },
        leftPadding: {
            paddingLeft: '1.5rem'
        },
        menuWrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            paddingBottom: '1rem'
        },
        textOverflowClass: {
            whiteSpace: 'break-spaces',
            wordWrap: 'break-word',
            fontSize: 11
        },
        subscribeList: { maxHeight: '150px', overflow: 'auto', borderBottom: '1px solid gray' }
    }));
    const classes = useStyles();

    const pushOn = (path) => {
        dispatch({ type: 'TOGGLE_SIDEBAR_COLLAPSED' })
        dispatch(push(path))
    }

    const logout = (e) => {
        dispatch({ type: 'SET_LOGIN_RESPONSE', payload: null })
        dispatch({ type: 'LOGOUT' })
    }

    const mainListItems = (
        <div>
            {
                menuData.map((item, index) => (!item.dontShowOnMenu &&
                    <>
                        <ListItem key={item.key} button component='a'
                            className={clsx(classes.leftPadding, item.path === window.location.pathname && classes.selected)}
                            onClick={(e) => {
                                e.preventDefault()
                                if (!item.children)
                                    pushOn(item.path)
                                else
                                    handleClick(item.key)
                            }}>
                            <ListItemIcon className={clsx(item.path === window.location.pathname && classes.selected)}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText title={item.name} primary={item.name} />
                            {item.children && (!isPathOpen[item.key] || (item.path === window.location.pathname) ? <ExpandLess color='disabled' /> : <ExpandMore color='disabled' />)}
                        </ListItem>
                        <Collapse in={!isPathOpen[item.key]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {item.children?.map(child => !child.dontShowOnMenu &&
                                    <ListItem key={child.key} button component='a' className={clsx(classes.nested, child.path === window.location.pathname && classes.selected)} onClick={(e) => {
                                        e.preventDefault()
                                        if (!child.children)
                                            pushOn(child.path)
                                        else
                                            handleClick(child.key)
                                    }}>
                                        <ListItemIcon className={clsx(child.path === window.location.pathname && classes.selected)}>
                                            {child.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={child.name} />
                                    </ListItem>)
                                }

                            </List>
                        </Collapse>
                    </>
                ))
            }
        </div>
    );

    const bottomMenuList = (
        <div>
            {menuData.map((item, i) => {
                return (item.bottom) && <>
                    <ListItem key={item.key} button component='a'
                        className={clsx(classes.leftPadding, item.path === window.location.pathname && classes.selected)}
                        onClick={(e) => {
                            e.preventDefault()
                            if (!item.children)
                                pushOn(item.path)
                            else
                                handleClick(item.key)
                        }}>
                        <ListItemIcon className={clsx(item.path === window.location.pathname && classes.selected)}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText title={item.name} primary={item.name} />
                        {item.children && (isPathOpen[item.key] || (item.path === window.location.pathname) ? <ExpandLess color='disabled' /> : <ExpandMore color='disabled' />)}
                    </ListItem>
                    <Collapse in={isPathOpen[item.key]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.children?.map(child => !child.dontShowOnMenu &&
                                <ListItem key={child.key} button component='a' className={clsx(classes.nested, child.path === window.location.pathname && classes.selected)} onClick={(e) => {
                                    e.preventDefault()
                                    if (!child.children)
                                        pushOn(child.path)
                                    else
                                        handleClick(child.key)
                                }}>
                                    {/* <ListItemIcon className={clsx(child.path === window.location.pathname && classes.selected)}>
                                        {child.icon}
                                    </ListItemIcon> */}
                                    <ListItemText primary={child.name} />
                                </ListItem>)
                            }

                        </List>
                    </Collapse>

                </>
            }
            )}
            {redux.isMobile ? <>
                <ListItem button component='a' className={clsx(classes.leftPadding)} target='__blank' href='https://www.PH.com/faq' >
                    <ListItemIcon>
                        <LiveHelpOutlined />
                    </ListItemIcon>
                    <ListItemText title='FAQ' primary='FAQ' />
                </ListItem>
                <ListItem button component='a' className={clsx(classes.leftPadding)} target='__blank' href='mailto:support@PH.com?subject=PH: Help & Feedback' >
                    <ListItemIcon>
                        <HelpOutline />
                    </ListItemIcon>
                    <ListItemText title='Help & Feedback' primary='Help & Feedback' />
                </ListItem>

                <Divider />
                <ListItem button component='a' className={clsx(classes.leftPadding)} onClick={logout}>
                    <ListItemIcon>
                        <img alt='logout' src='/images/logOutIcon.svg' />
                    </ListItemIcon>
                    <ListItemText title='Log Out' primary='Log Out' />
                </ListItem>
            </> : <></>}
            {/* <Typography variant='subtitle2' style={!redux.isMobile ? { margin: '1em 4em 0em' } : { margin: '1em 4em 0em' }}>
                Version {manifestFile?.manifest_version}
            </Typography> */}
        </div>
    );

    const renderDesktopUser = () => (<>
        <ListItem key={'user'} button component='a' className={clsx(classes.leftPadding)} onClick={(e) => {
            e.preventDefault()
            handleClick('user')
        }}>
            <ListItemIcon>

                <Avatar variant="circular" src={currentUser && currentUser['profile_pic']} className={classes.avatar}>
                    {((currentUser?.parking_lot_name) || '')[0]}
                </Avatar>
            </ListItemIcon>
            <ListItemText primary={currentUser?.parking_lot_name} />
        </ListItem>
    </>)
    const renderMobileUser = () => (<div>
        <ListItem key={'user'} button component='a' className={clsx(classes.leftPadding)} onClick={(e) => {
            e.preventDefault()
            handleClick('user')
        }}>
            <ListItemIcon>

                <Avatar variant="circle" src={currentUser && currentUser['profile_pic']} className={classes.avatar}>
                    {((currentUser?.parking_lot_name) || '')[0]}
                </Avatar>
            </ListItemIcon>
            <ListItemText primary={currentUser?.parking_lot_name} />
        </ListItem>
    </div>)

    return (
        <div id='basemenu' className={clsx({ [classes.menu]: true })}>
            <Drawer open={redux.isMobile ? redux.collapsed : true}
                onClose={() => dispatch({ type: 'TOGGLE_SIDEBAR_COLLAPSED' })}
                className={classes.drawer}
                variant={redux.isMobile ? "temporary" : 'permanent'}
                classes={{
                    paper: clsx(classes.drawerPaper),
                }}
            ><div className={classes.menuWrapper}>
                    <div>
                        <div className={clsx({ [classes.head]: true, [classes.topMargin]: !redux.isMobile, [classes.flexColumn]: redux.isMobile })}>
                            {redux.isMobile ? renderMobileUser() : renderDesktopUser()}
                        </div>
                        <List disablePadding>{mainListItems}</List>

                    </div>
                    {bottomMenuList}

                </div>

            </Drawer>
        </div>
    );
}


export default React.memo(DrawerMenu)