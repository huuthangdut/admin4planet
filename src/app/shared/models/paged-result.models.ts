export interface PagedResult<T> {
    items: T[];
    pageIndex: number;
    pageSize: number;
    totalItems: number;
    maxPage: number;
} 