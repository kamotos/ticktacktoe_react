import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from './App';

it('renders without crashing', () => {
  shallow(<App />)
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
});
