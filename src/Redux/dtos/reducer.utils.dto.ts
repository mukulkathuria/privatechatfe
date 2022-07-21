import { filterSortingDto, filtertagsDto } from './common.filter.dto';

export type initialdataDto = {
  data?: any;
  isFecthing?: boolean;
  error?: string | null;
};

export type filtersDto = {
  page?: number;
  search?: string;
  sorting?: filterSortingDto;
  tags?: Array<filtertagsDto | []>;
  customFilter?: any;
  default?: object;
};

export type customFilterDto = {
  customFilter: object;
};
