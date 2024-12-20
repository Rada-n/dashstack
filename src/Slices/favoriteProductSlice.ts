import { createSlice } from "@reduxjs/toolkit";

interface FavoriteProductsState {
    likedProducts: { [id: number]: boolean}
}

const initialState: FavoriteProductsState = {
  likedProducts: JSON.parse(localStorage.getItem('likedProducts') || '{}'),
};

const favoriteProductSlice = createSlice({
  name: "favoriteProducts",
  initialState,
  reducers: {
    toggleLike(state, action) {
      const productId = action.payload;
      state.likedProducts[productId] = !state.likedProducts[productId]
      localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts))
    },
  },
});

export const favoriteProductReduce = favoriteProductSlice.reducer;
export const favoriteProductActions = favoriteProductSlice.actions;
export type { FavoriteProductsState };
export type FavoriteProductActions = typeof favoriteProductActions;
