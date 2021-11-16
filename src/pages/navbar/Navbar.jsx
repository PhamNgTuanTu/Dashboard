import React, { useState } from 'react';
import ListSidebar from './../listsidebar/ListSidebar';

function Navbar(props) {
    const [openSideBar, setOpenSideBar] = useState(false);
    const openNavBar = () => {
        setOpenSideBar(!openSideBar);
    }
    const closeMenu = () => {
        setOpenSideBar(false);
    }
    const openMenu = (data) => {
        setOpenSideBar(data);
    }
    return (
        <>
            <div className={openSideBar ? "menu-overlay" : ""} onClick={closeMenu}></div>
            <div className={openSideBar ? "sidebar open" : "sidebar"}>
                <div className="logo-details">
                    <i className='bx bx-book-alt icon'></i>
                    <div className="logo_name">StaciaBook</div>
                    <i className={openSideBar ? "bx bx-menu-alt-right bx-md" : "bx bx-menu bx-md"} id="btn" onClick={openNavBar} />
                </div>
                <ListSidebar openMenu={openMenu}/>
            </div>
        </>
    );
}

export default Navbar;