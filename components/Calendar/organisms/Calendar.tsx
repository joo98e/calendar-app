import styled from "@emotion/styled";
import useCalendar from "../hooks/useCalendar";
import { GetWeeksInfoResult, ThisMonthIs } from "../hooks/types";
import { css } from "@emotion/react";
import React, { useState } from "react";
import { Drawer, Space } from "antd";

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
  justify-content: center;
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
  thisMonthIs: ThisMonthIs;
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

  &:hover {
    background: #f1f1f1;
  }

  ${(props) => props.thisMonthIs === "CURRENT" && css``};
  ${(props) =>
    props.thisMonthIs === "PREV" &&
    css`
      color: #989898;
    `};
  ${(props) =>
    props.thisMonthIs === "NEXT" &&
    css`
      color: #989898;
    `};
`;

const Paragraph = styled.p`
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  cursor: pointer;
`;

interface Props {}

const Calendar = ({}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { getMoment, getWeeksInfo, handleClickPrevMonth, handleClickNextMonth } = useCalendar();

  const weeksInfo: GetWeeksInfoResult = getWeeksInfo();

  function onClose() {
    setOpen(false);
  }

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
                return (
                  <CalendarDay key={day.D} thisMonthIs={day.thisMonthIs} onClick={() => setOpen(true)}>
                    {day.D}
                  </CalendarDay>
                );
              })}
            </CalendarWeek>
          );
        })}
      </CalendarBody>

      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose}>Submit</Button>
          </Space>
        }
      ></Drawer>
    </Container>
  );
};

export default Calendar;
