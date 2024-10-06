import { configureStore } from '@reduxjs/toolkit';
import favoritesSlice from './favoriteSlice';

const store = configureStore({
    reducer: {
        favorites: favoritesSlice,
    },
});

export default store;
