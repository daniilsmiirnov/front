    import { configureStore } from '@reduxjs/toolkit';
    import userReducer from './UserSlice'
    // импортируйте ваши срезы (slices) здесь
    // import someSlice from './slices/someSlice';
    export type RootState = ReturnType<typeof store.getState>;
    const store = configureStore({
    reducer: {

        user:userReducer,

    },
    });

    export default store;
