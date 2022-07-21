import { filterSortingDto, filtertagsDto } from '../dtos/common.filter.dto';

type initialdataDto = {
  data?: any;
  isFecthing?: boolean;
  error?: string | null;
};

type filtersDto = {
  page?: number;
  search?: string;
  sorting?: filterSortingDto;
  tags?: Array<filtertagsDto | []>;
  customFilter?: object;
};

export const getInitialData = (value?: initialdataDto) => ({
  data: null,
  isFetching: false,
  error: null,
  ...value
});

export const getFilters = (defaultVal?: object, filters?: filtersDto) => ({
  page: 1,
  per_page: 5,
  search: '',
  s: '',
  sorting: {},
  tags: [],
  customFilter: {},
  default: defaultVal,
  ...filters
});
