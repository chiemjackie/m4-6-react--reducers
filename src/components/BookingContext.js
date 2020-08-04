import React, { createContext, useReducer } from "react";

export const BookingContext = createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatID: null,
  price: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "begin-booking-process":
      return {
        ...state,
        status: "seat-selected",
        seatSelectedID: action.seat,
        price: action.price,
      };
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const beginBookingProcess = (seatInformation) => {
    dispatch({
      type: "begin-booking-process",
      ...seatInformation,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
