import './styles/global.scss'
import Header from "./components/Header"
import { useState } from "react"
import GameButton from './components/GameButton'
import { Bet, betPrice, calculateTotalBet, Choices, choiceLength, useBetSelector, useBetDispatch, refreshBetSelection, colors } from './redux/bet'
import { updatePlayer, usePlayerSelector, usePlayerDispatch } from './redux/player'
import { RootState } from './redux/store'


enum Result { DRAW, LOSE, WIN }
export enum Control { PLAY, CLEAR }

function App() {
  const { bet } = useBetSelector((state: RootState) => state.bet)
  const dispatchBet = useBetDispatch()
  const { player } = usePlayerSelector((state: RootState) => state.player)
  const dispatchPlayer = usePlayerDispatch()
  const [control, setControl] = useState<Control>(Control.PLAY)
  const [win, setWin] = useState<number>(0)
  const [result, setResult] = useState<Result[]>([])
  const [computerChoice, setComputerChoice] = useState<number | undefined>()

  const mod = (a: number, b: number) => {
    const c = a % b;
    return c < 0 ? c + b : c;
  }

  const calculateResult = (bet: Bet) => {
    const computerChoice = Math.floor(Math.random() * 3)
    setComputerChoice(() => computerChoice)
    return bet.map(betPosition => {
      if (betPosition.choice === computerChoice) {
        return Result.DRAW;
      }
      else if (mod(betPosition.choice - computerChoice, choiceLength) < choiceLength / 2) {
        return Result.WIN;
      }
      return Result.LOSE;
    });
  }

  const totalBet = calculateTotalBet(bet)
  const calculateWin = (returns: number, betCount: number) => betPrice * returns * betCount
  const handleResult = () => {
    const betResult = calculateResult(bet)
    setResult(() => betResult)
    const win = betResult.reduce((totalWin, resultItem, i) => {
      return resultItem === Result.WIN ? calculateWin(bet.length === 1 ? 14 : 3, bet[i].count) + totalWin : totalWin
    }, 0)
    setWin(() => win)
    dispatchPlayer(updatePlayer({ balance: player.balance + win - totalBet }))
  }
  const handleControl = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (control === Control.PLAY) {
      if (bet.length === 0) {
        alert('Please select position')
      }
      else {
        handleResult()
        setControl(Control.CLEAR)
      }
    } else {
      dispatchBet(refreshBetSelection())
      setControl(Control.PLAY)
      setWin(() => 0)
    }
  }

  return (
    <div className="App">
      <Header {...{ balance: player.balance, bet: totalBet, win }} />
      <section className='App-main'>
        {control === Control.CLEAR &&
          <>
            <div>
              <h2>
                {result.map((betResultItem, i) => <span key={i}><span className={colors[bet[i].choice]}>{`${Choices[bet[i].choice]} ${Result[betResultItem]}`}</span>{i < bet.length - 1 ? " , " : ""}</span>)}
              </h2>
              <br />
              <h4 className='flex'>YOU WIN <span className="white m">{win}</span></h4>
              <br />
            </div>
            <h3>
              <span className="white">{computerChoice !== undefined && Choices[computerChoice]}</span>
              <span className='m2x'>VS</span>
              {[bet.map((betItem, i) => <span key={i}><span className={colors[betItem.choice]}>{Choices[betItem.choice]}</span><span className="white">{i < bet.length - 1 ? " , " : ""}</span></span>)]}
            </h3>
          </>
        }

        {control === Control.PLAY && <p className='m'>PICK YOUR POSITIONS</p>}
        <div className='flex wrap'>
          {colors.length === choiceLength && colors.map((choice, i) => <GameButton key={i} {...{ button: { color: choice, type: i }, control }} />)}
        </div>
        <div><button className='control m' data-testid="control" onClick={handleControl}>{Control[control]}</button></div>
      </section>
    </div>
  );
}

export default App;
