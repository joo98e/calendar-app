import styled from "@emotion/styled";
import { Schedule } from "@store/slice/Calendar.slice.types";
import { Popover } from "antd";
import useGenerateRandomColor from "@components/Calendar/hooks/useRandomizeColor";

const Container = styled.div<{
  bgColor: string;
}>`
  background: ${(props) => props.bgColor};
`;

const Paragraph = styled.p`
  font-size: 1rem;
`;

const DailyTitle = styled(Paragraph)`
  font-size: 0.7rem;
  color: #333;

  &:before {
    content: "· ";
  }
`;

interface Props {
  dailySchedule: Schedule;
}

const DailySchedule = ({ dailySchedule }: Props) => {
  const { generateColorOpacity } = useGenerateRandomColor();

  return (
    <Container bgColor={generateColorOpacity(0.7)}>
      <Popover title={dailySchedule.title} content={dailySchedule.description}>
        <DailyTitle>{dailySchedule.title}</DailyTitle>
      </Popover>
    </Container>
  );
};

export default DailySchedule;
