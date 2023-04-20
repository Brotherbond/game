import { render, screen } from '@testing-library/react';
import App, { Control } from './App';
import { Provider } from 'react-redux'
import { colors, choiceLength } from './redux/bet';
import store from './redux/store';


describe('Testing Bet UI', () => {
  render(<Provider store={store}><App /></Provider>)

  it('Confirm components are available', () => {
    expect(screen.getByText(/PICK YOUR POSITIONS/i)).toBeInTheDocument();
    expect(screen.getByText("PLAY")).toBeInTheDocument();
    expect(screen.getByTestId('control').innerHTML).toEqual(Control[Control.PLAY]);
  })
  it('Number of bet options equals colors', () => {
    expect(choiceLength).toEqual(colors.length)
  })
})
