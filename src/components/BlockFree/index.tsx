import React, { useEffect, useRef } from "react";
import styles from "./index.module.scss";

const REMAIN_CENTER_PX = 22;

const BlockFree: React.FC<{
  isDisplay: boolean;
  children: JSX.Element;
  onClick: () => void;
}> = ({ isDisplay = false, children, onClick }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const isDraggedRef = useRef<boolean>(false);

  useEffect(() => {
    window.addEventListener("mousemove", (e: any) => {
      if (isDraggedRef.current) blockFly(e);
    });
    window.addEventListener("touchmove", (e: any) => {
      if (isDraggedRef.current) blockFly(e);
    });
  }, []);

  const blockFly = (e: React.MouseEvent | React.TouchEvent) => {
    if (!blockRef.current) return;
    const isTouchEvent = e instanceof TouchEvent;
    const isMouseEvent = e instanceof MouseEvent;

    const posMouseX = isMouseEvent
      ? e.clientX
      : isTouchEvent
      ? e.touches[0].clientX
      : 0;
    const posMouseY = isMouseEvent
      ? e.clientY
      : isTouchEvent
      ? e.touches[0].clientY
      : 0;
    if (isTouchEvent) blockRef.current.style.transition = "0s";

    // CENTER BLOCK
    const xToPx = `${posMouseX - REMAIN_CENTER_PX}px`;
    const yToPx = `${posMouseY - REMAIN_CENTER_PX}px`;

    //   TOP LEFT OVER SCREEN
    if (
      posMouseX - REMAIN_CENTER_PX <= 0 &&
      posMouseY - REMAIN_CENTER_PX <= 0
    ) {
      blockRef.current.style.transform = `translate(${0}, ${0})`;
    } else if (posMouseY - REMAIN_CENTER_PX <= 0) {
      blockRef.current.style.transform = `translate(${xToPx}, ${0})`;
    } else if (posMouseX - REMAIN_CENTER_PX <= 0) {
      blockRef.current.style.transform = `translate(${0}, ${yToPx})`;
    } else {
      blockRef.current.style.transform = `translate(${xToPx}, ${yToPx})`;
    }
    //   BOTTOM RIGHT OVER SCREEN

    if (posMouseX >= window.innerWidth) {
      blockRef.current.style.transform = `translate(${
        window.innerWidth - REMAIN_CENTER_PX * 2
      }px, ${yToPx})`;
    }
  };

  const handleMUp = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent
  ): void => {
    isDraggedRef.current = false;
  };
  const handleMDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggedRef.current = true;
  };
  const handleMMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDraggedRef.current) blockFly(e);
  };
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggedRef.current && onClick) {
      onClick();
    }
  };

  return (
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
      ></div>
      {isDisplay && children}
    </>
  );
};

export default BlockFree;
