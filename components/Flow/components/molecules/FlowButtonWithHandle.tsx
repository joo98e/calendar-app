import styled from "@emotion/styled";
import { Handle, Position } from "reactflow";
import { Button } from "antd";
import { CSSProperties } from "react";

const Container = styled.div`
  position: relative;
  z-index: 1;

  & button {
    width: 100%;
  }
`;

const style: CSSProperties = {
  position: "absolute",
  top: "50%",
  right: "-1rem",
  transform: "translateY(-50%)",
};

interface Props {
  id: string;
  text: string;
}

const FlowButtonWithHandle = ({ id, text }: Props) => {
  return (
    <Container>
      <Handle id={id} type={"target"} position={Position.Left} style={style} />
      <Button>{text}</Button>
      <Handle id={id} type={"source"} position={Position.Right} style={style} />
    </Container>
  );
};

export default FlowButtonWithHandle;
