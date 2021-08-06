import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ErrorPage from '../errorpage/ErrorPage';
import Books from './Books';
import AddEditBooks from './AddEditBooks';

RouteBook.propTypes = {

};

function RouteBook(props) {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.url} component={Books} />

            <Route exact path={`${match.url}/add-book`} component={AddEditBooks} />
            <Route exact path={`${match.url}/:bookId`} component={AddEditBooks} />

            <Route component={ErrorPage} />
        </Switch>
    );
}

export default RouteBook;