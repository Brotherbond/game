import { render } from '@testing-library/react';
import { Control } from '../App';
import GameButton from './GameButton';
import { Provider } from 'react-redux'
import { colors } from '../redux/bet';
import store from '../redux/store';


describe('Testing GameButton', () => {
  render(<Provider store={store}><GameButton {...{ button: { color: colors[0], type: 0 }, control: Control.PLAY }} /></Provider>)
  it('true to be true', () => {
    expect(true).toEqual(true)
  })
})
