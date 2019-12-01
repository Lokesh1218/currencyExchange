import React, { Component } from 'react';
import { Link } from '../.././routes';
import Spinner from '../spinner';
import {wave} from '../../helper';
import {fetchHomePageData} from './actions';
import styles from './index.css';
import CurrencyConvertor from '../currency_convertor';
import {appId, apiUrl} from '../../globalConstants';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const data = {
      requestHeaders: {
        app_id: appId
      }
    };
    var classObject = this;
    classObject.apiCallInterval = setInterval(function () {
      classObject.props.dispatch(fetchHomePageData(false, data));
    }, 10000);    
  }

  componentWillUnmount() {
    clearInterval(this.apiCallInterval);
  }

  shouldComponentUpdate(currentProps, currentStates) {
    return !(this.props.data.rates === currentProps.data.rates);
  }

  render() {
    const data = this.props.data;
    return(
      <div>
        <style jsx global>{styles} </style>
        { !this.props.dataLoaded ? <Spinner bgColor={ '#03A9F4' } marginTop={100} /> :
          <CurrencyConvertor data={this.props.data}/>
        }
      </div>     
    );
  }
}
export default Home;
