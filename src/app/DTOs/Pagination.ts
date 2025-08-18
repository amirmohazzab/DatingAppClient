export interface Pagination{
    currentPage: number;
    totalPage: number;
    pageSize: number;
    totalCount: number
}

export class PaginationResult<T> implements Pagination{
  currentPage: number;
  totalPage: number;
  pageSize: number = 1;
  totalCount: number;
  items: T;
}