import { ADD_TO_FAVOURITES } from "./constant";

export const addToFavourites = (movie: any) => ({
    type: ADD_TO_FAVOURITES,
    payload: movie,
  });


