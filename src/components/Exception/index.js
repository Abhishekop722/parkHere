import React, { createElement } from 'react'
import { Button, Typography } from '@material-ui/core'
import classNames from 'classnames'
import config from './typeConfig'
import styles from './styles.less'
import { useSelector } from 'react-redux'
function Exception(props) {

    const { isMobile } = useSelector(state => ({
        isMobile: state.theme.isMobile
    }))
    const {
        className,
        backText,
        linkElement = 'a',
        type,
        title,
        desc,
        img,
        actions,
        redirect,
        ...rest
    } = props
    const pageType = type in config ? type : '404'
    const clsString = classNames(styles.exception, className)


    return (
        <div className={clsString} {...rest}>
            <div className={isMobile ? styles.imgBlockMobile : styles.imgBlock}>
                <div
                    className={styles.imgEle}
                    style={{ backgroundImage: `url(${img || config[pageType].img})` }}
                />
            </div>
            <div className={styles.content}>
                <Typography variant="h1" className={styles.logoText} >
                    Park Here Business
                </Typography>
                <h1>{title || config[pageType].title}</h1>
                <div className={styles.desc}>{desc || config[pageType].desc}</div>


                <div className={styles.actions}>
                    {actions ||
                        createElement(
                            linkElement,
                            {
                                to: redirect,
                                href: redirect
                            },
                            <Button className={styles.btn} type="primary">{backText}</Button>
                        )}

                    {createElement(
                        linkElement,
                        {
                            to: redirect,
                            href: redirect
                        },
                        <Button onClick={() => {
                            localStorage.removeItem('token')
                            localStorage.removeItem('user')
                            localStorage.clear()

                        }} type="danger" className={styles.btn} style={{ marginLeft: 10 }}>Logout</Button>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Exception
