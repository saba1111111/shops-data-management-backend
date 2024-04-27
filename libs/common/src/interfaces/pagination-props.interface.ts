import { SortProps } from '../enums';

export interface IPaginationProps {
  page: number;
  itemsPerPage: number;
  fields?: string[];
  sort?: [[string, SortProps]];
}
