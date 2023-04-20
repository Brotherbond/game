import './styles/global.scss'
import Header from "./components/Header"
import { useState } from "react"
import GameButton from './components/GameButton'
import { Bet, betPrice, calculateTotalBet, Choices, choiceLength, useBetSelector, useBetDispatch, refreshBetSelection, colors } from './redux/bet'
import { updatePlayer, usePlayerSelector, usePlayerDispatch } from './redux/player'
import { RootState } from './redux/store'



enum Result { DRAW, LOSE, WIN }
export enum Control { PLAY, CANCEL }

function App() {
  const { bet } = useBetSelector((state: RootState) => state.bet)
  const dispatchBet = useBetDispatch()
  const { player } = usePlayerSelector((state: RootState) => state.player)
  const dispatchPlayer = usePlayerDispatch()
  const [control, setControl] = useState<Control>(Control.PLAY)
  const [win, setWin] = useState<number>(0)
  let computerChoice: number = 0

  const mod = (a: number, b: number) => {
    const c = a % b;
    return c < 0 ? c + b : c;
  }

  const betResult = (bet: Bet) => {
    computerChoice = Math.floor(Math.random() * 3)
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
  const removeBet = () => dispatchPlayer(updatePlayer({ balance: player.balance - totalBet }))
  const handleWin = (returns: number, betCount: number) => {
    const win = betPrice * returns * betCount
    setWin(() => win)
    dispatchPlayer(updatePlayer({ balance: player.balance + win }))
  }
  const handleResult = () => betResult(bet).forEach((resultItem, i) => resultItem === Result.WIN && handleWin(bet.length === 1 ? 14 : 3, bet[i].count))
  const handleControl = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (control === Control.PLAY) {
      if (bet.length === 0) {
        alert('Please select position')
      }
      else {
        removeBet()
        handleResult()
        setControl(Control.CANCEL)
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
        {control === Control.CANCEL &&
          <>
            <div>
              <h2 className='green'>PAPER WON</h2>
              <br />
              <h4>YOU WIN <span className="white m">{win}</span></h4>
              <br />
            </div>
            <h3>
              <span className="white">{Choices[computerChoice]}</span>
              <span className='m2x'>VS</span>
              {[bet.map((betItem, i) => <><span className={colors[betItem.choice]}>{Choices[betItem.choice]}</span><span className="white">{i < bet.length - 1 ? " , " : ""}</span></>)]}
            </h3>
          </>
        }

        {control === Control.PLAY && <p className='m'>PICK YOUR POSITIONS</p>}
        <div className='flex'>
          {colors.map((choice, i) => <GameButton key={i} {...{ button: { color: choice, type: i }, control }} />)}
        </div>
        <div><button className='control m' data-testid="control" onClick={handleControl}>{Control[control]}</button></div>
      </section>
    </div>
  );
}

export default App;
