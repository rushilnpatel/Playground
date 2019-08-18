export interface IPagination {
  from: number;
  to: number;
  length: number;
}

export interface IPaginatorConfig {
  pageIndex?: number;
  pageSize?: number;
}
