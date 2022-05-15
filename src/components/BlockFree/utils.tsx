declare global {
  var REMAIN_CENTER_PX: number;
  var WIDTH: number;
}

export type TBlockEvent = React.MouseEvent | React.TouchEvent;
export type TShape = "circle" | "square" | number;
type TPositionMouse = number | string;
type TBlockRef = React.RefObject<HTMLDivElement> | { current: "" };
type TTranslateElm = (
  x: TPositionMouse,
  y: TPositionMouse,
  blockRef?: TBlockRef
) => any;

// GOLD NUMBER
export const RATIO_CENTER_BLOCK = 1.6180339877;

export const changeToPx = (num: number | string) => `${num}px`;
export const setElmRefTranslate: TTranslateElm = (x, y, blockRef) => {
  if (!blockRef || !blockRef.current) return;
  let tempX = "";
  let tempY = "";

  if (typeof x === "number") tempX = x.toString();
  if (typeof y === "number") tempY = y.toString();

  if (!tempX.includes("px")) tempX = changeToPx(tempX);
  if (!tempY.includes("px")) tempY = changeToPx(tempY);

  blockRef.current.style.transform = `translate3d(${tempX}, ${tempY}, 0)`;
  blockRef.current.style.touchAction = "none";
  blockRef.current.style.userSelect = "none";
};

const getElmRef =
  (blockRef: TBlockRef) => (x: TPositionMouse, y: TPositionMouse) =>
    setElmRefTranslate(x, y, blockRef);

export const getClientElm = (
  e: React.MouseEvent | React.TouchEvent,
  eventName: "clientY" | "clientX"
) => {
  const isTouchEvent = e instanceof TouchEvent;
  const isMouseEvent = e instanceof MouseEvent;
  console.log("isTouchEvent:", isTouchEvent);
  console.log("isMouseEvent:", isMouseEvent);
  if (isTouchEvent) return e.touches[0][eventName];
  if (isMouseEvent) return e[eventName];

  return 0;
};

export const setBlockPosition: TTranslateElm = (
  posMouseX,
  posMouseY,
  blockRef
) => {
  if (!blockRef || !blockRef.current) return;

  const DEFAULT_MAX =
    -(globalThis.WIDTH / globalThis.REMAIN_CENTER_PX) - RATIO_CENTER_BLOCK * 3;
  const SCREEN_MAX_HEIGHT =
    window.innerHeight - globalThis.REMAIN_CENTER_PX * RATIO_CENTER_BLOCK - 10;
  const SCREEN_MAX_WIDTH =
    window.innerWidth - globalThis.REMAIN_CENTER_PX * RATIO_CENTER_BLOCK - 10;

  const TOP = posMouseY <= 0;
  const LEFT = posMouseX <= 0;
  const RIGHT = posMouseX >= SCREEN_MAX_WIDTH;
  const BOTTOM = posMouseY >= SCREEN_MAX_HEIGHT;

  const setTranslateCss = getElmRef(blockRef);

  switch (true) {
    case TOP && LEFT:
      setTranslateCss(DEFAULT_MAX, DEFAULT_MAX);
      break;
    case TOP && RIGHT:
      setTranslateCss(SCREEN_MAX_WIDTH, DEFAULT_MAX);
      break;
    case BOTTOM && LEFT:
      setTranslateCss(DEFAULT_MAX, SCREEN_MAX_HEIGHT);
      break;
    case BOTTOM && RIGHT:
      setTranslateCss(SCREEN_MAX_WIDTH, SCREEN_MAX_HEIGHT);
      break;

    case TOP:
      setTranslateCss(posMouseX, DEFAULT_MAX);
      break;
    case RIGHT:
      setTranslateCss(SCREEN_MAX_WIDTH, posMouseY);
      break;
    case BOTTOM:
      setTranslateCss(posMouseX, SCREEN_MAX_HEIGHT);
      break;
    case LEFT:
      setTranslateCss(DEFAULT_MAX, posMouseY);
      break;

    default:
      setTranslateCss(posMouseX, posMouseY);
      break;
  }
};
