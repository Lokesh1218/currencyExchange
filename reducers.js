import { combineReducers } from 'redux';
import globalReducer from './globalReducers';
import { globalInitialState } from './globalReducers';
import homePageReducer from './components/home/reducers';
import { homePageInitialState } from './components/home/reducers';

export const initialState = {
  config: globalInitialState,
  home: homePageInitialState
};

export default combineReducers({
  config: globalReducer,
  home: homePageReducer
});
