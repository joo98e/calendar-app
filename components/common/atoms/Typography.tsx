import styled from "@emotion/styled";
import { css } from "@emotion/react";

const _Typography = styled.p<{
  size: string;
  variant: Variant;
}>`
  font-size: ${(props) => props.size};
  font-weight: 400;

  ${(props) => {
    switch (props.variant) {
      case "plain":
        return css``;
      case "accent":
        return css`
          font-weight: 700;
        `;
      case "desc":
        return css`
          color: #a8a8a8;
        `;
      case "error":
        return css`
          color: #ff0f0f;
        `;
      default:
        return css``;
    }
  }}
`;

type Variant = "plain" | "accent" | "desc" | "error";

interface Props {
  variant?: Variant;
  size?: string;
  children: string | JSX.Element;
}

const Typography = ({ variant = "plain", size = "0.8rem", children }: Props) => {
  return (
    <_Typography size={size} variant={variant}>
      {children}
    </_Typography>
  );
};

export default Typography;
