const timeToMinutes = time => {
  const hours = (time[0] - 8) * 60;
  const minutes = time[1];

  return hours + minutes;
};

const prepareForExport = events => {
  return events.map(event => {
    const { title, fromTime, tillTime } = event;
    const fromTimeInArr = fromTime.split(":").map(time => parseInt(time, 10));
    const tillTimeInArr = tillTime.split(":").map(time => parseInt(time, 10));
    const start = timeToMinutes(fromTimeInArr);
    const duration =
      timeToMinutes(tillTimeInArr) - timeToMinutes(fromTimeInArr);

    return {
      start,
      duration,
      title
    };
  });
};

export default prepareForExport;
