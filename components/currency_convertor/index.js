import React, { Component } from 'react';
import { Link } from '../.././routes';
import {unitConvertor, toggleShortlist, wave, dropGAPixel, sendGA, sendPageView, setGADimension} from '../../helper';
import styles from './index.css';
import Exchange from './exchange';

class CurrencyConvertor extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      selectedActivityInfo: {
        "activity" : "Actions"
      },
      activityData: [
        {
          "activity" : "Rates"
        },
        {
          "activity" : "Convertor"
        },
        {
          "activity" : "Actions"
        }
      ]
    };
    this.changeSelectedActivityInfo = this.changeSelectedActivityInfo.bind(this);
  }

  changeSelectedActivityInfo(activityInfo) {
    this.setState({
      selectedActivityInfo : activityInfo
    });
  }

  render() {
    const data = this.props.data;
    const activityList = this.state.activityData.map((activity, i) =>
      <ActivityList
        key={i}
        activityInfo={activity}
        selectedActivity={this.state.selectedActivityInfo.activity}
        changeSelectedActivityInfo={this.changeSelectedActivityInfo}
      />
    );
    return(
      <div>
        <style jsx global>{styles} </style>
        <div className="activity-header-container">
            <ul className="user-activity-tab-list">{ activityList }</ul>
        </div>
        <Exchange data={data}/>
      </div>     
    );
  }
}
class ActivityList extends Component {
  onClickHandler = (e) => {
    this.props.changeSelectedActivityInfo(this.props.activityInfo);
  }
  
  render() {
    const activityInfo = this.props.activityInfo;
   
    return (
      <li className={ this.props.selectedActivity === activityInfo.activity ? "nav-links selected" : "nav-links" }>
        <p>{activityInfo.activity}</p>
      </li>
    );
  }
}
export default CurrencyConvertor;
