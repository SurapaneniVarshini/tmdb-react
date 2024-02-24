import { ADD_TO_FAVOURITES } from "../actions/constant";

const initialState = {
    favorites: [],
};

export const movieReducer = (state = initialState, action: {
    payload: any; type: any; data: any; 
}) => {
    switch(action.type) {
        case ADD_TO_FAVOURITES:
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
              };
        default:
            return [];
    }
}