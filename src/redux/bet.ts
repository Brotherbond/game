import { createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const betPrice = 500
export enum Choices { ROCK, PAPER, SCISSORS }
export type Bet = { choice: Choices, count: number }[]


export const { actions, reducer } = createSlice({
    name: "bet",
    initialState: {
        bet: [] as Bet
    },
    reducers: {
        updateBet: (state, action) => state.bet[action.payload[1]] = action.payload[0],
        refreshBetSelection: (state) => { state.bet = [] }
    }
})

export const { updateBet, refreshBetSelection } = actions

export default reducer