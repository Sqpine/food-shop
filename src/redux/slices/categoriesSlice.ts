import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CategoriesApi} from "../../API/woocommerce-get-categories";
import {setError} from "./appSlice";
import axios from "axios";

const initialState: initialStateType = {
    categories: [],
    isFetching: true,
}
export const GetCategoriesTnunk = createAsyncThunk<CategoriesType[], void>(
    'CategoriesList/GetCategoriesTnunk',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const categoriesData = await CategoriesApi.getCategories()
            return categoriesData.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                dispatch(setError({error: error.message}))
            } else {
                dispatch(setError({error: `Unexpected error ${error}`}))
            }
            return rejectWithValue(error)
        }
    }
)
export const categoriesSlice = createSlice({
    name: 'CategoriesList',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<{ categories: CategoriesType[] | [] }>) => {
            state.categories = action.payload.categories
        },
        setFetching: (state, action: PayloadAction<{ isFetching: boolean }>) => {
            state.isFetching = action.payload.isFetching
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetCategoriesTnunk.fulfilled, (state, {payload}) => {
            state.categories = payload
            state.isFetching = false
        })
        builder.addCase(GetCategoriesTnunk.pending, (state) => {
            state.isFetching = true
        })
    }
})

export const {setCategories, setFetching} = categoriesSlice.actions
export default categoriesSlice.reducer


export type CategoriesType = {
    count: number
    id: number
    name: string
    slug: string
    image: ImageType
}
type ImageType = {
    src: string
}
type initialStateType = {
    categories: CategoriesType[]
    isFetching: boolean
}
