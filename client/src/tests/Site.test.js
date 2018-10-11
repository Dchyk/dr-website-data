import React from 'react';
import { shallow } from 'enzyme';
import Site from '../components/Site';

it('renders without crashing', () => {
  shallow(<Site />);
});