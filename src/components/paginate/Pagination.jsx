import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { DOTS, usePagination } from './usePagination';

Pagination.propTypes = {};

function Pagination(props) {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        title,
        setTitle
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    let { path } = useRouteMatch();

    if (currentPage === 0) {
        return null;
    }
    // thay đổi trang số
    const handlePageChange = (pageNumber) => {
        onPageChange(pageNumber)
        setTitle(`Trang ${pageNumber} - ${title}`)
    }

    // trang sau
    const onNext = () => {
        onPageChange(currentPage + 1);
        setTitle(`Trang ${currentPage + 1} - ${title}`)
    };

    // trang trước
    const onPrevious = () => {
        onPageChange(currentPage - 1);
        setTitle(`Trang ${currentPage - 1} - ${title}`)
    };

    // trở về cuối trang
    const returnLastPage = (lastPage) => {
        onPageChange(lastPage);
        setTitle(`Trang ${lastPage} - ${title}`)
    }

    // trở về đầu trang
    const returnFirstPage = (firstPage) => {
        onPageChange(firstPage);
        setTitle(`Trang ${firstPage} - ${title}`)
    }

    //lấy trang cuối
    let lastPage = paginationRange[paginationRange.length - 1];

    return (
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {currentPage <= lastPage ?
                        <li className={currentPage === 1 ? "page-item disabled cur-pointer" : "page-item"} onClick={onPrevious}>
                            <Link to={`${path}/?page=${currentPage - 1}`} className="page-link" >
                                <span aria-hidden="true">&laquo;</span>
                            </Link>
                        </li>
                        : null
                    }
                    {paginationRange.map((pageNumber, index) => {
                        if (pageNumber === DOTS) {
                            return currentPage <= lastPage ?
                                <li key={index} className="page-item">
                                    <span to="#" className="page-link" >&#8230;</span>
                                </li> : null;
                        }
                        return (
                            currentPage <= lastPage ?
                                <li key={index} className={pageNumber === currentPage ? "page-item active" : "page-item"} onClick={() => handlePageChange(pageNumber)}>
                                    <Link to={`${path}/?page=${pageNumber}`} className="page-link" >{pageNumber}</Link>
                                </li> : null
                        );
                    })}
                    {currentPage <= lastPage ?
                        <li className={currentPage === lastPage ? "page-item disabled cur-pointer" : "page-item"} onClick={onNext}>
                            <Link to={`${path}/?page=${currentPage + 1}`} className="page-link" >
                                <span aria-hidden="true">&raquo;</span>
                            </Link>
                        </li> : null
                    }
                    {currentPage > lastPage ?
                        <>
                            <li className="page-item" onClick={() => returnFirstPage(1)}>
                                <Link className="page-link" to={`${path}/?page=1`} aria-label="Previous">
                                    Về trang đầu
                                </Link>
                            </li>
                            <li className="page-item"><span className="page-link" href="#">Trang {currentPage}/{lastPage}</span></li>
                            <li className="page-item" onClick={() => returnLastPage(lastPage)}>
                                <Link to={`${path}/?page=${lastPage}`} className="page-link" aria-label="Next">
                                    Về trang cuối
                                </Link>
                            </li>
                        </>
                        :
                        null
                    }
                </ul>
            </nav>

    );
}

export default Pagination;