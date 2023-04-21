import { cleanup, render, screen } from '@testing-library/react';
import App, { Control } from './App';
import { Provider } from 'react-redux'
import { colors, choiceLength } from './redux/bet';
import store from './redux/store';
import userEvent from '@testing-library/user-event';

afterEach(() => cleanup())

describe('Testing Bet UI', () => {
  it('Confirm components are available', () => {
    render(<Provider store={store}><App /></Provider>)
    expect(screen.getByText(/PICK YOUR POSITIONS/i)).toBeInTheDocument();
    expect(screen.getByText("PLAY")).toBeInTheDocument();
    expect(screen.getByTestId('control').innerHTML).toEqual(Control[Control.PLAY]);
  })

  it('Number of bet options equals colors', () => {
    expect(choiceLength).toEqual(colors.length)
  })
})

describe('Testing Events', () => {
  const user = userEvent.setup()
  
  test('Simple bet is successful', async () => {
    render(<Provider store={store}><App /></Provider>)    
    await user.click(screen.getByTestId("increment0"))
    await user.click(screen.getByTestId(/control/i))
    expect(screen.getByTestId('control').innerHTML).toEqual(Control[Control.CLEAR])
  })
})