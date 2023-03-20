import styled from "@emotion/styled";
import { Background, Controls, MiniMap, ReactFlow } from "reactflow";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, notification, Tooltip } from "antd";
import useStageNodeFlow from "@components/Flow/hooks/useStageNodeFlow";
import { IStageNode } from "@components/Flow/hooks/types";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Contents = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1;
`;

const initialNodes: IStageNode[] = [];

interface Props {}

const FlowTemplate = ({}: Props) => {
  const [api, contextHolder] = notification.useNotification();

  const { stageNodes, stageEdges, onNodesChange, onEdgesChange, onConnect, addNewNode, nodeTypes } =
    useStageNodeFlow(initialNodes);

  function openNotification() {
    api.open({
      message: "새 노드가 추가되었습니다.",
      description: "새 노드가 추가되었습니다. 움직이고, 연결해 보세요.",
      style: {
        width: 400,
      },
    });
  }

  return (
    <Container>
      {contextHolder}
      <Contents>
        <ButtonWrapper>
          <Tooltip title={"add New Node"}>
            <Button
              type="primary"
              shape="circle"
              icon={<PlusSquareOutlined />}
              onClick={() => {
                addNewNode(() => {
                  openNotification();
                });
              }}
            />
          </Tooltip>
        </ButtonWrapper>
        <ReactFlow
          nodes={stageNodes}
          edges={stageEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </Contents>
    </Container>
  );
};

export default FlowTemplate;
