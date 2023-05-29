import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import usePrintPdf from "@common/helper/exportPdf/usePrintPdf";
import customAxiosInstance from "../../api/common/customAxiosInstance";
import useDownloadPdf from "@common/helper/exportPdf/useDownloadPdf";
import { useRef } from "react";

const Container = styled.div``;

interface Props {}

const pdf = ({}: Props) => {
  const ref = useRef<HTMLDivElement>();
  const { run } = useDownloadPdf();

  async function testPdf() {
    await run({
      filename: "Html For Export.pdf",
      content: ref?.current?.innerHTML,
    });
  }

  return (
    <Container ref={ref}>
      <Typography>Html For Export PDF</Typography>
      <Button onClick={testPdf}>click me</Button>
    </Container>
  );
};

export default pdf;
