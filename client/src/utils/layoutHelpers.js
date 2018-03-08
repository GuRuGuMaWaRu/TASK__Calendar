const timeToMinutes = time => {
  const hours = (time[0] - 8) * 60;
  const minutes = time[1];

  return hours + minutes;
};

const timeToInt = time => {
  const timeInArr = time.split(":").map(time => parseInt(time, 10));
  return timeToMinutes(timeInArr);
};

export const minuteInPixels = () => {
  return document.querySelector(".calendar").offsetHeight / 270;
};

export const calculateLayout = events => {
  const eventGroups = [];

  for (let i = 0, len = events.length; i < len; i++) {
    let group = [events[i]];
    for (let j = 0, lenJ = events.length; j < len; j++) {
      if (i !== j) {
        if (
          timeToInt(events[i].fromTime) < timeToInt(events[j].tillTime) &&
          timeToInt(events[i].tillTime) > timeToInt(events[j].fromTime)
        ) {
        }
      }
    }
  }

  return null;
};

export const getStartAndDuration = event => {
  const { fromTime, tillTime } = event;
  const fromTimeInMinutes = timeToInt(fromTime);
  const tillTimeInMinutes = timeToInt(tillTime);

  return {
    start: fromTimeInMinutes,
    duration: tillTimeInMinutes - fromTimeInMinutes
  };
};
