import styled from "@emotion/styled";
import { Schedule } from "@store/slice/Calendar.slice.types";
import { Popover } from "antd";
import useColor from "@components/Calendar/hooks/useRandomizeColor";

const Container = styled.div<{
  bgColor: string;
}>`
  background: ${(props) => props.bgColor};
`;

const Paragraph = styled.p`
  font-size: 1rem;
`;

const DailyTitle = styled(Paragraph)<{
  color: string;
}>`
  display: block;
  padding: 0.2rem;
  font-size: 0.7rem;
  color: ${(props) => props.color};

  &:before {
    content: "· ";
  }
`;

interface Props {
  dailySchedule: Schedule;
}

const DailySchedule = ({ dailySchedule }: Props) => {
  const { getComplementaryColor } = useColor();

  const complementaryColor = getComplementaryColor({
    hexColor: dailySchedule.tagColor,
    brightColor: "#fff",
    darkColor: "#000",
  });

  return (
    <Container bgColor={dailySchedule.tagColor}>
      <Popover title={dailySchedule.title} content={dailySchedule.description}>
        <DailyTitle color={complementaryColor ?? "#000"}>{dailySchedule.title}</DailyTitle>
      </Popover>
    </Container>
  );
};

export default DailySchedule;
