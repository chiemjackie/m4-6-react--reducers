import React, { createContext, useReducer } from "react";

export const SeatContext = createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "GET-SEAT-INFO": {
      const { bookedSeats, numOfRows, seatsPerRow } = action;
      return {
        hasLoaded: true,
        seats: bookedSeats,
        numOfRows: numOfRows,
        seatsPerRow: seatsPerRow,
      };
    }

    default: {
      console.log("Error in reducer");
      throw new Error(`Unrecognized action: ${action.type}`);
    }
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: "GET-SEAT-INFO",
      ...data,
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: { receiveSeatInfoFromServer },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
