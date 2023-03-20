import { Node } from "reactflow";

export type StageNodeType = "SIMPLE_NODE" | "SLITE_STAGE_NODE";

interface StageTemplateNodeDto {
  num: number;
  sourceExpoNum: number;
  title: string;
  buttonText: string;
  description: string;
  stageNodeType: StageNodeType;
}

export type IStageNode = Node<StageTemplateNodeDto, StageNodeType>;
