export const applyConditionalStyle = (
  condition: boolean,
  style: string,
  alternate?: string
) => {
  if (condition) {
    return style;
  }

  return alternate ?? "";
};
