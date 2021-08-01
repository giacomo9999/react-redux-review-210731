import { useDispatch, useSelector } from "react-redux";
import { addDate, fetchData } from "./actions";
import { useRef, useState, useEffect } from "react";

import validateAndFormatDate from "./processInput";

import "./styles.css";

export default function App() {
  const [errData, setErrData] = useState("No errors yet");
  const [submitButtonState, setSubmitButtonState] = useState(false);

  const dateData = useSelector((state) => state.dates);
  const dispatch = useDispatch();
  const dateName = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchData());
    }, 2000);
  }, []);

  const handleAddDate = () => {
    const newDate = validateAndFormatDate(dateName.current.value);
    if (newDate === "invalid") {
      setErrData("Invalid date.");
    } else if (newDate.split("-")[0] < 2019) {
      setErrData("Your date " + newDate + " was too old. Please try again.");
      dateName.current.value = "";
    } else {
      setSubmitButtonState(true);
      setTimeout(() => {
        console.log("Adding date...", newDate);
        dispatch(
          addDate({ dateName: newDate, originalEntry: dateName.current.value })
        );
        dateName.current.value = "";
        setSubmitButtonState(false);
        setErrData(
          "Your date- " + newDate + " -was successfully tested and stored."
        );
      }, 2000);
    }
  };

  const submitButton = (submitting) => {
    return submitting ? (
      <button disabled>SUBMITTING...</button>
    ) : (
      <button onClick={handleAddDate}>SUBMIT</button>
    );
  };

  const yearColumn = (year) => {
    console.log(dateData);
    const filteredDateData = dateData.filter((date) => {
      return parseInt(date.dateName.split("-")[0]) === year;
    });
    console.log(filteredDateData);
    return (
      <div className="year-column">
        <h2>{year}</h2>
        {filteredDateData.map((date, index) => (
          <div className="container-inner" key={index}>
            <h3>{date.dateName}</h3>
            <p>{date.originalEntry}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container-outer">
      <div className="years-box">
        {yearColumn(2019)}
        {yearColumn(2020)}
        {yearColumn(2021)}
      </div>
      <input type="text" ref={dateName} />
      <div className="spacer10" />
      {submitButton(submitButtonState)}
      <h4>{errData}</h4>
    </div>
  );
}
