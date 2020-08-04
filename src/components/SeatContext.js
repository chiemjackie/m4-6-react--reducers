import React, { createContext, useReducer } from "react";

export const SeatContext = createContext();

const initialState = {
  hasLoaded: false,
  bookedSeats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "receive-seat-info-from-server":
      return {
        ...state,
        hasLoaded: true,
        bookedSeats: action.bookedSeats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
      };
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export function SeatProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
}
