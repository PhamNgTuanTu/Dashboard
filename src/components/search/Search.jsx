import React from 'react';
import { useRef } from 'react';

function Search(props) {
    const ref = useRef(null)
    const openMenu= () => {
        props.openMenu(true);
        ref.current.focus();
    }
    return (
        <li>
            <i className="bx bx-search" onClick={openMenu} />
            <input ref={ref} type="text" placeholder="Search..." autoFocus />
            <span className="tooltip">Search</span>
        </li>
    );
}

export default Search;