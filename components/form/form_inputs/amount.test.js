import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Amount from './amount';

Enzyme.configure({ adapter: new Adapter() })

function handleInputChange(inputName, e) {
    let formData = this.state.formData;
    var eData;
    if (inputName === 'currency') {
      eData = e.target.options[e.target.selectedIndex].dataset;
      formData[eData.target + '_' +  inputName] = e.target.value;
      formData['current_amount'] = 0;
      formData['target_amount'] = 0; 
      this.setState({formData});
    } else if (inputName === 'amount') {

      eData = e.target.dataset.target;
      var amount =  parseFloat(e.target.value);
      if(!isNaN(amount)) {
         var tempObject = JSON.parse(JSON.stringify(formData));

      var valueTochange = eData === 'current' ? 'target' : 'current';
      tempObject[eData + '_' + 'amount' ] = amount;
      var targetAmount = this.calculateTargetData(formData[eData + '_' + 'currency'], formData[valueTochange + '_' + 'currency'], amount);
      tempObject[valueTochange + '_' + 'amount' ] = targetAmount;
      tempObject['focusElement'] = eData;
      
      this.setState({formData: tempObject});
      }
    }
};
test('Amount Exists', () => {
  const wrapper = shallow(<Amount onInputChange={handleInputChange}/>)

  expect(wrapper.exists()).toBe(true);
})