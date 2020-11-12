import { FETCH_LOCATION } from '../actions/types';

const initialState = {
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOCATION:

      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
}