import React from "react";

const time_first = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30"
];

const time_second = [
  "12:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00"
];

const CalendarEmpty = () => {
  const firstColumn = () =>
    time_first.map(time => {
      return (
        <div key={time} id={time}>
          {time}
        </div>
      );
    });

  const secondColumn = () =>
    time_second.map(time => {
      return (
        <div key={time} id={time}>
          {time}
        </div>
      );
    });

  return (
    <div className="calendar">
      <div className="column-1">
        <div className="time">{firstColumn()}</div>
        <div className="events" />
      </div>
      <div className="column-2">
        <div className="time">{secondColumn()}</div>
        <div className="events" />
      </div>
    </div>
  );
};

export default CalendarEmpty;
