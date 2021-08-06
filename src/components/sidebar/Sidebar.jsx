import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const showMenus = (menus) => {
    var result = null;
    if (menus.length > 0) {
        result = menus.map((menu, index) => {
            return (
                <li key={index}>
                    <NavLink to={menu.to} activeClassName="active-sidebar" exact={menu.exact}>
                        <i className={menu.icon} ></i>
                        <span className="links_name">{menu.name}</span>
                    </NavLink >
                </li>
            );
        });
    }
    return result;
}
function Sidebar(props) {
    const { sidebar } = useSelector((state) => state.sidebar);
    return (
        <>
            {showMenus(sidebar)}
        </>
    );
}

export default Sidebar;