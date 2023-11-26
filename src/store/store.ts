    import { configureStore } from '@reduxjs/toolkit';
    import userReducer from './UserSlice'
    import draftcartReducer from './DraftCartSlice'
    import expeditionsReducer from './ExpeditionSlice';
    //@ts-ignore
    const shouldEnableDevTools = process.env.NODE_ENV !== 'production';
    export type RootState = ReturnType<typeof store.getState>;
    const store = configureStore({
    reducer: {

        user:userReducer,
        draft:draftcartReducer,
        expeditions:expeditionsReducer,

    },
    devTools: shouldEnableDevTools,
    });

    export default store;
