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

const leftStyle: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "-1rem",
  transform: "translateY(-50%)",
};

const rightStyle: CSSProperties = {
  position: "absolute",
  top: "50%",
  right: "-1rem",
  transform: "translateY(-50%)",
};

interface Props {
  id: string;
  text: string;
  onClick: () => void;
}

const FlowButtonWithHandle = ({ id, text, onClick }: Props) => {
  return (
    <Container>
      <Handle id={id} type={"target"} position={Position.Left} style={leftStyle} />
      <Button onClick={onClick}>{text}</Button>
      <Handle id={id} type={"source"} position={Position.Right} style={rightStyle} />
    </Container>
  );
};

export default FlowButtonWithHandle;
