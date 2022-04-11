import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ProductsApi} from "../../API/woocommerce-get-prodructs";
import {RootState} from "../store";
import {setError} from "./appSlice";
import axios, {CancelToken} from "axios";

const initialState: ProductPageType = {
    products: [],
    isFetching: true
}
type GetProductsPayload = {
    cancelToken: CancelToken | undefined
    id: number | string
}
export const GetProductsThunk =
    createAsyncThunk<ProductType[], GetProductsPayload, { state: RootState }>(
        'ProductPage/GetProductsThunk',
        async function (payload,
                        {getState, dispatch, rejectWithValue}) {
            try {
                const categories = getState().CategoriesList.categories
                const correctSearch = categories.find(e => e.slug === payload.id)

                if (correctSearch?.id) {
                    const products = await ProductsApi.getProductsByCategory(correctSearch.id, payload.cancelToken)
                    return products.data
                }
                return []
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    dispatch(setError({error: error.message}))
                }
                return rejectWithValue(error)
            }
        }
    )
export const productSlice = createSlice({
    name: 'ProductPage',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<{ products: ProductType[] | [] }>) => {
            state.products = action.payload.products
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetProductsThunk.fulfilled, (state, {payload}) => {
            state.products = payload
            state.isFetching = false
        })
        builder.addCase(GetProductsThunk.pending, (state) => {
            state.isFetching = true
        })
    }
})

// Action creators are generated for each case reducer function
export const {setProducts} = productSlice.actions
export default productSlice.reducer

export type ImageType = {
    src: string
}
export type CategoriesType = {
    name: string
}
export type ProductType = {
    id: number
    name: string
    slug: string
    description: string
    short_description: string
    price: string
    images: ImageType[]
    categories: CategoriesType[]
}
export type ProductPageType = {
    products: ProductType[]
    isFetching: boolean
}