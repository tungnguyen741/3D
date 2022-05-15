import BlockFree from "@/components/BlockFree";
import { TShape } from "@/components/BlockFree/types";
import { useState } from "react";
import styles from "./App.module.scss";

const App = () => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [shape, setShape] = useState<TShape>("circle");
  const [size, setSize] = useState(40);

  return (
    <>
      <button
        className={`${styles.btn} ${styles.btn__square}`}
        onClick={() => setShape("square")}
      >
        Square
      </button>
      <button
        className={`${styles.btn} ${styles.btn__circle}`}
        onClick={() => setShape("circle")}
      >
        Circle
      </button>
      <button
        className={`${styles.btn} ${styles.btn__custom}`}
        onClick={() => setShape(Math.floor(Math.random() * 14))}
      >
        Random
      </button>
      <div className={styles.input}>
        <label htmlFor="size">Size</label>
        <input type="text" onChange={(e) => setSize(+e.target.value)} />
      </div>
      <BlockFree
        onClick={() => setIsDisplay(!isDisplay)}
        onClose={() => setIsDisplay(false)}
        isDisplay={isDisplay}
        width={size}
        height={size}
        shape={shape}
        children={""}
      ></BlockFree>
    </>
  );
};

export default App;
