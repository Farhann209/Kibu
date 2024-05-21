import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducerSlice/counterSlice";
import boxSlice from "../reducerSlice/boxSlice";

const store = configureStore({
    reducer:{
        counter : counterSlice,
        box : boxSlice
    }
})

export default store