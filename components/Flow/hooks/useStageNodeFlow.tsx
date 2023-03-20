import uuid from "react-uuid";
import { IStageNode } from "@components/Flow/hooks/types";
import { addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from "reactflow";
import { useCallback, useMemo } from "react";
import StageNode from "@components/Flow/components/organisms/StageNode";

export default function useStageNodeFlow(initialNodes: IStageNode[]) {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState([]);

  const nodeTypes = useMemo(
    () => ({
      SIMPLE_NODE: StageNode.Simple,
      SLITE_STAGE_NODE: StageNode.Slite,
    }),
    []
  );

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  function addNewNode(cb: () => void) {
    const nextId = nodes.length
      ? Math.max.apply(
          null,
          nodes.map((node) => node.data.num)
        ) + 1
      : 1;

    console.log(nextId);
    const newNode: IStageNode = {
      id: uuid(),
      type: "SIMPLE_NODE",
      data: {
        num: nextId,
        sourceExpoNum: 1,
        title: "title_" + nextId,
        buttonText: "button_" + nextId,
        description: "desc_" + nextId,
        stageNodeType: "SIMPLE_NODE",
      },

      position: { x: 0, y: 0 },
    };

    setNodes((nodes) => [...nodes, newNode]);
    cb();
  }

  return {
    initialNodes: initialNodes,
    stageNodes: nodes,
    stageEdges: edges,
    setStageNodes: setNodes,
    setStageEdges: setEdges,
    onNodesChange: onNodesChange,
    onEdgesChange: onEdgesChange,
    onConnect: onConnect,
    addNewNode: addNewNode,
    nodeTypes: nodeTypes,
  };
}
