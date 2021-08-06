import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import authorApi from "./api/authorApi";
import bookApi from "./api/bookApi";
import categoryApi from "./api/categoryApi";
import publisherApi from "./api/publisherApi";
import suppliersApi from "./api/suppliersApi";
import userApi from "./api/userApi";
import { setDataAuthor } from "./store/author";
import { setDataBook } from "./store/book";
import { setDataCate } from "./store/category";
import { setDataPublissher } from "./store/publisher";
import { setDataSuppliers } from "./store/supplier";
import { setDataUser } from "./store/user";

const LoadData = () => {
    const dispatch = useDispatch();
    const categorys = () => categoryApi.getAll();
    const books = () => bookApi.getAll();
    const authors = () => authorApi.getAll();
    const publishers = () => publisherApi.getAll();
    const suppliers = () => suppliersApi.getAll();
    const users = () => userApi.getAll();


    var start = Date.now();


    useEffect(() => {
        Promise.all([
            categorys(),
            books(),
            // authors(),
            publishers(),
            suppliers(),
            users(),
        ]).then(([categorysRes, booksRes, authorsRes, publishersRes, suppliersRes, usersRes]) => {
            var millis = Date.now() - start;
            dispatch(setDataCate(categorysRes.data));
            dispatch(setDataBook(booksRes.data));
            // dispatch(setDataAuthor(authorsRes.data));
            dispatch(setDataPublissher(publishersRes.data));
            dispatch(setDataSuppliers(suppliersRes.data));
            dispatch(setDataUser(usersRes.data));
            console.log(millis / 1000 + "s")
        }).catch((err) => console.log(err))
        // eslint-disable-next-line
    }, [])
};

export { LoadData };

