import { createServer } from "miragejs";
import { ADD_DATE, FETCH_DATA, ERROR } from "./types";

let server = createServer();
server.get("api/dates", {
  dates: [
    { dateName: "01 Jan 1999" },
    { dateName: "02 Feb 2000" },
    { dateName: "03 Mar 2001" },
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
