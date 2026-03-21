import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROUTES } from '../utils/Apiroutes'

export const addToCartAsync = createAsyncThunk("cart/addToCartAsync",async ({ productId, userId }) => {
    const res = await axios.post(API_ROUTES.POST_ALL_CART, { productId, userId });
    return res.data.cartItem;
  }
);

const cartSlice = createSlice({
    name:"cart",

    initialState:{
        count:0,
        item:[]
    },

    reducers:{
            addToCart:(state ,action)=>{
             const exists = state.item.find(item => item._id === action.payload._id && item.variant?.color === action.payload.variant?.color)
             if(!exists){
              state.item.push({...action.payload,quantity:1}) 
              state.count += 1
            }else{
              exists.quantity +=1
            }
        },
        setCartCount:(state ,action)=>{
        state.count = action.payload;
      }
    },
     extraReducers: (builder) => {
    builder
    .addCase(addToCartAsync.fulfilled, (state, action) => {
      state.count += 1;
      state.item.push(action.payload);
    })
  }
})
export const {addToCart,setCartCount}= cartSlice.actions
export default cartSlice.reducer
