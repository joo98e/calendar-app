import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import useCalendar from "@components/Calendar/hooks/useCalendar";
import { GetWeeksInfoResult, MonthIs } from "@components/Calendar/hooks/types";
import CalendarScheduleAddDrawer from "@components/Calendar/components/organisms/CalendarScheduleAddDrawer";
import { useAppSelector } from "@store/index";
import Typography from "@atoms/Typography";
import DailySchedule from "@components/Calendar/components/molecules/DailySchedule";
import { Button, Divider } from "antd";
import UserService from "../../../../api/user/UserService";
import useDownloadPdf from "@common/helper/exportPdf/useDownloadPdf";
import usePrintPdf from "@common/helper/exportPdf/usePrintPdf";
import { PlayCircleOutlined } from "@ant-design/icons";
import ButtonGroup from "antd/lib/button/button-group";
import TempTable from "@components/table/components/templates/TempTable";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  margin: 0 auto;
  padding: 2rem;
  border: 0.5px solid #dddddd;

  color: #1c1c1c;
  @media print {
    @page {
      margin: 0;
    }

    body {
      margin: 1.6cm;
    }
  }
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
  const printObject2 = useRef<HTMLDivElement>(null);

  const [drawerTitle, setDrawerTitle] = useState<string>("");
  const { schedules } = useAppSelector((state) => state.calendarState);

  const { download } = useDownloadPdf();
  const { printComponentRef, print } = usePrintPdf<HTMLDivElement>();

  const { currentMoment, getWeeksInfo, handleClickPrevMonth, handleClickNextMonth, getTodayScheduleArray } = useCalendar();

  async function getAll() {
    const users = await UserService.findAll();
  }

  async function _run() {
    try {
      await download("test.pdf", [printObject2]);
    } catch (e) {}
    return;
  }

  const weeksInfo: GetWeeksInfoResult = getWeeksInfo();

  useEffect(() => {
    void getAll();
  }, []);

  return (
    <Container ref={printComponentRef}>
      <ButtonGroup size={"middle"}>
        <Button onClick={_run}>
          <PlayCircleOutlined />
          export
        </Button>
        <Button onClick={print}>
          <PlayCircleOutlined />
          print
        </Button>
      </ButtonGroup>

      <Divider />
      <TempTable />

      <Divider />

      <CalendarHeader>
        <Button onClick={handleClickPrevMonth}>이전 달</Button>
        <MonthTitle>{currentMoment.format("YYYY년 MM월")}</MonthTitle>
        <Button onClick={handleClickNextMonth}>다음 달</Button>
      </CalendarHeader>
      <CalendarBody ref={printObject2}>
        <div className={"print1"}>
          <div className={"print2"}>
            <div className={"print3"}>
              <CalendarBodyHeader>
                {["일", "월", "화", "수", "목", "금", "토"].map((dddd, index) => (
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
                            setDrawerTitle(`${weeksInfo.currentYear}년 ${weeksInfo.currentMonth}월 ${day.D}일`);
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

              {weeksInfo.weeks.reverse().map((weeks, index) => {
                return (
                  <CalendarWeek key={index}>
                    {weeks.map((day) => {
                      const dailySchedule = getTodayScheduleArray(new Date(`${day.year}-${day.month}-${day.D}`), schedules);
                      return (
                        <CalendarDay
                          key={day.D}
                          thisMonthIs={day.thisMonthIs}
                          onClick={() => {
                            setDrawerTitle(`${weeksInfo.currentYear}년 ${weeksInfo.currentMonth}월 ${day.D}일`);
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
            </div>
          </div>
        </div>
      </CalendarBody>

      <CalendarScheduleAddDrawer title={drawerTitle} />
    </Container>
  );
};
export default Calendar;
