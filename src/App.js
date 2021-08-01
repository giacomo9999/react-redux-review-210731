import { useDispatch, useSelector } from "react-redux";
import { addDate, fetchData } from "./actions";
import { useRef, useState, useEffect } from "react";

import validateAndFormatDate from "./processInput";

import "./styles.css";

export default function App() {
  const [errData, setErrData] = useState("No errors yet");
  const [submitButtonState, setSubmitButtonState] = useState(false);

  const dateData = useSelector((state) => state.dates);
  const errorDataMsg = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const dateName = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchData());
    }, 2000);
    setAndLogErrData();
  }, []);

  const setAndLogErrData = () => {
    setErrData(errorDataMsg);
    console.log(errData);
  };

  const handleAddDate = () => {
    console.log(validateAndFormatDate(dateName.current.value));
    setSubmitButtonState(true);
    setTimeout(() => {
      console.log(
        "Adding date...",
        validateAndFormatDate(dateName.current.value)
      );
      dispatch(
        addDate({ dateName: validateAndFormatDate(dateName.current.value) })
      );
      dateName.current.value = "";
      setSubmitButtonState(false);
    }, 2000);
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
      {submitButton(submitButtonState)}
    </div>
  );
}
