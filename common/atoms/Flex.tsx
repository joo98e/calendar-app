import styled from "@emotion/styled";

interface IFlex {
  justifyContent?: "center" | "flex-start" | "flex-end";
  gap?: number;
}

const BaseFlex = styled.div<IFlex>`
  display: flex;
  gap: ${(props) => props.gap}rem;
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : "flex-start")};
`;

export const Flex = styled(BaseFlex)``;

export const FlexColumn = styled(BaseFlex)`
  display: flex;
  flex-direction: column;
`;
