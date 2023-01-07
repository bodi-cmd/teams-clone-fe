const QueryBuilder = ({ sortOption, filterOption, searchOption, page, limit }) => {
    //?page=0&sort=byDateDesc&limit=3&filter=used_true
    let url = `?page=${page}&limit=${limit}`;
    if (sortOption) {
      url += `&sort=${sortOption}`;
    }
    if (filterOption && filterOption.length) {
      url += `&filter=${filterOption}`;
    }
    if (searchOption && searchOption.length) {
      url += `&search=${searchOption}`;
    }
    return url;
  };

export default QueryBuilder