import React, { useEffect, useContext } from "react";

import { SeatContext } from "./SeatContext";

import GlobalStyles from "./GlobalStyles";
import TicketWidget from "./TicketWidget";

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext);

  useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      <TicketWidget />
    </>
  );
}

export default App;
