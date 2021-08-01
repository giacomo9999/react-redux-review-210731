import { useDispatch, useSelector } from "react-redux";
import { addDate, fetchData } from "./actions";
import { useRef, useState, useEffect } from "react";

import "./styles.css";

export default function App() {
  const [errData, setErrData] = useState("No errors yet");

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
    console.log("Adding date...", dateName.current.value);
    dispatch(addDate({ dateName: dateName.current.value }));
  };

  return (
    <div className="container-outer">
      {dateData.map((date, index) => (
        <p key={index}>{date.dateName}</p>
      ))}
      <input type="text" ref={dateName} />
      <button onClick={handleAddDate}>ADD DATE</button>
    </div>
  );
}
