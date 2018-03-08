import { getStartAndDuration } from "./layoutHelpers";

const prepareForExport = events => {
  return events.map(event => {
    return { ...getStartAndDuration(event), title: event.title };
  });
};

export default prepareForExport;
