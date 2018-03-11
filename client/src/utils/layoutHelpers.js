const minuteInPixels = () => {
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
    let group = {
      width: 0,
      events: []
    };
    group.events.push(events[i]._id);

    for (let j = 0, lenJ = events.length; j < lenJ; j++) {
      if (i !== j) {
        // event is conflicting if it starts before the other event ends
        // and ends after the other event starts
        if (
          timeToInt(events[j].fromTime) < timeToInt(events[i].tillTime) &&
          timeToInt(events[j].tillTime) > timeToInt(events[i].fromTime)
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
const groupAndSetWidth = events => {
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

export const getEventsWithWidth = events => {
  const groupedEventsWithWidth = groupAndSetWidth(events);
  const eventsWithWidth = {};

  groupedEventsWithWidth.forEach(group => {
    group.events.forEach(event => {
      if (!eventsWithWidth.hasOwnProperty(event)) {
        eventsWithWidth[event] = group.width;
      }
    });
  });

  return eventsWithWidth;
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

export const placeEventsInTwoColumns = events => {
  let leftColumn = [];
  let rightColumn = [];
  let doubleEvents = [];

  events.forEach(event => {
    if (event.start < 270) {
      leftColumn.push(event);
    }
    if (event.start >= 270 || event.start + event.duration > 270) {
      rightColumn.push(event);
    }
    if (event.start < 270 && event.start + event.duration > 270) {
      doubleEvents.push(event._id);
    }
  });

  return [leftColumn, rightColumn, doubleEvents];
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
    eventHeight = (eventDuration - (270 - eventStart)) * minInPixels;
  } else {
    eventHeight = eventDuration * minInPixels;
  }

  event.style.setProperty("--width", `${eventWidth - 2}px`);
  event.style.setProperty("--top", `${eventTop}px`);
  event.style.setProperty("--left", `${eventLeftOffset}px`);
  if (eventTop + eventHeight > eventsColumnHeight) {
    eventHeight = eventHeight - (eventTop + eventHeight - eventsColumnHeight);
  }
  event.style.setProperty("--height", `${eventHeight - 2}px`);

  return null;
};

const isPositionEmpty = (conflictingEvents, position) => {
  return conflictingEvents.every(
    conflictingEvent => conflictingEvent.position !== position
  );
};

export const renderEvents = (
  eventsWithWidth,
  eventsInColumn,
  isRightColumn,
  alreadyPlacedEvents
) => {
  const sortedEvents = eventsInColumn.sort((e1, e2) => e1.start - e2.start);
  const placedEvents = {};
  // loop through sortedEvents
  sortedEvents.forEach(currentEvent => {
    // get event's width
    const width = eventsWithWidth[currentEvent._id];

    // create temporary repository for conflicting events from placedEvents
    let conflictingEvents = [];
    for (let placedEvent in placedEvents) {
      if (placedEvents[placedEvent].end > currentEvent.start) {
        conflictingEvents.push(placedEvents[placedEvent]);
      }
    }

    // check positions of conflictingEvents and take the first available
    const placedEventsLength = Object.keys(placedEvents).length;
    let position = placedEventsLength;

    // if this is the right column and the event was already rendered
    // in the left column, use its old position
    if (isRightColumn && alreadyPlacedEvents.hasOwnProperty(currentEvent._id)) {
      position = alreadyPlacedEvents[currentEvent._id].position;
    } else {
      for (let i = 0, len = placedEventsLength; i < len; i++) {
        let positionIsEmpty = isPositionEmpty(conflictingEvents, i);
        if (positionIsEmpty) {
          position = i;
          break;
        }
      }
    }

    // add rendered event to placedEvents
    placedEvents[currentEvent._id] = {
      end: currentEvent.start + currentEvent.duration,
      position
    };

    // determine left offset for the event we render
    const leftOffset = width * position;

    // render the event
    renderEvent(
      currentEvent._id,
      width,
      leftOffset,
      currentEvent.start,
      currentEvent.duration,
      isRightColumn
    );
  });

  return placedEvents;
};
