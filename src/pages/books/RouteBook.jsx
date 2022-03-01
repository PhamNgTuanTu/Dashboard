import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import bookApi from "../../api/bookApi";
import listDataAddBookApi from "../../api/listDataAddBookApi";
import { setDataBook, setLoadingData } from "../../store/book";
import { setDataSelect, setLoadingDataSelect } from "../../store/select";
import ErrorPage from "../errorpage/ErrorPage";
import AddEditBooks from "./AddEditBooks";
import Books from "./Books";

RouteBook.propTypes = {};

function RouteBook(props) {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const books = () => bookApi.getAll();
  const dataSelect = () => listDataAddBookApi.getAll();

  // var start = Date.now();

  useEffect(() => {
    Promise.all([books(), dataSelect()])
      .then(([booksRes, selectRes]) => {
        // var millis = Date.now() - start;

        dispatch(setDataBook(booksRes.data));
        dispatch(setLoadingData(false));

        dispatch(setDataSelect(selectRes.data));
        dispatch(setLoadingDataSelect(false));

        // console.log(millis / 1000 + "s")
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);
  return (
    <Switch>
      <Route exact path={path} component={Books} />

      <Route exact path={`${path}/add-book`} component={AddEditBooks} />
      <Route exact path={`${path}/:bookId`} component={AddEditBooks} />

      <Route component={ErrorPage} />
    </Switch>
  );
}

export default RouteBook;
