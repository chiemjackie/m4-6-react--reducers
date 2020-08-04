import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import SeatAvailable from "../assets/seat-available.svg";
import { SeatContext } from "./SeatContext";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, bookedSeats },
  } = useContext(SeatContext);

  if (hasLoaded) {
    return (
      <Wrapper>
        {range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);
          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>

              {range(seatsPerRow).map((seatIndex) => {
                const seatNum = getSeatNum(seatIndex);
                console.log(rowName);
                const seatId = `${rowName}-${seatNum}`;
                const isAvailable = bookedSeats[seatId];
                const toolTipContent = isAvailable
                  ? `Row ${rowName}, Seat ${seatNum} - $185`
                  : "Unavailable";

                return (
                  <SeatWrapper key={seatId}>
                    <Tippy content={toolTipContent}>
                      <Seat src={SeatAvailable} isAvailable={isAvailable} />
                    </Tippy>
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })}
      </Wrapper>
    );
  } else {
    return (
      <ProgressWrapper>
        <CircularProgress />
      </ProgressWrapper>
    );
  }
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  padding: 8px;
  background: #eee;
`;

const ProgressWrapper = styled(Wrapper)`
  background: transparent;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  position: absolute;
  left: -80px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

const Seat = styled.img`
  cursor: pointer;
  filter: ${(props) => (!props.isAvailable ? "grayscale(100%)" : "")};
`;

export default TicketWidget;
