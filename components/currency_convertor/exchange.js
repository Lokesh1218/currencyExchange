import React, { Component } from 'react';
import { Link } from '../.././routes';
import {wave} from '../../helper';
import styles from './exchange.css';
import FormContainer from '.././form';

class Exchange extends Component {
  constructor(props) {
    super(props);
  }

 

  render() {
    const data = this.props.data;
    const inputsCurrent = [
        {name: 'currency'},
        {name: 'amount'}
      ],
      inputsTarget = [
        {name: 'currency'},
        {name: 'amount'}
      ],
      btnInfo = {
        type: 'submit',
        text: 'Exchange'
    };
    return(
      <div>
        <style jsx global>{styles} </style>
        <FormContainer 
          data= {data}
          inputsCurrent={inputsCurrent}
          inputsTarget={inputsTarget}

          btnInfo={btnInfo}
        />

      </div>     
    );
  }
}


export default Exchange;
