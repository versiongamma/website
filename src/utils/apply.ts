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

export const applyConditionally = <T>(
  condition: boolean,
  style: T,
  alternate?: T
) => {
  if (condition) {
    return style;
  }

  return alternate ?? undefined;
};
