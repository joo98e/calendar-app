import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { Card, Input } from "antd";
import FlowButtonWithHandle from "@components/Flow/components/molecules/FlowButtonWithHandle";

const handleStyle = { left: 10 };

function Simple({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Card title={"Node"} style={{ width: 300 }}>
      <Input id="text" name="text" onChange={onChange} />
      <FlowButtonWithHandle id={"1"} text={"버튼"} />
    </Card>
  );
}

function Slite({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Card title={"Node"} style={{ width: 300 }}>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Slite</label>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
    </Card>
  );
}

const StageNode = {
  Simple: Simple,
  Slite: Slite,
};

export default StageNode;
