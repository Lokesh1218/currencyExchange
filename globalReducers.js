
let initialState = {
  balance: {
    'GBP': 478,
    'USD': 562,
    'EUR': 298,
    'INR': 45476
  }
}

export { initialState as globalInitialState };
export default function config(state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_CONFIG': {
      const {type, payload} = action;
      delete action['type'];
      state = Object.assign({}, state, payload);
      return state;
    }
    default: return state;
  }
}
