import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: initialStateType = {
    wishList: [],
    cart: []
}
export const localDataSlice = createSlice({
    name: 'LocalData',
    initialState,
    reducers: {
        setItemInCart: (state, action: PayloadAction<{ products: [] }>) => {
            state.cart = action.payload.products
        },
        addItemInCart: (state, action: PayloadAction<{ id: number, count: number }>) => {

            const index = state.cart.findIndex(e => action.payload.id === e.id)
            if (index > -1) {
                if (state.cart[index].count !== action.payload.count) {
                    state.cart[index] = action.payload
                }
            } else state.cart = [action.payload, ...state.cart]

        },
        removeItemInCart: (state, action: PayloadAction<{ id: number }>) => {

            state.cart = state.cart.filter(e => action.payload.id !== e.id)
        },
        addWish: (state, action: PayloadAction<{ id: number }>) => {

            const index = state.wishList.findIndex(e => action.payload.id === e.id)
            if (index === -1) {
                state.wishList = [action.payload, ...state.wishList]
            }
        },
        removeWish: (state, action: PayloadAction<{ wishListId: number }>) => {

            const index = state.cart.findIndex(e => action.payload.wishListId === e.id)
            if (index > -1) {
                state.wishList.splice(index, 1)
            }
            state.wishList = state.wishList.filter(e => e.id !== action.payload.wishListId)
        }
    }
})
export const {
    addWish,
    removeWish,
    addItemInCart,
    removeItemInCart,
    setItemInCart} = localDataSlice.actions
export default localDataSlice.reducer

export type CartType = {
    id: number
    count: number
}
export type WishListType = {
    id: number
}
export type initialStateType = {
    wishList: WishListType[]
    cart: CartType[]
}
