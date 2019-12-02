import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Spinner from './index';

Enzyme.configure({ adapter: new Adapter() })

test('Component Exists', () => {
  const wrapper = shallow(<Spinner />)

  expect(wrapper.exists()).toBe(true);
})