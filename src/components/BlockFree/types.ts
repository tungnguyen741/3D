declare global {
  var REMAIN_CENTER_PX: number;
  var WIDTH: number;
}

export type TBlockEvent = React.MouseEvent | React.TouchEvent;
export type TShape = "circle" | "square" | number;
export type TPositionMouse = number | string;
export type TBlockRef = React.RefObject<HTMLDivElement> | { current: "" };
export type TTranslateElm = (
  x: TPositionMouse,
  y: TPositionMouse,
  blockRef?: TBlockRef
) => any;

// GOLD NUMBER
export const RATIO_CENTER_BLOCK = 1.6180339877;
