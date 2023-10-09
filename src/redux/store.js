import { configureStore } from '@reduxjs/toolkit'
import addressReducer from './addressReducer'

export const store = configureStore({
    reducer: addressReducer
})