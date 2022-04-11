import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {productSlice} from "./slices/productSlice";
import {categoriesSlice} from "./slices/categoriesSlice";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {localDataSlice} from "./slices/localDataSlice";
import {wishSlice} from "./slices/wishSlice";
import {cartSlice} from "./slices/cartSlice";
import {appSlice} from "./slices/appSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['LocalData']
}
const rootReducer = combineReducers({
    ProductPage: productSlice.reducer,
    CategoriesList: categoriesSlice.reducer,
    LocalData: localDataSlice.reducer,
    WishPage: wishSlice.reducer,
    CartPage: cartSlice.reducer,
    AppRoot: appSlice.reducer

})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    // middleware:(getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})
export let persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch