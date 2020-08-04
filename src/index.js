import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import { BookingProvider } from "./components/BookingContext";
import { SeatProvider } from "./components/SeatContext";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BookingProvider>
    <SeatProvider>
      <App />
    </SeatProvider>
  </BookingProvider>,
  rootElement
);
