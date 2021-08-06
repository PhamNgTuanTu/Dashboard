import queryString from 'query-string';

export function GetPageFromUrl(urlSearch) {

    if (urlSearch) {
        const urlSearchParse = queryString.parse(urlSearch);
        if (urlSearchParse.page) {
            const arrString = urlSearchParse.page.split('.');
            const urlNumberSearch = arrString[0];
            if (!isNaN(urlNumberSearch)) {
                return urlNumberSearch;
            }
        }
    }
}