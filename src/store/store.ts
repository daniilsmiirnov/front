        import { configureStore } from '@reduxjs/toolkit';
        import userReducer from './UserSlice'
        import cartReducer from './CartSlice';
        import expeditionsReducer from './ExpeditionSlice';
        import filterObjReducer from './FilterObjSlice';
        import expeditionFilterReducer from './FilterExpSlice'
        //@ts-ignore
        const shouldEnableDevTools = process.env.NODE_ENV !== 'production';
        export type RootState = ReturnType<typeof store.getState>;
        const store = configureStore({
        reducer: {

            user:userReducer,
            expeditions:expeditionsReducer,
            cart: cartReducer,
            filterObj:filterObjReducer,
            expeditionFilter: expeditionFilterReducer,
            
        },
        devTools: shouldEnableDevTools,
        });

        export default store;
