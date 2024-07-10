import {configureStore} from "@reduxjs/toolkit"
import chessSliceReducer from "./chessSlice"

export const store = configureStore({
    reducer: {
        chess:chessSliceReducer,
    }
})