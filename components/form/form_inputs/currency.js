import React, { Component } from 'react';
import styles from './currency.css';

class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  render() {
    var data = this.props.data.rates;
    var keys = Object.keys(data);
    return (
      <div className='currency-wrapper'>
        <style jsx global>{ styles } </style>
        <div className="currency-input">
          <select onChange={this.props.onInputChange.bind(this, 'currency')}
            value={this.props.value}>
            {keys.map((currency, i) => (
              <option value={currency} 
                key={i} 
                data-amount={currency} 
                data-target={this.props.targetElement}>{currency}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default Currency;