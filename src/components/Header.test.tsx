import { render, screen } from '@testing-library/react';
import Header from './Header';
import { initialBalance } from '../redux/player';

describe('Testing Header', () => {
  it('Initial rendering', () => {
    render(<Header {...{ balance: initialBalance, bet: 0, win: 0 }} />);
    expect(screen.getByText(/BALANCE/i)).toBeInTheDocument();
    expect(screen.getByText(/BET/i)).toBeInTheDocument();
    expect(screen.getByText(/WIN/i)).toBeInTheDocument();
    expect(screen.getByTestId('balance').innerHTML).toEqual(initialBalance.toString());
    expect(screen.getByTestId('totalBet').innerHTML).toEqual("0");
    expect(screen.getByTestId('win').innerHTML).toEqual("0");
  })
  it('Correct display of data passed, i.e. balance,total bet and win', () => {
    render(<Header {...{ balance: 0, bet: 500, win: 2000 }} />)
    expect(screen.getByTestId('balance').innerHTML).toEqual("0");
    expect(screen.getByTestId('totalBet').innerHTML).toEqual("500");
    expect(screen.getByTestId('win').innerHTML).toEqual("2000");
  })
})
