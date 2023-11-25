    import { configureStore } from '@reduxjs/toolkit';
    import userReducer from './UserSlice'
    import draftcartReducer from './DraftCartSlice'
    import expeditionsReducer from './ExpeditionSlice';

    export type RootState = ReturnType<typeof store.getState>;
    const store = configureStore({
    reducer: {

        user:userReducer,
        draft:draftcartReducer,
        expeditions:expeditionsReducer,

    },
    });

    export default store;
