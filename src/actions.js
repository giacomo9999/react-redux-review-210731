import { createServer } from "miragejs";
import { ADD_DATE, FETCH_DATA, ERROR } from "./types";

let server = createServer();
server.get("api/dates", {
  dates: [
    { dateName: "2020-07-26", originalEntry: "July 26 2020" },
    { dateName: "2019-01-15", originalEntry: "January 15 2019" },
    { dateName: "2020-07-01", originalEntry: "July 7 2020" },
    { dateName: "2021-12-19", originalEntry: "December 19 2021" },
    { dateName: "2019-10-07", originalEntry: "October 7 2019" }
  ],
});

export const addDate = (date) => ({ type: ADD_DATE, date });

export const fetchData = () => {
  return (dispatch) => {
    return fetch("api/dates")
      .then((res) => res.json())
      .then((json) => dispatch({ type: FETCH_DATA, data: json.dates }))
      .catch((err) => dispatch({ type: ERROR, msg: "Unable to fetch data" }));
  };
};
