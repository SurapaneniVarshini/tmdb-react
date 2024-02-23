import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from "./constant";

export const addToFavourites = (data: any) => {
    console.warn('added to the favourites', data);
    return {
        type: ADD_TO_FAVOURITES,
        data
    }
}

export const removeFromFavourites = (data: any) => {
    console.warn('removed from the favourites', data);
    return {
        type: REMOVE_FROM_FAVOURITES,
        data
    }
}

