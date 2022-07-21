import { filtertagsDto } from '../dtos/common.filter.dto';
import { filtersDto, initialdataDto } from '../dtos/reducer.utils.dto';
import {
  DATA_ERROR_OCCURED,
  DATA_ISFETCHING,
  DATA_SUCCEED,
  FILTER_SEARCH,
  FILTER_SORTING,
  FILTER_PAGE,
  FILTER_REMOVE_CUSTOM,
  FILTER_ROW_PER_PAGE,
  FILTER_RESET_FILTER,
  FILTER_ADD_CUSTOM,
  FILTER_SEARCH_S
} from '../types/reducer.default';

export const getReducerData = (
  action: string,
  state: initialdataDto,
  data: any
) => {
  switch (action) {
    case DATA_ISFETCHING:
      return {
        ...state,
        isFetching: true
      };
    case DATA_SUCCEED:
      return {
        ...state,
        isFetching: false,
        error: null,
        data
      };
    case DATA_ERROR_OCCURED:
      return {
        ...state,
        isFetching: false,
        error: data
      };
    default:
      return state;
  }
};

export function getUpdatedFilterObject(updatedVal: filtersDto) {
  let result = {};
  if (updatedVal.page) {
    result = {
      ...result,
      page: updatedVal.page
    };
  }
  if (updatedVal.default && Object.keys(updatedVal.default).length > 0) {
    result = {
      ...result,
      ...updatedVal.default
    };
  }
  if (
    // eslint-disable-next-line operator-linebreak
    updatedVal.customFilter &&
    Object.keys(updatedVal.customFilter).length > 0
  ) {
    result = {
      ...result,
      ...updatedVal.customFilter
    };
  }
  if (updatedVal.sorting && Object.keys(updatedVal.sorting).length > 0) {
    result = {
      ...result,
      ...updatedVal.sorting
    };
  }
  if (updatedVal.search && updatedVal.search.length > 0) {
    result = {
      ...result,
      search: updatedVal.search
    };
  }
  return result;
}

const overwriteDuplicateTag = (
  Objtag: Array<filtertagsDto>,
  tag: filtertagsDto
) => {
  const result = Objtag;
  for (let i = 0; i < Objtag.length; i += 1) {
    if (Objtag[i].id === tag.id) {
      result[i] = tag;
    }
  }
  return result;
};

const addFilter = (obj: any, filter: any, tag: filtertagsDto) => {
  let flag = 0;
  // eslint-disable-next-line
  const filterVal = Object.keys(filter);
  const mainObj = Object.keys(obj.customFilter);
  for (let i = 0; i < mainObj.length; i += 1) {
    for (let j = 0; j < filterVal.length; j += 1) {
      if (mainObj[i] === filterVal[j]) {
        if (
          // eslint-disable-next-line operator-linebreak
          (obj.customFilter[mainObj[i]] >= 0 && filter[filterVal[j]] >= 0) ||
          typeof filter[filterVal[j]] === 'string'
        ) {
          if (obj.customFilter[mainObj[i]] !== filter[filterVal[j]]) {
            return {
              ...obj,
              customFilter: { ...obj.customFilter, ...filter },
              tags: overwriteDuplicateTag(obj.tags, tag),
              page: 1
            };
          }
        }
      }
    }
  }
  for (let i = 0; i < obj.tags.length; i += 1) {
    if (obj.tags[i].id === tag.id) {
      flag = 1;
    }
  }
  if (flag === 1) {
    return {
      ...obj
    };
  }
  const result = {
    ...obj,
    customFilter: { ...obj.customFilter, ...filter },
    tags: [...obj.tags, tag],
    page: 1
  };
  return result;
};

const removeFilter = (obj: filtersDto, tag: filtertagsDto) => {
  const updatedVal = {
    ...obj.customFilter
  };
  const allfilters = tag.filter?.split(',');
  for (let i = 0; i < allfilters.length; i += 1) {
    if (updatedVal[allfilters[i]]) {
      delete updatedVal[allfilters[i]];
    }
  }
  if (tag.connetor) {
    delete updatedVal[tag.connetor];
  }
  const result = {
    ...obj,
    customFilter: updatedVal,
    tags: obj?.tags?.filter((wod: any) => wod.id !== tag.id),
    page: 1
  };
  return result;
};

export const getFilterData = (state: filtersDto, type: string, data: any) => {
  switch (type) {
    case FILTER_PAGE:
      return {
        ...state,
        page: data
      };
    case FILTER_ROW_PER_PAGE:
      return {
        ...state,
        per_page: data
      };
    case FILTER_SEARCH:
      return {
        ...state,
        search: data,
        page: 1
      };
    case FILTER_SEARCH_S:
      return {
        ...state,
        s: data,
        page: 1
      };
    case FILTER_SORTING: {
      const getdata = () => {
        switch (data) {
          case state?.sorting?.sort_name: {
            const getSortby = () => {
              switch (state.sorting?.sort_by) {
                case 'asc':
                  return {
                    ...state,
                    sorting: { ...state.sorting, sort_by: 'desc' }
                  };
                case 'desc':
                  return {
                    ...state,
                    sorting: { ...state.sorting, sort_by: 'asc' }
                  };
                default:
                  return { ...state };
              }
            };
            return getSortby();
          }
          default:
            return {
              ...state,
              sorting: {
                sort_name: data,
                sort_by: 'asc'
              }
            };
        }
      };
      return getdata();
    }
    case FILTER_ADD_CUSTOM:
      return addFilter(state, data[0], data[1]);
    case FILTER_REMOVE_CUSTOM:
      return removeFilter(state, data);
    case FILTER_RESET_FILTER:
      return {
        ...state,
        customFilter: {},
        tags: [],
        search: '',
        sorting: {},
        page: 1,
        per_page: 5
      };
    default:
      return state;
  }
};
