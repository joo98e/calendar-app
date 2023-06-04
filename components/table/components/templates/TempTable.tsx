import styled from "@emotion/styled";
import { Table } from "antd";

const Container = styled.div``;

interface Props {}

const TempTable = ({}: Props) => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <Container>
      <Table size={"large"} pagination={false} dataSource={dataSource} columns={columns} />
    </Container>
  );
};

export default TempTable;
