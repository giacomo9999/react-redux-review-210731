import { ADD_DATE } from "../types";

const initialState = { dates: [] };

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATE:
      console.log("Reducer adding date...", action.date);
      return { ...state, dates: [...state.dates, action.date] };
    default:
      return state;
  }
};
export default appReducer;
