import {CategoriesType, ImageType} from "./productSlice";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductsApi} from "../../API/woocommerce-get-prodructs";
import {RootState} from "../store";
import {CartType} from "./localDataSlice";
import {setError} from "./appSlice";
import axios, {CancelToken} from "axios";

const initialState: initialStateType = {
    products: [],
    totalPrice: 0,
    isFetching: true
}

export const cartSlice = createSlice({
    name: 'CartPage',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<{ products: CartItemType[] }>) => {
            state.products = action.payload.products
        },
        setTotalPrice: (state, action: PayloadAction<{ totalPrice: number }>) => {
            state.totalPrice = action.payload.totalPrice
        },
        setFetching: (state, action: PayloadAction<{ isFetching: boolean }>) => {
            state.isFetching = action.payload.isFetching
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetAllCartProductsThunk.fulfilled,
            (state, {payload}) => {

                state.products = payload
                state.isFetching = false
            })
        builder.addCase(GetAllCartProductsThunk.pending,
            (state) => {

                state.isFetching = true
            })
        builder.addCase(UpdateProductsThunk.fulfilled,
            (state, {payload}) => {

                state.products = payload
            })
        builder.addCase(RemoveProductThunk.fulfilled,
            (state, {payload}) => {

                state.products = payload.products
                state.totalPrice = payload.totalPrice
            })
    }
})
export const {
    setFetching,
    setProducts,
    setTotalPrice
} = cartSlice.actions
export default cartSlice.reducer

export const GetAllCartProductsThunk =
    createAsyncThunk<CartItemType[], CancelToken | undefined, { state: RootState }>(

    'CartPage/GetAllCartProductsThunk',
    async ( cancelToken,
           {dispatch, getState, rejectWithValue}) => {
        try {
            const porductsId = getState().LocalData.cart

            const allPromiseResp = await Promise.all(porductsId.map(async productID => {
                const resp = await ProductsApi.getProductById(productID.id,cancelToken).then((products) => products.data);
                return {...resp, count: productID.count, subtotal: 0}
            }));

            const totalPrice = getState().CartPage.totalPrice
            const {products, currentTotalPrice} = setProductsCalculation(allPromiseResp)

            if (totalPrice !== currentTotalPrice) {
                dispatch(setTotalPrice({totalPrice: currentTotalPrice}))
            }
            return products

        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(setError({error: error.message}))
            }
            return rejectWithValue(error)
        }
    }
)

export const UpdateProductsThunk =
    createAsyncThunk<CartItemType[], CartType[] | CartItemType[], { state: RootState }>(

    'CartPage/UpdateProductsThunk',
    (cart,
     {dispatch, getState, rejectWithValue}) => {
        let {products, totalPrice} = getState().CartPage
        const {updateProducts, currentTotalPrice} = makeCalculation(cart, products)

        if (currentTotalPrice !== totalPrice) {
            dispatch(setTotalPrice({totalPrice: Math.floor(currentTotalPrice * 100) / 100}))
        }
        return updateProducts
    }
)

export const RemoveProductThunk =
    createAsyncThunk<RemoveProductType, CartType[] | CartItemType[], { state: RootState }>(

    'CartPage/RemoveProductThunk',
    (cart, {getState}) => {
        let {products} = getState().CartPage

        if (cart.length === 0) {
            return {
                products: [],
                totalPrice: 0
            }
        } else {

            let totalPrice = 0
            products = products.filter((e) => {
                const s = cart.find(product => product.id === e.id)

                if (s) {

                    totalPrice += e.subtotal
                    return e
                }
            })

            totalPrice = Math.floor(totalPrice * 100) / 100
            return {
                totalPrice,
                products
            }
        }
    }
)


function makeCalculation(cart: CartType[] | CartItemType[], products: CartItemType[]): MakeCalculationType {
    let totalPrice = 0
    if (products.length > 0) {
        products = cart.map((e, key) => {
            if (e.id === products[key].id) {
                const price = Math.floor(Number(products[key].price) * e.count * 100) / 100
                totalPrice += price
                if (e.count !== products[key].count) {
                    return {
                        ...products[key],
                        count: e.count,
                        subtotal: price,
                    }
                }
            }
            return products[key]
        })
        return {updateProducts: products, currentTotalPrice: totalPrice}
    }
    return {updateProducts: products, currentTotalPrice: totalPrice}
}


function setProductsCalculation(products: CartItemType[]): SetProductsCalculationType {
    let totalPrice: number = 0
    products = products.map(e => {
        const subtotal = Math.floor(Number(e.price) * e.count * 100) / 100
        totalPrice += subtotal

        return {
            ...e,
            subtotal: subtotal
        }
    })
    totalPrice = Math.floor(totalPrice * 100) / 100
    return {products, currentTotalPrice: totalPrice}
}

type MakeCalculationType = { updateProducts: CartItemType[], currentTotalPrice: number }
type SetProductsCalculationType = { products: CartItemType[], currentTotalPrice: number }

export type CartItemType = {
    id: number
    name: string
    slug: string
    description: string
    short_description: string
    price: string
    images: ImageType[]
    categories: CategoriesType[]
    subtotal: number
    count: number
}

type initialStateType = {
    products: CartItemType[]
    isFetching: boolean
    totalPrice: number
}
type RemoveProductType = {
    products: CartItemType[]
    totalPrice: number
}