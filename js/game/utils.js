export const getColorValue = (inputElement, defaultColor = "#ff0000") => {
    return inputElement ? inputElement.value : defaultColor;
  };
  