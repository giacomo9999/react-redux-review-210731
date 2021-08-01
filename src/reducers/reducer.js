import { ADD_DATE, FETCH_DATA, ERROR } from "../types";

const initialState = { dates: [] };

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATE:
      console.log("Reducer adding date...", action.date);
      return { ...state, dates: [...state.dates, action.date] };
    case FETCH_DATA:
      console.log("Reducer fetching data...");
      return { ...state, dates: action.data };
    case ERROR:
      console.log("Reducer encountered an error fetching data.");
      return { ...state, error: action.msg };
    default:
      return state;
  }
};
export default appReducer;
