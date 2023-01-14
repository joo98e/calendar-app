import { Drawer } from "antd";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  drawerTitle: string;
  children: JSX.Element;

  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;

  width?: number;
}

const CustomDrawer = ({ children, onClose, drawerTitle, width = 720, open }: Props) => {
  return (
    <Drawer
      title={drawerTitle}
      width={width}
      open={open}
      onClose={onClose}
      bodyStyle={{ paddingBottom: 80 }}
      extra={<></>}
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
