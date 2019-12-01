import React, { Fragment }  from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import OfflineSupport from './offline_support';
import styles from './common.css';
import resetStyles from './reset.css';
import OfflineToast from './offline_toast';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const classObj = this;
    // Event listener for add to home screen
    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();

      // Stash the event so it can be triggered later.
      classObj.deferredPrompt = e;

      return false;
    });
  }

  render() {

    return (
      <Fragment>
        <style jsx global>{ resetStyles } </style>
        <style jsx global>{ styles } </style>
        {this.props.children}  
        <OfflineToast />
      </Fragment>
    );
  }
}

export default Layout;
