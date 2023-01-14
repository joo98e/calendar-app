import styled from "@emotion/styled";
import Calendar from "../../components/Calendar/components/organisms/Calendar";
import SeoHeadCalendarPage from "@components/common/head/SeoHeadCalendarPage";

const Container = styled.div`
  min-height: 500px;
`;

interface Props {}

const PracticePage = ({}: Props) => {
  return (
    <Container>
      <SeoHeadCalendarPage title={"Calendar Page"} />
      <div style={{ marginTop: "100px" }} />
      <Calendar />
    </Container>
  );
};
export default PracticePage;
