import PropTypes from 'prop-types';

ConvertSearchToString.propTypes = {
    url: PropTypes.string,
};
ConvertSearchToString.defaultProps = {
    url: '',
}

export function ConvertSearchToString(url) {

    // ---category/page-1.html---
    let arrResult = [];
    // cắt chuỗi với dấu
    const arString = url.split('/'); // category,page-1.html

    // lấy phần tử cuối 
    const arLastAray = arString.slice(-1)[0]; //page-1.html

    // cắt chuỗi bỏ đi .html
    const arCutHtml = arLastAray.split('.'); //page-1,html

    // lấy phần tử đầu
    const getArrFirst = arCutHtml.slice(0, 1)[0]; // page-1

    // cắt chuỗi với dấu -
    const setArrLast = getArrFirst.split('-'); //page,1 

    // lấy số trang
    arrResult.push(
        {
            number: setArrLast.slice(-1)[0]
        }
    );  // 1

    // lấy từ "page" trên url
    arrResult.push(
        {
            title: setArrLast.slice(0, 1)[0]
        }
    ); // page

    return arrResult;
}