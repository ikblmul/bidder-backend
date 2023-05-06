import { PaginateResult } from "../interfaces/dao/helper";

interface paginateHelperParam<T> {
  data: T[];
  total: number;
  filterTotal: number;
  limit: number;
  page: number;
}

const paginateHelper = <T>({
  data,
  filterTotal,
  limit,
  page,
  total,
}: paginateHelperParam<T>): PaginateResult<T> => {
  const totalPage = Math.ceil(filterTotal / limit);

  return {
    currentPage: page,
    lastPage: totalPage,
    total,
    filterTotal,
    data,
    limit,
  };
};
export default paginateHelper;
