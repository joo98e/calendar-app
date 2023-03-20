import styled from "@emotion/styled";
import { useState } from "react";
import { CirclePicker, Color, ColorResult } from "react-color";

const ColorPickerWrapper = styled.div`
  & > div {
    width: 100% !important;
  }
`;

interface Props {
  circleSize?: number;
  onChangeResult: (colorResult: ColorResult) => any;
}

const CustomColorPicker = ({ circleSize = 16, onChangeResult }: Props) => {
  const [currentColor, setCurrentColor] = useState<Color>();

  function onChangeHandler(value: ColorResult) {
    onChangeResult && onChangeResult(value);
    setCurrentColor(value.rgb);
  }

  return (
    <ColorPickerWrapper>
      <CirclePicker color={currentColor} onChange={onChangeHandler} circleSize={circleSize} />
    </ColorPickerWrapper>
  );
};

export default CustomColorPicker;
