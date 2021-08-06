import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

BreadCrumb.propTypes = {
    nameControl : PropTypes.string,
};
BreadCrumb.defaultProps = {
    nameControl: '',
  }

function BreadCrumb({nameControl}) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{nameControl}</li>
            </ol>
        </nav>
    );
}

export default BreadCrumb;