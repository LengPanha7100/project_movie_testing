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
  show: {
    create: (): string => {
      return "http://34.87.39.167:9082/api/v1/shows";
    },
  },

  seat: {
    create: (): string => {
      return "http://34.87.39.167:9082/api/v1/seats";
    },
  },

  booking: {
    register: (): string => {
      return `http://34.87.39.167:9082/api/v1/bookings`;
    },
    list: (page: number, size: number): string => {
      return `http://34.87.39.167:9082/api/v1/bookings?page=${page}&size=${size}`;
    },
    delete: (id: number): string => {
      return `http://34.87.39.167:9082/api/v1/bookings/${id}`;
    },
    update: (id: number): string => {
      return `http://34.87.39.167:9082/api/v1/bookings/${id}`;
    },
  },

  favorites: {
    update: (id: number, status: boolean): string => {
      return `http://34.87.39.167:9082/api/v1/movies/${id}/favorite?status=${status}`;
    },
  },

  auth: {
    registerMovie: (): string => {
      return `http://34.87.39.167:9083/api/v1/auths/register`;
    },

    login: (): string => {
      return `http://34.87.39.167:9083/api/v1/auths/login`;
    },
  },
};

export default Path;
