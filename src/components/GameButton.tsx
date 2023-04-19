import { useState } from "react"
import { RootState } from "../redux/store"
import { updateBet, calculateTotalBet, betPrice, useBetDispatch, useBetSelector, Choices, choiceLength } from '../redux/bet'
import { usePlayerSelector } from '../redux/player'


export interface Button { color: string, type: number }


const GameButton = ({ button }: { button: Button }): JSX.Element => {
  const { bet } = useBetSelector((state: RootState) => state.bet)
  const { player: { balance } } = usePlayerSelector((state: RootState) => state.player)
  const dispatch = useBetDispatch()
  enum Increase { DECREMENT, INCREMENT }
  const [val, setVal] = useState<number>(0)
  const updateVal = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>, increase: Increase | -1 = -1) => {
    let tempoBet = [...bet]
    let tempoCard = { choice: button.type, count: val }
    if (increase >= 0) {
      tempoCard.count = increase === Increase.DECREMENT ? --tempoCard.count : ++tempoCard.count
    }
    else {
      tempoCard.count = parseInt(e.currentTarget.value)
    }
    const cardInBet = tempoBet.findIndex(betItem => betItem.choice === button.type)
    if (tempoCard.count < 0) { return }
    if (cardInBet > -1) {
      if (tempoCard.count === 0) { tempoBet.splice(cardInBet, 1) }
      else { tempoBet[cardInBet] = tempoCard }
    } else {
      if (tempoBet.length < choiceLength - 1) { tempoBet.push(tempoCard) }
      else {
        alert(`Only ${choiceLength - 1} selections allowed`)
        return
      }
    }
    if ((balance - calculateTotalBet(tempoBet)) > 0) {
      dispatch(updateBet(tempoBet))
      setVal(() => tempoCard.count)
    } else {
      alert('Balance not sufficient')
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