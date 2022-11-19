import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import goodsSlice from '../components/goods/goodsSlice';


export const store = configureStore({
  reducer: {
    goods: goodsSlice,
  },
});
