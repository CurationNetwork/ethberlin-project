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

export const getTimeSec = () => {
  const nowStr = (new Date().getTime()).toString();
  return nowStr.substr(0, nowStr.length - 3);
}

