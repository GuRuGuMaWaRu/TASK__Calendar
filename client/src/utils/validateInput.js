const validateInput = ({ title, fromTime, tillTime }) => {
  let errors = {};
  const convertedFromTime = fromTime.split(":");
  const convertedTillTime = tillTime.split(":");

  if (!title.length) {
    errors["title"] = "Title field cannot be empty";
  }
  if (!fromTime.length) {
    errors["fromTime"] = "From field cannot be empty";
  }
  if (!tillTime.length) {
    errors["tillTime"] = "Till field cannot be empty";
  }
  if (fromTime.length && +convertedFromTime[0] < 8) {
    errors["fromTime"] = "Please enter time from 08:00 till 17:00";
  }
  if (
    +convertedTillTime[0] > 17 ||
    (+convertedTillTime[0] === 17 && +convertedTillTime[1] > 0)
  ) {
    errors["tillTime"] = "Please enter time from 08:00 till 17:00";
  }
  if (
    +convertedFromTime[0] > +convertedTillTime[0] ||
    (+convertedFromTime[0] === +convertedTillTime[0] &&
      +convertedFromTime[1] >= +convertedTillTime[1])
  ) {
    errors["fromTime"] = "Cannot set Till Time before or equal to From Time";
    errors["tillTime"] = "Cannot set Till Time before or equal to From Time";
  }
  if (
    +convertedFromTime[0] === +convertedTillTime[0] &&
    +convertedFromTime[1] >= +convertedTillTime[1]
  ) {
    errors["fromTime"] = "Event duration must be at least 1 minute";
    errors["tillTime"] = "Event duration must be at least 1 minute";
  }

  return errors;
};

export default validateInput;
