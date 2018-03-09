export const eventsInTwoColumns = events => {
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
