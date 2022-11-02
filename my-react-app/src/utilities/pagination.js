export default class Pagination {
    constructor(){
        this.CurrentPage = 1;
    }

    pageCount(recCount, recPerPage){
        return parseInt(recCount/recPerPage); 
    }
}