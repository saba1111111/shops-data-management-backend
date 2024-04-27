export interface IPageInfo {
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface IPaginationResult<M> {
  items: M[];
  pageInfo: IPageInfo;
}
