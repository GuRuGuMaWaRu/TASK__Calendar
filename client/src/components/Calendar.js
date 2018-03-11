import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getEventsWithWidth,
  placeEventsInTwoColumns,
  renderEvents
} from "../utils/layoutHelpers";

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

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.renderCalendarEvents = this.renderCalendarEvents.bind(this);
  }

  componentDidMount() {
    this.renderCalendarEvents();
    window.addEventListener(
      "resize",
      _.debounce(this.renderCalendarEvents, 150)
    );
  }

  componentDidUpdate() {
    this.renderCalendarEvents();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.renderCalendarEvents);
  }

  renderCalendarEvents() {
    const eventsWithWidth = getEventsWithWidth(this.props.events);
    const [leftColumn, rightColumn] = placeEventsInTwoColumns(
      this.props.events
    );

    const placedEvents = renderEvents(eventsWithWidth, leftColumn, false, null);
    renderEvents(eventsWithWidth, rightColumn, true, placedEvents);
  }

  firstColumn = () =>
    time_first.map(time => {
      return (
        <div key={time} id={time}>
          {time}
        </div>
      );
    });

  secondColumn = () =>
    time_second.map(time => {
      return (
        <div key={time} id={time}>
          {time}
        </div>
      );
    });

  render() {
    const [leftColumn, rightColumn, doubleEvents] = placeEventsInTwoColumns(
      this.props.events
    );

    const leftColumnEvents = leftColumn.map(({ _id, title }) => {
      return (
        <div key={_id} id={_id} className="event">
          {title}
        </div>
      );
    });
    const rightColumnEvents = rightColumn.map(({ _id, title }) => {
      return (
        <div
          key={_id}
          id={`${_id}right`}
          className={`event ${doubleEvents.includes(_id) ? "doubled" : ""}`}
        >
          {title}
        </div>
      );
    });

    return (
      <div className="calendar">
        <div className="column-1">
          <div className="time">{this.firstColumn()}</div>
          <div className="events">{leftColumnEvents}</div>
        </div>
        <div className="column-2">
          <div className="time">{this.secondColumn()}</div>
          <div className="events">{rightColumnEvents}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ events }) => ({
  events
});

export default connect(mapStateToProps)(Calendar);
