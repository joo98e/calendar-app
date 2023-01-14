import styled from "@emotion/styled";
import Calendar from "../../components/Calendar/components/organisms/Calendar";
import HeadForCalendarPage from "@components/common/head/HeadForCalendarPage";

const Container = styled.div`
  min-height: 500px;
`;

interface Props {}

const PracticePage = ({}: Props) => {
  return (
    <Container>
      <HeadForCalendarPage title={"Calendar Page"} />
      <div style={{ marginTop: "100px" }} />
      <Calendar />
    </Container>
  );
};
export default PracticePage;
