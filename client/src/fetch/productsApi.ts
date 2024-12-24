import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

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
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
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
            const response = await axios.get('http://localhost:3001/products')
            return response.data
        } catch (e) {
            throw e
        }
    }
)

export const editProduct = createAsyncThunk('product/editProduct',
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:3003/products/${productData.id}`, productData)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (productId: number, { rejectWithValue }) => {
      try {
        await axios.delete(`http://localhost:3003/products/${productId}`);
        return productId;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message);
      }
    }
  );

  export const addProduct = createAsyncThunk(
    'product/addProfuct',
    async (productData: Product, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3003/products/', productData)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
  )

  interface ProductsState {
    data: Product[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
  }

  const initialState: ProductsState =  {
    data: [],
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
            state.status = 'loading';
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
            state.status = 'loading';
          })
          .addCase(editProduct.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = state.data.map((product) =>
              product.id === action.payload.id ? action.payload : product
            );
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
            state.data = state.data.filter((product) => product.id !== action.payload);
          })
          .addCase(deleteProduct.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          });
      },
});

export const productReducer = productsSlice.reducer;
export type {ProductsState}

