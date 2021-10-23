import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import bookApi from "../../api/bookApi";
import imageApi from "../../api/imageApi";
import { ConvertSearchToString } from "../../components/convert-url/ConvertSearchToString";
import { useDocTitle } from "../../components/custom-title-page/CustomTitlePage";
import modalError from "../../components/modal/Error";
import modalSuccess from "../../components/modal/Success";
import { addBooks, editBooks } from "../../store/book";
import BookForm from "./BookForm";

AddEditBooks.propTypes = {};
function AddEditBooks(props) {
  const nameTitleInitial = "Thêm Sách";
  useDocTitle(nameTitleInitial);

  const history = useHistory();
  const { bookId } = useParams();
  const dispatch = useDispatch();

  const { books } = useSelector((state) => state.book);
  const { dataSelect } = useSelector((state) => state.select);

  const idArr = bookId && ConvertSearchToString(bookId);
  let id = idArr && idArr[0].number;
  const isAddMode = !id;

  let booksEdit = books.find((x) => x.id === +id);

  const initialValues = isAddMode
    ? {
        name: "",
        code: "",
        unit_price: "",
        language: "",
        format: "",
        release_date: "",
        weight: "",
        size: "",
        translator: "",
        category_id: "",
        author_id: "",
        publisher_id: "",
        supplier_id: "",
        front_cover: "",
        back_cover: "",
        description: "",
        num_pages: "",
      }
    : {
        name: booksEdit ? booksEdit.name : "",
        code: booksEdit ? booksEdit.code : "",
        unit_price: booksEdit ? booksEdit.unit_price : "",
        language: booksEdit ? booksEdit.language : "",
        format: booksEdit ? booksEdit.format : "",
        release_date: booksEdit ? booksEdit.release_date : "",
        weight: booksEdit ? booksEdit.weight : "",
        size: booksEdit ? booksEdit.size : "",
        num_pages: booksEdit ? booksEdit.num_pages : "",
        translator: booksEdit ? booksEdit.translator : "",
        category_id: booksEdit ? Number(booksEdit.category.id) : "",
        author_id: booksEdit ? Number(booksEdit.author.id) : "",
        publisher_id: booksEdit ? Number(booksEdit.publisher.id) : "",
        supplier_id: booksEdit ? Number(booksEdit.supplier.id) : "",
        front_cover: booksEdit ? booksEdit.image.front_cover : "",
        back_cover: booksEdit ? booksEdit.image.back_cover : "",
        description: booksEdit ? booksEdit.description : "",
      };

  const isFile = (input) => "File" in window && input instanceof File;

  const handleSubmit = async (values) => {
    if (isAddMode) {
      try {
        let ImageFront = "";
        let ImageBack = "";
        try {
          let resImageFront = await imageApi.addImageApi(values.front_cover, 3);
          ImageFront = resImageFront.data;
          await new Promise((r) => setTimeout(r, 1000));
          let resImageBack = await imageApi.addImageApi(values.back_cover, 3);
          ImageBack = resImageBack.data;
        } catch (error) {
          if (error.response.status === 422) {
            modalError(error.response.data.errors["image"]);
          }
        }
        let arr = {
          name: values.name,
          code: values.code,
          unit_price: values.unit_price,
          language: values.language,
          format: values.format,
          release_date: values.release_date,
          weight: values.weight,
          size: values.size,
          translator: values.translator,
          category_id: Number(values.category_id),
          author_id: Number(values.author_id),
          publisher_id: Number(values.publisher_id),
          supplier_id: Number(values.supplier_id),
          front_cover: ImageFront,
          back_cover: ImageBack,
          description: values.description,
          num_pages: values.num_pages,
        };
        const res = await bookApi.addBookApi(arr);
        dispatch(addBooks(res.data));
        modalSuccess(res.message);
        await new Promise((r) => setTimeout(r, 500));
        history.push("/books");
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
      try {
        let ImageFront = "";
        let ImageBack = "";
        if (!isFile(values.front_cover) && !isFile(values.back_cover)) {
          ImageFront = values.front_cover;
          ImageBack = values.back_cover;
        } else if (isFile(values.front_cover) && isFile(values.back_cover)) {
          try {
            let resImageFront = await imageApi.addImageApi(
              values.front_cover,
              3
            );
            ImageFront = resImageFront.data;
            await new Promise((r) => setTimeout(r, 1000));
            let resImageBack = await imageApi.addImageApi(values.back_cover, 3);
            ImageBack = resImageBack.data;
          } catch (error) {
            if (error.response.status === 422) {
              modalError(error.response.data.errors["image"]);
            }
          }
        } else if (isFile(values.front_cover)) {
          try {
            let resImageFront = await imageApi.addImageApi(
              values.front_cover,
              3
            );
            ImageFront = resImageFront.data;
            ImageBack = values.back_cover;
          } catch (error) {
            if (error.response.status === 422) {
              modalError(error.response.data.errors["image"]);
            }
          }
        } else if (isFile(values.back_cover)) {
          try {
            let resImageBack = await imageApi.addImageApi(values.back_cover, 3);
            ImageBack = resImageBack.data;
            ImageFront = values.front_cover;
          } catch (error) {
            if (error.response.status === 422) {
              modalError(error.response.data.errors["image"]);
            }
          }
        }
        let arr = {
          name: values.name,
          code: values.code,
          unit_price: values.unit_price,
          language: values.language,
          format: values.format,
          release_date: values.release_date,
          weight: values.weight,
          size: values.size,
          translator: values.translator,
          category_id: Number(values.category_id),
          author_id: Number(values.author_id),
          publisher_id: Number(values.publisher_id),
          supplier_id: Number(values.supplier_id),
          front_cover: ImageFront,
          back_cover: ImageBack,
          description: values.description,
          num_pages: values.num_pages,
        };
        const res = await bookApi.editBookApi(arr, id);
        dispatch(editBooks(res.data));
        modalSuccess(res.message);
        await new Promise((r) => setTimeout(r, 500));
        history.push("/books");
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
  };

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
