import styled from "@emotion/styled";
import moment from "moment";
import Calendar from "../../components/Calendar/organisms/Calendar";

const Container = styled.div`
  min-height: 500px;
`;

interface Props {}

const PracticePage = ({}: Props) => {
  console.log(moment([2022, 0, 31]).month(3).format("YYYY-MM-DD"));

  return (
    <Container>
      <div style={{ marginTop: "200px" }} />
      <Calendar />
    </Container>
  );
};
export default PracticePage;
