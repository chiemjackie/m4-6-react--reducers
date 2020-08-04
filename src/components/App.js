import React, { useContext } from "react";
import { SeatContext } from "./SeatContext";
import GlobalStyles from "./GlobalStyles";
import TicketWidget from "./TicketWidget";

function App() {
  const {
    state: { hasLoaded, numOfRows, seatsPerRow },
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
      <TicketWidget></TicketWidget>
    </>
  );
}

export default App;
