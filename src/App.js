import { useDispatch, useSelector } from "react-redux";
import { addDate } from "./actions";
import { useRef } from "react";
import "./styles.css";

export default function App() {
  const dateData = useSelector((state) => state.dates);
  const dispatch = useDispatch();
  const dateName = useRef(null);

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
