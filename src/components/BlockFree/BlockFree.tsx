import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import {
  circleImg,
  squareImg,
  dinosaurImg,
  chickenRunImg,
  dogRunImg,
  walkerImg,
  ballonImg,
  rocketImg,
  settingImg,
  yellowImg,
  dogHopImg,
  passengerImg,
  pandaImg,
  gilunImg,
} from "./images";

import {
  changeToPx,
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
  dogRunImg,
  walkerImg,
  ballonImg,
  rocketImg,
  settingImg,
  yellowImg,
  dogHopImg,
  passengerImg,
  pandaImg,
  gilunImg,
];

let clickTime: any;
let timer: NodeJS.Timeout;

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
  const [isDraggedState, setIsDraggedState] = useState<boolean>(false);
  const [posMouseX, setPosMouseX] = useState(0);
  const [posMouseY, setPosMouseY] = useState(0);

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
    });
    window.addEventListener("touchmove", (e: any) => {
      if (isDraggedRef.current) blockFly(e);
    });
    window.addEventListener("mouseout", function (e) {
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        isDraggedRef.current = false;
      }
    });
  }, []);
  useEffect(() => {
    if (!isDraggedState) {
      timer = setTimeout(() => {
        if (!blockRef.current) return;
        blockRef.current.classList.add(styles.pending);
      }, 8000);
    } else {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isDraggedState]);

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
  ): any => {
    e.stopPropagation();
    isDraggedRef.current = false;
    setIsDraggedState(false);
  };
  const handleMDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent
  ) => {
    clickTime = new Date().getTime();
    isDraggedRef.current = true;
    setIsDraggedState(true);
    e.stopPropagation();
  };
  const handleMMove = (e: TBlockEvent) => {
    if (isDraggedRef.current) blockFly(e);
  };
  const handleClick = (e: any) => {
    setPosMouseX(e.clientX);
    setPosMouseY(e.clientY);
    if (new Date().getTime() - clickTime < 150) {
      console.log("CLICKED", e);
      if (!isDraggedRef.current && onClick) {
        onClick();
      }
      // click
    }
  };

  return ReactDOM.createPortal(
    <>
      <div
        ref={blockRef}
        className={`${styles.BlockFree} 
        ${isDraggedState ? styles.isDragging : ""}
        `}
        // PC
        onMouseDown={handleMDown}
        onMouseMove={handleMMove}
        onMouseUp={handleMUp}
        // MB
        onTouchStart={handleMDown}
        onTouchMove={handleMMove}
        onTouchEnd={handleMUp}
        onClick={handleClick}
        style={{ ...Style }}
      ></div>
      {isDisplay && (
        <span
          className={`${styles.noSelect} ${styles.children}`}
          style={
            {
              "--pos-x-top": changeToPx(
                posMouseY - globalThis.REMAIN_CENTER_PX * RATIO_CENTER_BLOCK
              ),
              "--pos-x-left": changeToPx(
                posMouseX - globalThis.REMAIN_CENTER_PX * RATIO_CENTER_BLOCK
              ),
            } as React.CSSProperties
          }
        >
          children
        </span>
      )}
    </>,

    document.querySelector?.("body") as any
  );
};

export default BlockFree;
