import { useState } from "react"

export interface Button { color: string, name: string }


const GameButton = ({ button }: { button: Button }): JSX.Element => {
  enum Increase { DECREMENT, INCREMENT }
  const [val, setVal] = useState<number>(0)
  const updateBet = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>, increase?: Increase) => {
    const value = e.currentTarget.value
    if (value) {
      const newValue = parseInt(value)
      setVal(() => newValue > 0 ? newValue : 0)

    }
    else {
      setVal(prevValue => increase === Increase.DECREMENT ? (prevValue > 0 ? --prevValue : 0) : ++prevValue)
    }
  }
  return <>
    <div className={`box box-${button.color}`} data-testid={button.name} onClick={() => { }} >
      <div className={val === 0 ? 'invisible' : ""}>{500 * val}</div>

      <div className="invisible flex ads">
        <button onClick={e => updateBet(e, Increase.DECREMENT)}>-</button>
        <input type="number" value={val.toFixed(0)} title='multiply' onChange={updateBet} />
        <button onClick={e => updateBet(e, Increase.INCREMENT)}>+</button>
      </div>
      <div>{button.name}</div>
    </div>
  </>
}

export default GameButton