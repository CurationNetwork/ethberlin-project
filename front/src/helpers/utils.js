import moment from 'moment';

export const getStage = (startTime, commitTtl, revealTtl) => {
  const endTimeCommit = parseInt(startTime) + parseInt(commitTtl);
  const endTimeReveal = parseInt(startTime) + parseInt(commitTtl) + parseInt(revealTtl);
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
  const endTimeCommit = parseInt(startTime) + parseInt(commitTtl);
  const endTimeReveal = parseInt(startTime) + parseInt(commitTtl) + parseInt(revealTtl);
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
  return new Date().getTime() / 1000 | 0;
}

export const getDataFromSec = (timeSec) => {
  const date = new Date(timeSec * 1000);

  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export const prepareFromArr = (arr, type) => {
  switch (type) {
    case 'item':
      return {
        name: arr[0],
        description: arr[1],
        owner: arr[2],
        lastRank: arr[3].toString(),
        balance: arr[4].toString(),
        votingId: arr[5].toString(),
        movingsIds: arr[6].map((id) => id.toString()),
      }
    case 'mov':
      return {
        startTime: arr[0].toString(),
        speed: arr[1].toString(),
        distance: arr[2].toString(),
        direction: arr[3].toString(),
        votingId: arr[4].toString(),
      }
    case 'voting':
      return {
        fixedFee: arr[0].toString(),
        dynamicFeeRate: arr[1].toString(),
        unstakeSpeed: arr[2].toString(),
        commitTtl: arr[3].toString(),
        revealTtl: arr[4].toString(),
        startTime: arr[5].toString(),
        commissions: arr[6].toString(),
        votersAddresses: arr[7],
      }
    default:
      break;
  }
}


export const getPicName = (pic) => {
  switch (pic) {
    case value:

      break;

    default:
      break;
  }
}