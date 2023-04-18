import { useState } from "react"
import { updateBet, betPrice, useAppDispatch, useAppSelector, Choices } from '../redux/bet'


export interface Button { color: string, type: number }


const GameButton = ({ button }: { button: Button }): JSX.Element => {
  const { bet } = useAppSelector(state => state.bet)
  const dispatch = useAppDispatch()
  enum Increase { DECREMENT, INCREMENT }
  const [val, setVal] = useState<number>(0)
  const updateVal = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>, increase?: Increase) => {
    const value = e.currentTarget.value
    const totalBet = bet.reduce((i, j) => (i + j.count), 0)
    const index = bet.findIndex(betItem => betItem.choice === button.type)
    if (bet.length < 2) {
      if (value) {
        const newValue = parseInt(value)
        setVal(() => newValue > 0 ? newValue : 0)
      }
      else {
        setVal(prevValue => increase === Increase.DECREMENT ? (prevValue > 0 ? --prevValue : 0) : ++prevValue)
      }
      dispatch(updateBet([{ choice: button.type, count: val }, 0]))
    } else {
      alert('Only to two selection is allowed')
    }
  }
  return <>
    <div className={`box box-${button.color}`} data-testid={button.type} onClick={() => { }} >
      <div className={val === 0 ? 'invisible' : ""}>{betPrice * val}</div>
      <div className="invisible flex ads">
        <button onClick={e => updateVal(e, Increase.DECREMENT)}>-</button>
        <input type="number" value={val.toFixed(0)} title='multiply' onChange={updateVal} />
        <button onClick={e => updateVal(e, Increase.INCREMENT)}>+</button>
      </div>
      <div>{Choices[button.type]}</div>
    </div>
  </>
}

export default GameButton