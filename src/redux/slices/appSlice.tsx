import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialStatyType = {
    error: string
}
const initialState: InitialStatyType = {
    error: ''
}

export const appSlice = createSlice({
    name: 'AppRoot',
    initialState,
    reducers: {
        setError: (state = initialState, action: PayloadAction<{ error: string }>) => {
            state.error = action.payload.error
        }
    }
})

export const {setError} = appSlice.actions
export default appSlice.reducer