import React, {Component, Fragment} from 'react';
import styles from './index.css';
import Currency from './form_inputs/currency';
import amount from './form_inputs/amount';
import { connect } from 'react-redux';
import AngleRightIcon from '../../icons/angleRightIcon';
import {wave} from '../../helper';
import {updateConfig} from '../../globalActions';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        current_currency : 'GBP',
        current_amount: '',
        target_currency: 'USD',
        target_amount: '',
        focusElement: 'current'
      }
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculateTargetData = this.calculateTargetData.bind(this);
    this.reverseCurrency = this.reverseCurrency.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    var formData = this.state.formData;
    console.log('sublitted', this.props.config);
    var currentBalance = this.props.config.balance;
    currentBalance[formData['current_currency']] = currentBalance[formData['current_currency']] - formData['current_amount'];
    currentBalance[formData['target_currency']] = currentBalance[formData['target_currency']] + formData['target_amount'];
    this.props.dispatch(updateConfig(currentBalance));
    
  }

  handleInputChange = (inputName, e) => {
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
  }

  calculateTargetData(initialCurrency, finalCurrency, amount) {
    var rates = this.props.data.rates;
    var initialCurrencyBase = rates[initialCurrency];
    var finalCurrencyBase = rates[finalCurrency];

    var targetAmount = (finalCurrencyBase / initialCurrencyBase) * amount;
    return targetAmount;
  }

  reverseCurrency() {
    var formData = this.state.formData;
    var obj = {...formData};
    obj['current_currency'] = formData['target_currency'];
    obj['target_currency'] = formData['current_currency'];
    obj['current_amount'] = 0;
    obj['target_amount'] = 0;
    this.setState({formData: obj });
  }

  render() {
    const props = this.props;
    const formData = this.state.formData;
    const balance = props.config.balance;
    const targetBalance = balance[formData['target_currency']];
    const currentBalance = balance[formData['current_currency']];

    const components = {
      currency: Currency,
      amount: amount
    };
    const initialCurrency = this.state.formData.current_currency;
    const targetCurrency = this.state.formData.target_currency;
    const targetAmount = this.state.formData.target_amount;
    const targetUnitValue = this.calculateTargetData(initialCurrency, targetCurrency, 1).toFixed(4);

    const loadInputComponents = (inputs, targetElement) => {
      var formObj = this,
          formState = formObj.state,
          inputComponents = [];

      inputs.map(function(input, index) {
        const inputName = input.name;
        const Input = components[inputName];
        inputComponents.push(<Input value={formState['formData'][inputName]} 
                                key={index} 
                                data={props.data}
                                value={formState['formData'][targetElement + '_' + inputName]}
                                targetElement={targetElement}
                                focusElement={formState['formData']['focusElement']}
                                onInputChange={formObj.handleInputChange} />
                              );
      });
      return inputComponents;
    }

    return (
      <Fragment>
        <style jsx global>{ styles } </style>
        <section className="exchange-section">
          <form noValidate className="common-form" onSubmit={this.submitForm}>
            <div className='upper-wrap'>
              <div className='upper-currency-div common-section'>
                {loadInputComponents(props.inputsCurrent, 'current')}
              </div>
              <p className='balance'>
                  <span>Balance: {currentBalance && currentBalance.toFixed(2)}</span>
              </p>
            </div>
            <div className='lower-wrap'>
              <div className='lower-currency-div common-section'>
                {loadInputComponents(props.inputsTarget, 'target')}
              </div>
              <p className='balance'>
                <span>Balance: {targetBalance && targetBalance.toFixed(2)}</span>
              </p>
            </div>
            <button className='btn-exchange btn-pill btn-blue-solid btn-normal'
              disabled={this.state.disableBtn}
              onClick={this.submitForm}>
              <i className="wave hide"></i>
                {props.btnInfo.text}
            </button>
          </form>
          <div className='comparison-div'>
            <span>{ 1 + " " + this.state.formData.current_currency}</span>
            <span>{" = " + targetUnitValue + " " + this.state.formData.target_currency}</span>
          </div>
          <div className='reverse-btn' onClick={this.reverseCurrency}>
            <i className="icon-arrow-up">
              { <AngleRightIcon /> }
            </i>
          </div>
        </section>
      </Fragment>
    );
  }
 }

const mapStateToProps = state => ({
  config: state.config
});
export default connect(mapStateToProps)(FormContainer);
