const Header = ({ balance, bet, win }: { balance: number, bet: number, win: number }): JSX.Element => {

    return <>
        <header className="App-header">
            <div>BALANCE: <span className="white" data-testid="balance">{balance}</span></div>
            <div className='m m2x'>BET: <span className="white" data-testid="totalBet">{bet}</span></div>
            <div>WIN: <span className="white" data-testid="win">{win}</span></div>
        </header>
    </>

}
export default Header