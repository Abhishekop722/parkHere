import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import Menu from './index'

const styles = {
    subMenuItem: {
        display: "flex",
        justifyContent: "space-between"
    },
    title: {
        width: '100%',
        textAlign: 'left'
    }
};

const SubMenuItem = (props) => {
    const { caption, menuItems, classes, MenuListProps, style, isMobile } = props;
    const [menuOpen, setMenuOpen] = useState(false);
    const anchorElement = useRef(null)

    const handleItemClick = (event) => {
        if (!anchorElement.current)
            anchorElement.current = event.currentTarget
        setMenuOpen((prev) => !prev);
    }
    const handleSubMenuClose = () => {
        setMenuOpen(() => false);
    }

    return (
        <React.Fragment>
            <MenuItem
                key={caption}
                onClick={handleItemClick}
                onMouseOver={!isMobile && handleItemClick}
                onMouseOut={!isMobile && handleSubMenuClose}
                className={classNames(classes.subMenuItem)}
                {...MenuListProps}
            >
                <ArrowLeftIcon style={{ marginRight: '1rem' }} />
                <div className={classNames(classes.title)} >{caption}</div>
            </MenuItem>
            <Menu
                key={'sub menu'}
                id={`twoLevel${caption}`}
                style={{ ...style }}
                open={menuOpen}
                menuItems={menuItems}
                anchorElement={anchorElement.current}
                onMouseOver={!isMobile && handleItemClick}
                onMouseOut={!isMobile && handleSubMenuClose}
                onClose={handleSubMenuClose}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                MenuListProps={MenuListProps}
            />
        </React.Fragment>
    );
}

SubMenuItem.propTypes = {
    caption: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    menuItems: PropTypes.array.isRequired
};

export default withStyles(styles)(SubMenuItem);
