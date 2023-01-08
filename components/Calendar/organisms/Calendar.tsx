import styled from "@emotion/styled";
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

const CalendarBodyRowBase = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.5rem;
`;

const CalendarBodyHeader = styled(CalendarBodyRowBase)`
  text-align: left;
  background: darkslategray;
`;

const CalendarWeek = styled(CalendarBodyRowBase)``;

const CalendarDay = styled.div`
  height: 128px;
`;

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
  const { getMoment, getWeeksInfo, handleClickPrevMonth, handleClickNextMonth } = useCalendar();

  const weeksInfo: GetWeeksInfoResult = getWeeksInfo();

  return (
    <Container>
      <CalendarHeader>
        <Button onClick={handleClickPrevMonth}>이전 달</Button>
        <Paragraph>{getMoment.format("YYYY년 MM월")}</Paragraph>
        <Button onClick={handleClickNextMonth}>다음 달</Button>
      </CalendarHeader>
      <CalendarBody>
        <CalendarBodyHeader>
          {["일", "월", "화", "수", "목", "금", "토"].map((dddd, index) => (
            <Paragraph key={index}>{dddd}</Paragraph>
          ))}
        </CalendarBodyHeader>

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
