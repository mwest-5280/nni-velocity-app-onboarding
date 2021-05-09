export interface PaginatedData<T> {
  data: T[];
  paging: Paging;
}

export interface Paging {
  rows?: number;
  offset: number;
  links: {
    first: string;
    last: string;
    previous?: string;
    next?: string;
  };
}
