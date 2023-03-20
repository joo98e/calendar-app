import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { Card, Input } from "antd";
import FlowButtonWithHandle from "@components/Flow/components/molecules/FlowButtonWithHandle";
import { NodeProps } from "@reactflow/core/dist/esm/types/nodes";
import { IStageNode } from "@components/Flow/hooks/types";

function Simple(props: NodeProps<IStageNode>) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Card title={"Node"} style={{ width: 300 }}>
      <Input id="text" name="text" onChange={onChange} />
      <FlowButtonWithHandle
        id={props.id}
        text={"버튼"}
        onClick={() => {
          console.log(props);
        }}
      />
    </Card>
  );
}

function Slite({ data }: NodeProps) {
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
      <Handle type="source" position={Position.Bottom} id="b" />
    </Card>
  );
}

const StageNode = {
  Simple: Simple,
  Slite: Slite,
};

export default StageNode;
