import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState:{
         count:0,
        wishlistItems:[],
        userId: localStorage.getItem("userId")
    },
    reducers:{
        addToWishlist:(state ,action)=>{
            state.count +=1
            state.wishlistItems.push(action.payload);  
        } ,
          toggleWishlist: (state, action) => {
      const exists = state.wishlistItems.includes(action.payload)
      if (exists) {
        state.wishlistItems = state.wishlistItems.filter(id => id !== action.payload)
        state.count -= 1  
      } else {
        state.wishlistItems.push(action.payload)
        state.count += 1  
      }
    },
    setWishlistCount:(state ,action)=>{
            state.count = action.payload;
          },
    setWishlistItems: (state, action) => {
      state.wishlistItems = action.payload
      state.count = action.payload.length 
    }
    }
})

export const { addToWishlist, toggleWishlist, setWishlistCount, setWishlistItems } = wishlistSlice.actions
export default wishlistSlice.reducer;