import moment from 'moment';

export const getStage = (startTime, commitTtl, revealTtl) => {
  const endTimeCommit = startTime + commitTtl;
  const endTimeReveal = startTime + commitTtl + revealTtl;
  const now = getTimeSec();

  if (now > startTime && now < endTimeCommit) {
    return 'commit';
  }

  if (now > startTime && now > endTimeCommit && now < endTimeReveal) {
    return 'reveal';
  }

  if (now > endTimeReveal) {
    return 'none';
  }
}

export const getTimeLeft = (startTime, commitTtl, revealTtl) => {
  const endTimeCommit = startTime + commitTtl;
  const endTimeReveal = startTime + commitTtl + revealTtl;
  const now = getTimeSec();

  if (now > startTime && now < endTimeCommit) {
    return moment.duration(endTimeCommit - now, 'seconds').humanize();
  }

  if (now > startTime && now > endTimeCommit && now < endTimeReveal) {
    return moment.duration(endTimeReveal - now, 'seconds').humanize();
  }

  if (now > endTimeReveal) {
    return 0;
  }
}

export const calcSpeed = (movings) => {
  return movings.reduce((acc, cur) => (
    acc + cur.speed * (cur.direction === 0 ? -1 : 1)
  ), 0);
}

export const getTimeSec = () => {
  const nowStr = (new Date().getTime()).toString();
  return nowStr.substr(0, nowStr.length - 3);
}

window.rr = getTimeSec;


export const getDataFromSec = (timeSec) => {
  const date = new Date(timeSec * 1000);

  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

window.tt = getDataFromSec;
