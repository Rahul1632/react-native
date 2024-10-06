import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favoriteUsers: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favoriteUsers.push(action.payload);
        },
        removeFavorite: (state, action) => {
            const userId = action.payload;
            state.favoriteUsers = state.favoriteUsers.filter(user => user.id !== userId);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;


