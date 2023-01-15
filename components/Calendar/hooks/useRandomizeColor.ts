const useGenerateRandomColor = () => {
  function generateColor() {
    return "#" + Math.random().toString(16).substring(2, 8);
  }

  function generateColorOpacity(opacity: number = 0.5) {
    if (opacity >= 1) return "#FFFFFF";
    const opacityValue = (opacity * 10).toString();
    return generateColor() + opacityValue + opacityValue;
  }

  return {
    generateColor: generateColor,
    generateColorOpacity: generateColorOpacity,
  };
};
export default useGenerateRandomColor;
