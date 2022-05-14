import React, { useEffect, useRef } from "react";
import styles from "./index.module.scss";
import {
  circleImg,
  squareImg,
  dinosaurImg,
  chickenRunImg,
  dogBallImg,
  dogRunImg,
  walkerImg,
  ballonImg,
  rocketImg,
  settingImg,
  yellowImg,
  dogHopImg,
  passengerImg,
  pandaImg,
} from "./images";

import {
  getClientElm,
  RATIO_CENTER_BLOCK,
  setBlockPosition,
  TBlockEvent,
  TShape,
} from "./utils";
import ReactDOM from "react-dom";

interface IBlockFree {
  isDisplay: boolean;
  children: React.ReactNode;
  onClick: () => void;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  shape?: TShape;
}
const listCustomRand = [
  circleImg,
  squareImg,
  dinosaurImg,
  chickenRunImg,
  dogBallImg,
  dogRunImg,
  walkerImg,
  ballonImg,
  rocketImg,
  settingImg,
  yellowImg,
  dogHopImg,
  passengerImg,
  pandaImg,
];

const BlockFree: React.FC<IBlockFree> = ({
  isDisplay = false,
  children,
  onClick,
  width = 40,
  height = 40,
  style = {},
  shape = "circle",
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const isDraggedRef = useRef<boolean>(false);
  globalThis.REMAIN_CENTER_PX = width / RATIO_CENTER_BLOCK;
  globalThis.WIDTH = width;

  const getUrlImg = () => {
    if (shape === "circle") return circleImg;
    if (shape === "square") return squareImg;
    return listCustomRand[shape];
  };
  const Style = {
    ...style,
    width,
    height,
    borderRadius: shape === "circle" ? "50%" : "",
    backgroundImage: `url(${getUrlImg()})`,
  };

  useEffect(() => {
    window.addEventListener("mousemove", (e: any) => {
      if (isDraggedRef.current) blockFly(e);
      console.log("mm");
    });
    window.addEventListener("touchmove", (e: any) => {
      if (isDraggedRef.current) blockFly(e);
    });
  }, []);

  const blockFly = (e: TBlockEvent) => {
    if (!blockRef.current) return;
    const isTouchEvent = e instanceof TouchEvent;
    if (isTouchEvent) blockRef.current.style.transition = "0s";
    const posMouseX = getClientElm(e, "clientX") - globalThis.REMAIN_CENTER_PX;
    const posMouseY = getClientElm(e, "clientY") - globalThis.REMAIN_CENTER_PX;
    setBlockPosition(posMouseX, posMouseY, blockRef);
  };

  const handleMUp = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent
  ): void => {
    isDraggedRef.current = false;
  };
  const handleMDown = () => {
    isDraggedRef.current = true;
  };
  const handleMMove = (e: TBlockEvent) => {
    if (isDraggedRef.current) blockFly(e);
  };
  const handleClick = (e: TBlockEvent) => {
    if (!isDraggedRef.current && onClick) {
      onClick();
    }
  };

  return ReactDOM.createPortal(
    <>
      <div
        ref={blockRef}
        className={styles.BlockFree}
        // PC
        onMouseDown={handleMDown}
        onMouseMove={handleMMove}
        onMouseUp={handleMUp}
        // MB
        onTouchStart={handleMDown}
        onTouchMove={handleMMove}
        onTouchEnd={handleMUp}
        onClick={handleClick}
        style={Style}
      ></div>
      {isDisplay && children}
    </>,

    document.querySelector?.("body") as any
  );
};

export default BlockFree;
