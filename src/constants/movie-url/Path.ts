const Path = {
  movie: {
    list: (page: number, size: number) =>
      `http://34.87.39.167:9082/api/v1/movies?page=${page}&size=${size}`,
    categoryByName: (name: string, page: number, size: number): string => {
      return `http://34.87.39.167:9082/api/v1/movies/categories?${encodeURIComponent(
        name
      )}=Action&page=${page}&size=${size}`;
    },
    getById: (id: number): string => {
      return `http://34.87.39.167:9082/api/v1/movies/${id}`;
    },
  },
  category: {
    list: (page: number, size: number): string => {
      return `http://34.87.39.167:9082/api/v1/categories?page=${page}&size=${size}`;
    },
  },

  cast: {
    list: (page: number, size: number): string => {
      return `http://34.87.39.167:9082/api/v1/cast-members?page=${page}&size=${size}`;
    },
  },
  booking: {
    register: (): string => {
      return `http://34.87.39.167:9082/api/v1/bookings`;
    },
  },
};

export default Path;
