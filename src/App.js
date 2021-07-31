import { useDispatch, useSelector } from "react-redux";
import { addDate } from "./actions";
import { useRef, useState, useEffect } from "react";
import { createServer } from "miragejs";
import "./styles.css";

let server = createServer();
server.get("api/dates", {
  dates: [
    { dateName: "01 Jan 1999" },
    { dateName: "02 Feb 2000" },
    { dateName: "03 Mar 2001" },
  ],
});

export default function App() {
  // const [errData, setErrData] = useState(null);
  let [junkState, setJunkState] = useState([]);
  const dateData = useSelector((state) => state.dates);
  const dispatch = useDispatch();
  const dateName = useRef(null);

  useEffect(() => {
    fetch("api/dates")
      .then((res) => res.json())
      .then((data) => {
        setJunkState(data.dates);
      });
  }, []);

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
      {junkState.length !== 0 ? <p>{junkState[0].dateName}</p> : <p>No Data</p>}
    </div>
  );
}
