import React, { useContext } from "react";
import { SeatContext } from "./SeatContext";
import GlobalStyles from "./GlobalStyles";

function App() {
  const {
    state: { hasLoaded, seats, numOfRows, seatsPerRow },
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  console.log(hasLoaded);

  return (
    <>
      <GlobalStyles />
      This venue has {numOfRows} rows and {seatsPerRow} seats per row.
    </>
  );
}

export default App;
