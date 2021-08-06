import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import bookApi from '../../api/bookApi';
import listDataAddBookApi from '../../api/listDataAddBookApi';
import { ConvertSearchToString } from '../../components/convert-url/ConvertSearchToString';
import { useDocTitle } from '../../components/custom-title-page/CustomTitlePage';
import { jsonToFormData } from '../../components/formdata/FormData';
import modalError from '../../components/modal/Error';
import modalSuccess from '../../components/modal/Success';
import { setDataSelect, setLoadingData } from '../../store/select';
import BookForm from './BookForm';

AddEditBooks.propTypes = {

};
function AddEditBooks(props) {
    const nameTitleInitial = 'Thêm Sách';
    const [, setDocTitle] = useDocTitle(nameTitleInitial);

    //load data lên store
    useEffect(() => {
        async function LoadData() {
            try {
                const res = await listDataAddBookApi.getAll();
                dispatch(setDataSelect(res.data))
                dispatch(setLoadingData(false))
            } catch (error) {
                console.error(error)
            }
        }
        LoadData();
        // eslint-disable-next-line
    }, []);

    const dispatch = useDispatch();
    const history = useHistory();
    const { bookId } = useParams();

    const idArr = bookId && ConvertSearchToString(bookId)
    let id = idArr && idArr[0].number;
    const isAddMode = !id;

    // const editedBook = useSelector(state => {
    //     const foundPhoto = state.book.find(x => x.id === +id);
    //     return foundPhoto;
    //   });

    const { books } = useSelector(state => state.book)
    // const booksEdit = books.find(x => x.id === id);
    // console.log(books)

    const { dataSelect } = useSelector(state => state.select);

    const initialValues = {
        name: '',
        code: '',
        unit_price: '',
        language: '',
        format: '',
        release_date: '',
        weight: '',
        size: '',
        num_pages: '',
        translator: '',
        category_id: '',
        author_id: '',
        publisher_id: '',
        supplier_id: '',
        front_cover: '',
        back_cover: '',
        description: '',
    }
    // const initialValues = {
    //     name: 'Lì Quá Để Nói Hoài',
    //     code: '#937329048',
    //     unit_price: 169000,
    //     language: 'Tiếng Việt',
    //     format: 'Bìa Cứng',
    //     release_date: 2018,
    //     weight: 350,
    //     size: '12 cm x 34 cm',
    //     num_pages: 99,
    //     translator: '',
    //     category_id: 2,
    //     author_id: 1,
    //     publisher_id: 3,
    //     supplier_id: 1,
    //     front_cover: null,
    //     back_cover: null,
    //     description: '',
    // }
    const handleSubmit = async (values) => {
        try {
            const fd = jsonToFormData(values)
            const res = await bookApi.addBookApi(fd);
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