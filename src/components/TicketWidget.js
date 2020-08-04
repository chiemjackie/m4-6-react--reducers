import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRowName } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import Seat from "./Seat";

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, hasLoaded },
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
                return (
                  <SeatWrapper key={seatIndex}>
                    <Seat rowName={rowName} seatIndex={seatIndex} />
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

export default TicketWidget;
