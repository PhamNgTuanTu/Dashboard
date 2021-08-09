import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import bookApi from '../../api/bookApi';
import { ConvertSearchToString } from '../../components/convert-url/ConvertSearchToString';
import { useDocTitle } from '../../components/custom-title-page/CustomTitlePage';
import { jsonToFormData } from '../../components/formdata/FormData';
import modalError from '../../components/modal/Error';
import modalSuccess from '../../components/modal/Success';
import { addBooks, editBooks } from '../../store/book';
import BookForm from './BookForm';

AddEditBooks.propTypes = {

};
function AddEditBooks(props) {
    const nameTitleInitial = 'Thêm Sách';
    useDocTitle(nameTitleInitial);

    const history = useHistory();
    const { bookId } = useParams();
    const dispatch = useDispatch();

    const { books } = useSelector(state => state.book)
    const { dataSelect } = useSelector(state => state.select);

    const idArr = bookId && ConvertSearchToString(bookId)
    let id = idArr && idArr[0].number;
    const isAddMode = !id;

    let booksEdit = books.find(x => x.id === +id);


    const initialValues = isAddMode ? {
        name: '',
        code: '',
        unit_price: '',
        language: '',
        format: '',
        release_date: '',
        weight: '',
        size: '',
        translator: '',
        category_id: '',
        author_id: '',
        publisher_id: '',
        supplier_id: '',
        front_cover: '',
        back_cover: '',
        description: '',
        num_pages : '',
    } : {
        name: booksEdit ? booksEdit.name : '',
        code: booksEdit ? booksEdit.code : '',
        unit_price: booksEdit ? booksEdit.unit_price : '',
        language: booksEdit ? booksEdit.language : '',
        format: booksEdit ? booksEdit.format : '',
        release_date: booksEdit ? booksEdit.release_date : '',
        weight: booksEdit ? booksEdit.weight : '',
        size: booksEdit ? booksEdit.size : '',
        num_pages: booksEdit ? booksEdit.num_pages : '',
        translator: booksEdit ? booksEdit.translator : '',
        category_id: booksEdit ? Number(booksEdit.category.id) : '',
        author_id: booksEdit ? Number(booksEdit.author.id) : '',
        publisher_id: booksEdit ? Number(booksEdit.publisher.id) : '',
        supplier_id: booksEdit ? Number(booksEdit.supplier.id) : '',
        front_cover: booksEdit ? booksEdit.image.front_cover : '',
        back_cover: booksEdit ? booksEdit.image.back_cover : '',
        description: booksEdit ? booksEdit.description : '',
    }

    const handleSubmit = async (values) => {
        if (isAddMode) {
            try {
                const fd = jsonToFormData(values)
                const res = await bookApi.addBookApi(fd);
                dispatch(addBooks(res.data));
                modalSuccess(res.message);
                history.push('/books');
            } catch (error) {
                if (error.response.status === 422) {
                    const arrError = Object.keys(initialValues);
                    for (let i = 0; i < arrError.length; i++) {
                        if (error.response.data.errors[`${arrError[i]}`]) {
                            modalError(error.response.data.errors[`${arrError[i]}`]);
                        }
                    }
                }
                if (error.response.status === 500) {
                    modalError(error.response.data.message);
                }
            }
        } else {
            const formData = new FormData();
            if (values.front_cover.constructor === String && values.back_cover.constructor === String) {
                formData.append('name', values.name);
                formData.append('code', values.code);
                formData.append('unit_price', values.unit_price);
                formData.append('language', values.language);
                formData.append('format', values.format);
                formData.append('release_date', values.release_date);
                formData.append('weight', values.weight);
                formData.append('size', values.size);
                formData.append('num_pages', values.num_pages);
                formData.append('translator', values.translator);
                formData.append('category_id', Number(values.category_id));
                formData.append('author_id', Number(values.author_id));
                formData.append('publisher_id', Number(values.publisher_id));
                formData.append('supplier_id', Number(values.supplier_id));
                formData.append('description', values.description);
            } else if (values.front_cover.constructor === String) {
                formData.append('name', values.name);
                formData.append('code', values.code);
                formData.append('unit_price', values.unit_price);
                formData.append('language', values.language);
                formData.append('format', values.format);
                formData.append('release_date', values.release_date);
                formData.append('weight', values.weight);
                formData.append('size', values.size);
                formData.append('num_pages', values.num_pages);
                formData.append('translator', values.translator);
                formData.append('category_id', Number(values.category_id));
                formData.append('author_id', Number(values.author_id));
                formData.append('publisher_id', Number(values.publisher_id));
                formData.append('supplier_id', Number(values.supplier_id));
                formData.append('back_cover', values.back_cover);
                formData.append('description', values.description);
            } else if (values.back_cover.constructor === String) {
                formData.append('name', values.name);
                formData.append('code', values.code);
                formData.append('unit_price', values.unit_price);
                formData.append('language', values.language);
                formData.append('format', values.format);
                formData.append('release_date', values.release_date);
                formData.append('weight', values.weight);
                formData.append('size', values.size);
                formData.append('num_pages', values.num_pages);
                formData.append('translator', values.translator);
                formData.append('category_id', Number(values.category_id));
                formData.append('author_id', Number(values.author_id));
                formData.append('publisher_id', Number(values.publisher_id));
                formData.append('supplier_id', Number(values.supplier_id));
                formData.append('front_cover', values.front_cover);
                formData.append('description', values.description);
            } else {
                formData.append('name', values.name);
                formData.append('code', values.code);
                formData.append('unit_price', values.unit_price);
                formData.append('language', values.language);
                formData.append('format', values.format);
                formData.append('release_date', values.release_date);
                formData.append('weight', values.weight);
                formData.append('size', values.size);
                formData.append('num_pages', values.num_pages);
                formData.append('translator', values.translator);
                formData.append('category_id', Number(values.category_id));
                formData.append('author_id', Number(values.author_id));
                formData.append('publisher_id', Number(values.publisher_id));
                formData.append('supplier_id', Number(values.supplier_id));
                formData.append('front_cover', values.front_cover);
                formData.append('back_cover', values.back_cover);
                formData.append('description', values.description);
            }
            try {
                const res = await bookApi.editBookApi(formData, id);
                dispatch(editBooks(res.data));
                modalSuccess(res.message);
                history.push('/books');
            } catch (error) {
                if (error.response.status === 422) {
                    const arrError = Object.keys(initialValues);
                    for (let i = 0; i < arrError.length; i++) {
                        if (error.response.data.errors[`${arrError[i]}`]) {
                            modalError(error.response.data.errors[`${arrError[i]}`]);
                        }
                    }
                }
                if (error.response.status === 500) {
                    modalError(error.response.data.message);
                }
            }
        }

        // console.log(Object.fromEntries(a))
        // console.log("Submit",values)
    }

    return (
        <section className="home-section">
            <div className="container-fluid">
                <BookForm
                    handleSubmit={handleSubmit}
                    initialValues={initialValues}
                    dataSelect={dataSelect}
                />
            </div>


        </section>
    );
}

export default AddEditBooks;