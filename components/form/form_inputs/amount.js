import React, { Component, Fragment } from 'react';
import styles from './amount.css';


class Amount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  shouldComponentUpdate(props, states) {
    return !(this.props === props);
  }
  render() {
    return (
      <Fragment>
        <style jsx global>{ styles } </style>
        <div className="auxiliary-input-wrap amount-input">
          <input type="number" 
            onChange={this.props.onInputChange.bind(this, 'amount')}
            name="amount"
            key={this.props.value}
            pattern="[0-9]+(\.[0-9][0-9]?)?"
            step=".01"
            data-target={this.props.targetElement}
            placeholder={0}
            ref={input => input && (this.props.focusElement === this.props.targetElement) && input.focus()}
            defaultValue={this.props.value && parseFloat(this.props.value.toFixed(2))} />
        </div>
      </Fragment>
    );
  }
}

export default Amount;