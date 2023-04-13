import './styles/global.scss'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>BALANCE: <span className="white">XXXX</span></div>
        <div className='m m2x'>BET: <span className="white">XXX</span></div>
        <div>WIN: <span className="white">X</span></div>
      </header>
      <section className='App-main'>
        <div>
          <h2 className='green'>PAPER WON</h2>
          <h4>YOU WIN <span className="white">XXX</span></h4>
        </div>
        <h3>
          <span className="white">ROCK</span>
          <span>VS</span>
          <span className="white">PAPER</span>

        </h3>

        <p className='m'>PICK YOUR POSITIONS</p>
        <div className='flex'>
          <div className='box box-purple'>
            <div>500</div>
            <div>ROCK</div>
          </div>
          <div className='box box-green m'>
            <div>500</div>
            <div>PAPER</div>
          </div>
          <div className='box box-red'>
            <div className='invisible'>500</div>
            <div>SCISSORS</div>
          </div>
        </div>
        <div><button>PLAY</button></div>
      </section>
    </div>
  );
}

export default App;


//find image to html software, 
//use gpt for best rock, paper, scissor algorithm 