const Path = {
  movie: {
    list: (page: number, size: number) => `/movies?page=${page}&size=${size}`,
    categoryByName: (name: string, page: number, size: number): string => {
      return `/movies/categories?${encodeURIComponent(
        name
      )}=Action&page=${page}&size=${size}`;
    },
    getById: (id: number): string => {
      return `/movies/${id}`;
    },
    create: (): string => {
      return "/movies";
    },
    remove: (id: number): string => `/movies/${id}`,
    update: (id: number): string => {
      return `/movies/${id}`;
    },
  },
  category: {
    list: (page: number, size: number): string => {
      return `/categories?page=${page}&size=${size}`;
    },
  },

  cast: {
    list: (page: number, size: number): string => {
      return `/cast-members?page=${page}&size=${size}`;
    },
  },
  show: {
    create: (): string => {
      return "/shows";
    },
  },

  seat: {
    create: (): string => {
      return "/seats";
    },
  },

  booking: {
    register: (): string => {
      return `/bookings`;
    },
    list: (page: number, size: number): string => {
      return `/bookings?page=${page}&size=${size}`;
    },
    delete: (id: number): string => {
      return `/bookings/${id}`;
    },
    update: (id: number): string => {
      return `/bookings/${id}`;
    },
  },

  favorites: {
    create: (id: number): string => {
      return `movies/${id}/favorite`;
    },
  },

  auth: {
    registerMovie: (): string => {
      return `/auths/register`;
    },

    login: (): string => {
      return `/auths/login`;
    },
  },
};

export default Path;
