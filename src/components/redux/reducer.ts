import { ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from "./constant";

export const filmData = (data = [], action) => {
    switch(action.type) {
        case ADD_TO_FAVOURITES:
            console.warn("ADD_TO_FAVOURITES condition", action);
            return [action.data, ...data];
        case REMOVE_FROM_FAVOURITES:
            console.warn("REMOVE_FROM_FAVOURITES condition", action);
            const remainingMovies = data.filter((item) => item.id!==action.data);
            return [...remainingMovies];
        default:
            return [];
    }
}