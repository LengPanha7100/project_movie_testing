"use server";
import {getAllCategoriesServide, getAllMovieServie } from "@/service/MovieService";
import { Category } from "@/types/Movie";
type CategoryResponse = {
  payload: Category[];
}
export const getAllMovieAction = async () => {
  const res = await getAllMovieServie();
  console.log(res);
  return res;
};

export const getAllCategoriesAction = async (): Promise<CategoryResponse> => {
  const res = await getAllCategoriesServide();
  console.log(res);
  return res;
};

