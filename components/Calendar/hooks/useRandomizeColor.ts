interface GetComplementaryColor {
  hexColor: string;
  brightColor?: string;
  darkColor?: string;
}

const useColor = () => {
  function generateRandomRGBColor() {
    return "#" + Math.random().toString(16).substring(2, 8);
  }

  function generateRGBAColor(opacity: number = 0.5) {
    if (opacity >= 1) return "#FFFFFF";
    const opacityValue = (opacity * 10).toString();
    return generateRandomRGBColor() + opacityValue + opacityValue;
  }

  function getComplementaryColor({ hexColor, darkColor = "#000", brightColor = "#fff" }: GetComplementaryColor) {
    const c = hexColor.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma < 127.5 ? brightColor : darkColor;
  }

  return {
    generateColor: generateRandomRGBColor,
    generateColorOpacity: generateRGBAColor,
    getComplementaryColor: getComplementaryColor,
  };
};
export default useColor;
