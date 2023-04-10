//pagination logic function
export const pagination = (arr, pageNumber = 1, perPage = 10) => {
    const perPagePagination = arr.slice((pageNumber - 1) * perPage, pageNumber * perPage);
    return perPagePagination;
}

//this function will take arr and id and return the matching data or undefined
export const findById = (arr, id) => {
    return arr.find((elem) => elem.id == id);
}

//this function will take arr and id and return the filter array or empty array / []
export const removeById = (arr, id) => {
    return arr.filter((elem) => elem.id != id);
}