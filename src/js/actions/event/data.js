export const GET_EVENT = 'GET_EVENT';
export const GET_EVENT_REQUEST = 'GET_EVENT_REQUEST';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_FAILURE = 'GET_EVENT_FAILURE';

const event1 = {
  event_id: 1,
  host_user_id: 1,
  name: 'Lounge party',
  description: 'Celebrating life',
  is_poll: false,
  is_edited: false,
  _invitees: [2],
  _what: ['dancing', 'skydiving'],
  _where: ['Forest', 'Camping'],
  _when: [{ date: '01-01-2017', time: '12:00:00' }, { date: '03-01-2017', time: '15:00:00' }],
  _rsvps: { going: [], not_going: [], maybe: [] }
};

export function getEvent (event_id) { //eslint-disable-line
  return (dispatch) => {
    dispatch(getEventRequest());
    dispatch(getEventSuccess(event1));
  };
}

export function getEventRequest () {
  return {
    type: GET_EVENT_REQUEST,
    isFetching: true
  };
}

export function getEventSuccess (event) {
  return {
    type: GET_EVENT_SUCCESS,
    isFetching: false,
    data: event
  };
}

export function getEventFailure (error) {
  return {
    type: GET_EVENT_FAILURE,
    isFetching: false,
    error
  };
}
