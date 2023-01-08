import styled from "@emotion/styled";
import { useState } from "react";
import moment, { Moment } from "moment";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

interface Props {}

const Calendar = ({}: Props) => {
  const [getMoment, setMoment] = useState<Moment>(moment());

  return <Container></Container>;
};

export default Calendar;
