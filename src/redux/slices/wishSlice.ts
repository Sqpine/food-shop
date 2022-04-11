import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ProductsApi} from "../../API/woocommerce-get-prodructs";
import {ProductType} from "./productSlice";
import {WishListType} from "./localDataSlice";
import {RootState} from "../store";
import {setError} from "./appSlice";
import axios, {CancelToken} from "axios";


const initialState: WishPageType = {
    wishList: [],
    isFetching: true
}

export const wishSlice = createSlice({
    name: 'WishPage',
    initialState,
    reducers: {
        setWishList: (state, action: PayloadAction<{ wishList: ProductType[] }>) => {

            state.wishList = action.payload.wishList
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetWishListThunk.fulfilled,
            (state, {payload}) => {

                state.wishList = payload
                state.isFetching = false
            })
        builder.addCase(GetWishListThunk.pending,
            (state) => {

                state.isFetching = true
            })
        builder.addCase(RemoveWishListThunk.fulfilled,
            (state, {payload}) => {
                state.wishList = payload
            })
    }
})

// Action creators are generated for each case reducer function
export const {setWishList} = wishSlice.actions
export default wishSlice.reducer

export const GetWishListThunk =
    createAsyncThunk<ProductType[], GetWishListPayload, { state: RootState }>(
        'WishPage/GetWishListThunk',
        async function (payload,
                        {dispatch, rejectWithValue}) {
            try {
                return await Promise.all(payload.wishesId.map(wishesId => {
                    return ProductsApi.getProductById(wishesId.id,payload.cancelToken)
                        .then((products) => products.data);
                }))
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    dispatch(setError({error: error.message}))
                }
                return rejectWithValue(error)
            }
        }
    )
export const RemoveWishListThunk =
    createAsyncThunk<ProductType[], RemoveWishListPayload, { state: RootState }>(
        'WishPage/RemoveWishListThunk',
        async function (payload, {getState}) {

            const state = getState().WishPage.wishList
            return state.filter(e => {
                const s = payload.id.find(list => list.id === e.id)
                return s ? e : null
            })
        }
    )


export type WishPageType = {
    wishList: ProductType[]
    isFetching: boolean
}

type GetWishListPayload = { wishesId: WishListType[], cancelToken: CancelToken | undefined }
type RemoveWishListPayload = { id: WishListType[] }
