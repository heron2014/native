import update from 'immutability-helper';
import * as actions from '../actions/reset-password';

export const initialState = {
  isResetting: false,
  error: undefined
};

export default function reset (state = initialState, action) {
  switch (action.type) {

    case actions.RESET_PASSWORD_REQUEST:
      return update(state, {
        isResetting: { $set: true }
      });

    case actions.RESET_PASSWORD_SUCCESS:
      return initialState;

    case actions.RESET_PASSWORD_FAILURE:
      return update(state, {
        isResetting: { $set: false },
        error: { $set: action.error }
      });

    default:
      return state;
  }
}