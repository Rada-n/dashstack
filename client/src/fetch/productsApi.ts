import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import api from "../api/axiosInstance";

export interface Product {
    id: number
    name: string
    image: string
    category: string
    price: number
    rating: number
    reviews: number
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => 'products',
        })
    })
})
const { useGetProductsQuery } = productsApi


export const fetchProducts = createAsyncThunk('products/fetchProducts', 
    async () => {
        try{
            const response = await api.get('/api/products')
            return response.data
        } catch (e) {
            throw e
        }
    }
)

export const editProduct = createAsyncThunk('product/editProduct',
  async ({ id, formData }: { id: number; formData: FormData }) => {
        try {
            const response = await api.post(`api/update_product/${id}?_method=PUT`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            return response.data;
        } catch (error: any) {
            return error;
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (productId: number, { rejectWithValue }) => {
      try {
        await api.delete(`/api/delete_product/${productId}`);
        return productId;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message);
      }
    }
  );

  export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (productData: Product, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/new_product', productData)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
  )

  export const fetchFavourites = createAsyncThunk('products/fetchFavourites', 
    async () => {
        try {
            const response = await api.get('/api/favourites')
            return response.data.data
        } catch (e) {
            throw e
        }
    }
)

export const setLike = createAsyncThunk(
  'product/setLike',
  async (productId: number, { rejectWithValue }) => {
    try {
      const res = await api.post(`/api/like_product/${productId}`);
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const unsetLike = createAsyncThunk(
  'product/unsetLike',
  async (productId: number, { rejectWithValue }) => {
    try {
      await api.post(`/api/unlike_product/${productId}`);
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

  interface ProductsState {
    data: Product[]
    likedProducts: Product[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
  }

  const initialState: ProductsState =  {
    data: [],
    likedProducts: [],
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: '' as string | null
  }

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })

          .addCase(addProduct.pending, (state) => {
            state.status = 'l';
          })
          .addCase(addProduct.fulfilled, (state, action) => {
            state.data = [...state.data, action.payload]
            state.status = 'succeeded';
          })
          .addCase(addProduct.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })

          .addCase(editProduct.pending, (state) => {
            state.status = 'l';
          })
          .addCase(editProduct.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const updated = action.payload;
            if (Array.isArray(state.data)) {
              const index = state.data.findIndex(p => p.id === updated.id);
              if (index !== -1) state.data[index] = updated;
            }
          })
          
          .addCase(editProduct.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          })

          .addCase(deleteProduct.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteProduct.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = state.data.data.filter((product) => product.id !== action.payload);
          })
          .addCase(deleteProduct.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          })

          .addCase(fetchFavourites.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchFavourites.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.likedProducts = action.payload;
          })
          .addCase(fetchFavourites.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(setLike.fulfilled, (state, action) => {
            const product = action.payload;
            if (!state.likedProducts.some(p => p.id === product.id)) {
              state.likedProducts = [...state.likedProducts, product];
            }
          })                            
          .addCase(unsetLike.fulfilled, (state, action) => {
            state.likedProducts = state.likedProducts.filter(p => p.id !== action.payload);
          })
          
      },
});

export const productReducer = productsSlice.reducer;
export type {ProductsState}

