import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import useCalendar from "@components/Calendar/hooks/useCalendar";
import { GetWeeksInfoResult, MonthIs } from "@components/Calendar/hooks/types";
import CalendarScheduleAddDrawer from "@components/Calendar/components/organisms/CalendarScheduleAddDrawer";
import { useAppSelector } from "@store/index";
import Typography from "@atoms/Typography";
import DailySchedule from "@components/Calendar/components/molecules/DailySchedule";
import { Button } from "antd";
import UserService from "../../../../api/user/UserService";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  margin: 0 auto;
  padding: 2rem;
  border: 0.5px solid #dddddd;

  color: #1c1c1c;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-weight: 700;
  color: #5168bd;
`;

const CalendarBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarBodyRowBase = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.5rem;
`;

const CalendarBodyHeader = styled(CalendarBodyRowBase)`
  margin-top: 72px;
  font-weight: bold;
  text-align: right;
`;

const CalendarWeek = styled(CalendarBodyRowBase)``;

const CalendarDay = styled.div<{
  thisMonthIs: MonthIs;
}>`
  position: relative;
  height: 128px;
  padding: 0.5rem;
  border: transparent;
  border-top: 2px solid #d3d3d3;
  box-sizing: border-box;
  text-align: right;
  transition: all 0.15s ease;
  cursor: pointer;
  background: #fff;
  user-select: none;

  &:hover {
    background: #f1f1f1;
  }

  ${(props) => props.thisMonthIs === "This" && css``};
  ${(props) =>
    props.thisMonthIs === "Last" &&
    css`
      color: #989898;
    `};
  ${(props) =>
    props.thisMonthIs === "Next" &&
    css`
      color: #989898;
    `};
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 100%;
  margin: 0;
`;

const MonthTitle = styled(Paragraph)`
  display: flex;
  align-items: center;
  font-size: 2rem;
`;

interface Props {}

const Calendar = ({}: Props) => {
  const [drawerTitle, setDrawerTitle] = useState<string>("");
  const { schedules } = useAppSelector((state) => state.calendarState);

  const { currentMoment, getWeeksInfo, handleClickPrevMonth, handleClickNextMonth, getTodayScheduleArray } =
    useCalendar();

  async function getAll() {
    const users = await UserService.findAll();
    console.log(users);
  }

  const weeksInfo: GetWeeksInfoResult = getWeeksInfo();

  useEffect(() => {
    getAll();
  }, []);
  return (
    <Container>
      <CalendarHeader>
        <Button onClick={handleClickPrevMonth}>?????? ???</Button>
        <MonthTitle>{currentMoment.format("YYYY??? MM???")}</MonthTitle>
        <Button onClick={handleClickNextMonth}>?????? ???</Button>
      </CalendarHeader>
      <CalendarBody>
        <CalendarBodyHeader>
          {["???", "???", "???", "???", "???", "???", "???"].map((dddd, index) => (
            <Paragraph key={index}>{dddd}</Paragraph>
          ))}
        </CalendarBodyHeader>

        {weeksInfo.weeks.map((weeks, index) => {
          return (
            <CalendarWeek key={index}>
              {weeks.map((day) => {
                const dailySchedule = getTodayScheduleArray(new Date(`${day.year}-${day.month}-${day.D}`), schedules);
                return (
                  <CalendarDay
                    key={day.D}
                    thisMonthIs={day.thisMonthIs}
                    onClick={() => {
                      setDrawerTitle(`${weeksInfo.currentYear}??? ${weeksInfo.currentMonth}??? ${day.D}???`);
                    }}
                  >
                    <Typography size={"1rem"}>{day.D}</Typography>
                    {dailySchedule.slice(0, 3).map((daily, index) => (
                      <DailySchedule key={index} dailySchedule={daily} />
                    ))}
                    {dailySchedule.length >= 4 && <span>more... </span>}
                  </CalendarDay>
                );
              })}
            </CalendarWeek>
          );
        })}
      </CalendarBody>
      <CalendarScheduleAddDrawer title={drawerTitle} />;
    </Container>
  );
};
export default Calendar;
