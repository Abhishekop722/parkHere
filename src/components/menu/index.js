import React from "react";
import PropTypes from "prop-types";
import MuiMenu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SubMenuItem from "./subMenuItem";

const Menu = (props) => {
    const { anchorElement, open, onClose, isMobile, ...others } = props;
    const renderMenuItems = () => {
        const { menuItems } = props;
        return menuItems.map(menuItem => {
            if (menuItem.hasOwnProperty("subMenuItems")) {
                return (
                    <SubMenuItem
                        key={menuItem.key}
                        caption={menuItem.caption}
                        menuItems={menuItem.subMenuItems}
                        MenuListProps={others.MenuListProps}
                        style={others.style || {}}
                        isMobile={isMobile}
                    />
                );
            }

            return (
                <MenuItem key={menuItem.key} onClick={menuItem.onClick}>
                    {menuItem.caption}
                </MenuItem>
            );
        });
    };
    return (
        <MuiMenu
            id='twoLevelMenu'
            anchorEl={anchorElement}
            open={open}
            onClose={onClose}
            {...others}
        >
            {renderMenuItems()}
        </MuiMenu>
    );
}

Menu.propTypes = {
    open: PropTypes.bool.isRequired,
    menuItems: PropTypes.array.isRequired,
    anchorElement: PropTypes.any,
    onClose: PropTypes.func.isRequired,
    MenuListProps: PropTypes.object.isRequired
};

export default Menu
