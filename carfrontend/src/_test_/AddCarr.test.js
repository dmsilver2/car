import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import AddCar from '../components/AddCar';

Enzyme.configure({ adapter: new Adapter() });

describe('<AddCar />', () => {
    it('renders five <TextInput /> components', () => {
        const wrapper = shallow(<AddCar />);
        expect(wrapper.find('TextField')).toHaveLength(5);
    });

    it('test onChange', () => {
        const wrapper = shallow(<AddCar />);
        const brandInput = wrapper.find('TextField').at(0);
        const name = brandInput.props().name;
        brandInput.simulate('change', { target: { value: 'Ford', name } });
        expect(wrapper.state('brand')).toEqual('Ford');
    });
});
