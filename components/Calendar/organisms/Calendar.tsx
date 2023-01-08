import styled from "@emotion/styled";
import { useState } from "react";
import moment, { Moment } from "moment";
import useCalendar from "../hooks/useCalendar";
import { GetWeeksInfoResult } from "../hooks/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0;
`;

const CalendarBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CalendarWeek = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CalendarDay = styled.div``;

const Paragraph = styled.p`
  display: flex;
  align-content: center;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  cursor: pointer;
`;

interface Props {}

const Calendar = ({}: Props) => {
  const { getMoment, getFormat, setMoment, getWeeksInfo, handleClickPrevMonth, handleClickNextMonth } = useCalendar();

  const weeksInfo: GetWeeksInfoResult = getWeeksInfo();

  return (
    <Container>
      <CalendarHeader>
        <Button>이전 달</Button>
        <Paragraph>{getMoment.format("YYYY년 MM월")}</Paragraph>
        <Button>다음 달</Button>
      </CalendarHeader>
      <CalendarBody>
        {["일", "월", "화", "수", "목", "금", "토"].map((dddd, index) => (
          <Paragraph key={index}>{dddd}</Paragraph>
        ))}

        {weeksInfo.weeks.map((weeks, index) => {
          return (
            <CalendarWeek key={index}>
              {weeks.map((day) => {
                return <CalendarDay key={day.D}>{day.D}</CalendarDay>;
              })}
            </CalendarWeek>
          );
        })}
      </CalendarBody>
    </Container>
  );
};

export default Calendar;
