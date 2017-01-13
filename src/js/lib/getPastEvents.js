import getEndTime from './getEndTime';

export default function getPastEvents (event) {

  if (event._when[0].date === '') {
    return false;
  }
  const end = getEndTime(event._when[0].date);
  return !isNaN(end) && Date.now() > end;
}
