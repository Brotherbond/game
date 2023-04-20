import { createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'


export interface User {
    balance: number
}

type DispatchFunc = () => AppDispatch
export const usePlayerDispatch: DispatchFunc = useDispatch
export const usePlayerSelector: TypedUseSelectorHook<RootState> = useSelector
export const initialBalance = 5000

export const { actions, reducer } = createSlice({
    name: "player",
    initialState: {
        player: { balance: initialBalance } as User
    },
    reducers: {
        updatePlayer: (state, action) => { state.player = action.payload },
    }
})

export const { updatePlayer } = actions

export default reducer
