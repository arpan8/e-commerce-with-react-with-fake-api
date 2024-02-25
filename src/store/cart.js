import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        storeCartItems: (state, action)=> {
            state.cartItems = action.payload.getProductsWithcarts
            state.amount = action.payload.totalCart
        }
    }
})

export const { storeCartItems } = cartSlice.actions

export default cartSlice.reducer