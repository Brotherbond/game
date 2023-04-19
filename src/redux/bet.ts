import { createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

type DispatchFunc = () => AppDispatch
export const useBetDispatch: DispatchFunc = useDispatch
export const useBetSelector: TypedUseSelectorHook<RootState> = useSelector
export const betPrice = 500
export enum Choices { ROCK, PAPER, SCISSORS }
export const choiceLength = Object.entries(Choices).length / 2
export type Bet = { choice: Choices, count: number }[]
export const calculateTotalBet = (bet: Bet) => betPrice * bet.reduce((i, j) => (i + j.count), 0)


export const { actions, reducer } = createSlice({
    name: "bet",
    initialState: {
        bet: [] as Bet
    },
    reducers: {
        updateBet: (state, action) => { state.bet = action.payload },
        refreshBetSelection: (state) => { state.bet = [] }
    }
})

export const { updateBet, refreshBetSelection } = actions

export default reducer


