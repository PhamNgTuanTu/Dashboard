import React from 'react';
import Search from '../../components/search/Search';
import Profile from '../../components/profile/Profile';
import Sidebar from '../../components/sidebar/Sidebar';


function ListSidebar({openMenu}) {
    return (
        <ul className="nav-list">
            <Search openMenu={() => openMenu(true)}/>
            <Sidebar />
            <Profile />
        </ul>
    );
}

export default ListSidebar;