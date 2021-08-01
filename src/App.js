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
        dispatch(addDate({ dateName: newDate }));
        dateName.current.value = "";
        setSubmitButtonState(false);
        setErrData(
          "Your date " + newDate + " was successfully tested and stored."
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

  return (
    <div className="container-outer">
      {dateData.map((date, index) => (
        <p key={index}>{date.dateName}</p>
      ))}
      <input type="text" ref={dateName} />
      <div className="spacer10" />
      {submitButton(submitButtonState)}
      <h4>{errData}</h4>
    </div>
  );
}
