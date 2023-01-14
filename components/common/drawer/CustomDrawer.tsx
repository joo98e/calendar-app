import styled from "@emotion/styled";
import { Drawer, Space } from "antd";
import React, { Dispatch, SetStateAction } from "react";

const Button = styled.button`
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  cursor: pointer;
`;

interface Props {
  drawerTitle: string;
  children: JSX.Element;

  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;

  width?: number;
}

const CustomDrawer = ({ children, onClose, drawerTitle, width = 720, open, setOpen }: Props) => {
  function _onClose() {
    setOpen(false);
    onClose && onClose();
  }

  return (
    <Drawer
      title={drawerTitle}
      width={width}
      open={open}
      onClose={onClose}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={_onClose}>취소</Button>
          <Button onClick={_onClose}>저장</Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
