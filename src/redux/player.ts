import { createSlice} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'


interface User {
    balance: number
}

type DispatchFunc = () => AppDispatch
export const usePlayerDispatch: DispatchFunc = useDispatch
export const usePlayerSelector: TypedUseSelectorHook<RootState> = useSelector

export const { actions, reducer } = createSlice({
    name: "player",
    initialState: {
        player: { balance: 5000 } as User
    },
    reducers: {
        updatePlayer: (state, action) => (state.player.balance = action.payload),
    }
})

export const { updatePlayer } = actions

export default reducer
