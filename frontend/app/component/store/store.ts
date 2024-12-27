// import { configureStore } from '@reduxjs/toolkit';
// import { createWrapper } from 'next-redux-wrapper';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from "@reduxjs/toolkit";
import selectedCategoriesSlice from '../store/slices'

// // Example reducer (you can replace this with your actual reducers)
// const initialState = { count: 0 };

// const counterSlice = {
//   reducer: (state = initialState, action: any) => {
//     switch (action.type) {
//       case 'INCREMENT':
//         return { ...state, count: state.count + 1 };
//       case 'DECREMENT':
//         return { ...state, count: state.count - 1 };
//       default:
//         return state;
//     }
//   },
// };

// // Configure the store
// export const makeStore = () =>
//   configureStore({
//     reducer: {
//       counter: counterSlice.reducer, // Add your reducers here
//     },
//   });

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];

// // Use typed hooks for dispatch and selector
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

// // Create a wrapper for Next.js
// export const wrapper = createWrapper<AppStore>(makeStore);










// import { configureStore } from '@reduxjs/toolkit';
// import selectedCategories from "./features/selectedCategoriesSlice"
// store variable is a global variable.
export const makeStore = () => {
    return configureStore({
        reducer: {
            selectedCategoriesSlice: selectedCategoriesSlice
        },
    });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];