export const minuteInPixels = () => {
  return document.querySelector(".calendar").offsetHeight / 270;
};

const timeToMinutes = time => {
  const hours = (time[0] - 8) * 60;
  const minutes = time[1];

  return hours + minutes;
};

const timeToInt = time => {
  const timeInArr = time.split(":").map(time => parseInt(time, 10));
  return timeToMinutes(timeInArr);
};

const groupConflictingEvents = events => {
  const eventGroups = [];

  for (let i = 0, len = events.length; i < len; i++) {
    let group = { width: 0, events: [] };
    group.events.push(events[i]._id);

    for (let j = 0, lenJ = events.length; j < lenJ; j++) {
      if (i !== j) {
        if (
          timeToInt(events[i].fromTime) < timeToInt(events[j].tillTime) &&
          timeToInt(events[i].tillTime) > timeToInt(events[j].fromTime)
        ) {
          // events are conflicting, add them to the same group
          group.events.push(events[j]._id);
        }
      }
    }
    eventGroups.push(group);
  }

  return eventGroups;
};

const findNextGroup = (groups, referenceGroup) => {
  return groups.find(group => {
    if (group.width === 0) {
      for (let j = 0, lenJ = referenceGroup.events.length; j < lenJ; j++) {
        if (group.events.includes(referenceGroup.events[j])) {
          return true;
        }
      }
    }
    return false;
  });
};

export const groupAndSetWidth = events => {
  const eventGroups = groupConflictingEvents(events);
  const sortedEventGroups = eventGroups.sort(
    (g1, g2) => g2.events.length - g1.events.length
  );
  const eventsColumnWidth = document.querySelector(".events").offsetWidth;

  for (let i = 0, len = sortedEventGroups.length; i < len; i++) {
    if (sortedEventGroups[i].width === 0) {
      const width = eventsColumnWidth / sortedEventGroups[i].events.length;
      const finalWidth = width > 200 ? 200 : width;
      sortedEventGroups[i].width = finalWidth;

      let nextGroup = findNextGroup(sortedEventGroups, sortedEventGroups[i]);

      while (nextGroup) {
        nextGroup.width = finalWidth;
        nextGroup = findNextGroup(sortedEventGroups, nextGroup);
      }
    }
  }

  return sortedEventGroups;
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

const renderEvent = (
  eventID,
  eventWidth,
  eventLeftOffset,
  eventStart,
  eventDuration,
  isRightColumn
) => {
  let event, eventTop, eventHeight;
  const eventsColumnHeight = document.querySelector(".events").offsetHeight;
  const minInPixels = minuteInPixels();

  if (isRightColumn) {
    event = document.getElementById(`${eventID}right`);
  } else {
    event = document.getElementById(eventID);
  }

  if (event.classList.contains("doubled")) {
    eventTop = 0;
  } else if (isRightColumn) {
    eventTop = (eventStart - 270) * minInPixels;
  } else {
    eventTop = eventStart * minInPixels;
  }

  if (event.classList.contains("doubled")) {
    eventHeight = eventDuration - (270 - eventStart);
  } else {
    eventHeight = eventDuration * minInPixels;
  }

  event.style.setProperty("--top", `${eventTop}px`);
  event.style.setProperty("--left", `${eventLeftOffset}px`);
  event.style.setProperty("--width", `${eventWidth - 2}px`);
  if (eventTop + eventHeight > eventsColumnHeight) {
    eventHeight = eventHeight - (eventTop + eventHeight - eventsColumnHeight);
  }
  event.style.setProperty("--height", `${eventHeight}px`);

  return null;
};

export const placeEvents = (groupedEvents, eventsInColumn, isRightColumn) => {
  const columnToArr = eventsInColumn.map(event => event._id);
  const placedEvents = {};

  groupedEvents.forEach(group => {
    let leftOffset = 0;
    group.events.forEach(event => {
      if (!placedEvents[event] && columnToArr.includes(event)) {
        const eventToPlace = eventsInColumn.filter(
          eventObj => eventObj._id === event
        );
        renderEvent(
          event,
          group.width,
          leftOffset,
          eventToPlace[0].start,
          eventToPlace[0].duration,
          isRightColumn
        );
        leftOffset += group.width;
        placedEvents[event] = true;
      }
    });
  });
};
