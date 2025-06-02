import { Category } from "@/types/Movie";

type CategoryResponse = {
  payload: Category[];
};
export const getAllMovieServie = async () => {
  const res = await fetch(
    `http://34.87.39.167:9082/api/v1/movies?page=1&size=1000000`
  );
  const data = res.json();
  console.log(data);
  return data;
};

export const getAllCategoriesServide = async (): Promise<CategoryResponse> => {
  const res = await fetch(
    `http://34.87.39.167:9082/api/v1/categories?page=1&size=1000000`
  );
  const data = await res.json();
  return data;
};
