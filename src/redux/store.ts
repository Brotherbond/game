import { configureStore } from '@reduxjs/toolkit'
import betReducer from './bet'
import playerReducer from './player'

const store = configureStore({
    reducer: {
        bet: betReducer,
        player: playerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
