import { useEffect, useState } from "react";

import { KeyNavigationHorizontalOffset } from "../../../storage-keys";
import { getStorage, setStorageImmediately } from "../../utilities/chromeStorage";

const NavigationHorizontalOffsetControl = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const getInitialOffset = async () => {
      try {
        const savedOffset = await getStorage(KeyNavigationHorizontalOffset);
        setOffset(Number(savedOffset) || 0);
      } catch (error) {
        console.warn(error);
      }
    };

    getInitialOffset();
  }, []);

  const changeOffset = async (value) => {
    const nextOffset = Number(value);
    setOffset(nextOffset);

    try {
      await setStorageImmediately({ [KeyNavigationHorizontalOffset]: nextOffset });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <div className="flex items-center justify-between w-full">
        <label htmlFor={KeyNavigationHorizontalOffset} className="text-[15px] font-medium">
          左右位置
        </label>
        <span className="text-xs font-semibold dark:text-x-accent1Dark text-x-accent1">{offset}px</span>
      </div>
      <input
        id={KeyNavigationHorizontalOffset}
        type="range"
        min="-120"
        max="120"
        step="4"
        value={offset}
        onChange={(event) => changeOffset(event.target.value)}
        className="w-full accent-x-premium"
      />
    </div>
  );
};

export default NavigationHorizontalOffsetControl;
