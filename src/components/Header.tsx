const Header = ({ balance, bet }: { balance: number, bet: number }): JSX.Element => {

    return <>
        <header className="App-header">
            <div>BALANCE: <span className="white">{balance}</span></div>
            <div className='m m2x'>BET: <span className="white">{bet}</span></div>
            <div>WIN: <span className="white">X</span></div>
        </header>
    </>

}
export default Header