import { configureStore, createSlice } from '@reduxjs/toolkit';
import { flightDataSlice } from './flights/flightSlice';
import { combineReducers } from 'redux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage


const dataSlice = createSlice({
    name: 'data',
    initialState: {
        value: null,
    },
    reducers: {
        setData: (state, action) => {
            state.value = action.payload;
        },
        clearData: (state) => {
            state.value = null;
        },
    },
});

export const { setData, clearData } = dataSlice.actions;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['flightData', 'hotelData']
};

const flightDataPersistConfig = {
    key: 'flightData',
    storage,
    whitelist: ['searchParamsData'], // Only persist searchParamsData
};

const hotelDataPersistConfig = {
    key: 'hotelData',
    storage,
    whitelist: ['searchParamsData', 'hotels']
};

const rootReducer = combineReducers({
    data: dataSlice.reducer,
    flightData: persistReducer(flightDataPersistConfig, flightDataSlice.reducer),// Apply persist to just flightData
    // hotelData: persistReducer(hotelDataPersistConfig, hotelDataSlice.reducer) // ✅ wrap with persist

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,

        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export const persistor = persistStore(store);
export default store;
