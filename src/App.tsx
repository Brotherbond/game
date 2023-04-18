import './styles/global.scss'
import Header from "./components/Header"
import { useState } from "react"
import GameButton from './components/GameButton'
import { Bet, betPrice, Choices, useAppSelector, refreshBetSelection } from './redux/bet'


enum Result { DRAW, LOSE, WIN }
enum Control { PLAY, CANCEL }
interface User {
  balance: number
}

function App() {
  const choiceLength = Object.entries(Choices).length / 2
  const [player, updatePlayer] = useState<User>({ balance: 5000 })
  const [control, setControl] = useState(Control[0])
  const { bet } = useAppSelector(state => state.bet)
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

  const totalBet = bet.reduce((i, j) => (i + j.count), 0)
  const removeBet = () => player.balance > betPrice ? updatePlayer(player => ({ ...player, balance: player.balance - betPrice * totalBet })) : "alert cant bet"
  const handleWin = (returns: number, betCount: number) => updatePlayer(player => ({ ...player, balance: player.balance + (betPrice * returns * betCount) }))
  const handleResult = () => betResult(bet).forEach((resultItem, i) => resultItem === Result.WIN && handleWin(bet.length === 1 ? 14 : 3, bet[i].count))
  const handleControl = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (control === Control[0]) {
      if (bet.length === 0) {
        alert('Please select position')
      }
      else {
        removeBet()
        handleResult()
        setControl(Control[1])
      }
    } else {
      refreshBetSelection()
      setControl(Control[0])
    }
  }

  return (
    <div className="App">
      <Header balance={player.balance} bet={totalBet} />
      <section className='App-main'>
        {control === Control[1] &&
          <>
            <div>
              <h2 className='green'>PAPER WON</h2>
              <h4>YOU WIN <span className="white">XXX</span></h4>
            </div>
            <h3>
              <span className="white">{Choices[computerChoice]}</span>
              <span className='m2x'>VS</span>
              <span className="white">{[bet.map(betItem => Choices[betItem.choice])]}</span>
            </h3>
          </>
        }

        {control === Control[0] && <p className='m'>PICK YOUR POSITIONS</p>}
        <div className='flex'>
          {['blue', 'green', 'red'].map((choice, i) => <GameButton key={i} button={{ color: choice, type: i }} />)}
        </div>
        <div><button className='control m' data-testid="control" onClick={handleControl}>{control}</button></div>
      </section>
    </div>
  );
}

export default App;
