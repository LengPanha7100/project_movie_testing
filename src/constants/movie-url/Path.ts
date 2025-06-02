const Path = {
  movie: {
    list: (page: number, size: number) =>
      `http://34.87.39.167:9082/api/v1/movies?page=${page}&size=${size}`,
    categoryByName: (name: string, page: number, size: number): string => {
      return `http://34.87.39.167:9082/api/v1/movies/categories?${encodeURIComponent(
        name
      )}=Action&page=${page}&size=${size}`;
    },
  },
  category: {
    list: (page: number, size: number): string => {
      return `http://34.87.39.167:9082/api/v1/categories?page=${page}&size=${size}`;
    },
  },
};

export default Path;
