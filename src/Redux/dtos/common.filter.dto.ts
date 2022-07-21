export type filtertagsDto = {
  id: string | number;
  label: string;
  filter: string;
  connetor?: string;
};

export type filterSortingDto = {
  sort_by: string;
  sort_name: string;
};

export type actionDto = {
  type: string;
  subType?: string;
  payload: any;
};
