import { useEffect, useState } from "react";

import { KeyTimelineWidth } from "../../../storage-keys";
import { getStorage, setStorage } from "../../utilities/chromeStorage";

const timelineWidthOptions = [600, 700, 800, 900, 1000];

const TimelineWidthSlider = () => {
  const [userTrack, setUserTrack] = useState(700);

  useEffect(() => {
    const getUserDefaultTimelineWidth = async () => {
      try {
        const userDefaultTimelineWidth = await getStorage(KeyTimelineWidth);
        userDefaultTimelineWidth && setUserTrack(userDefaultTimelineWidth);
      } catch (error) {
        console.warn(error);
      }
    };

    getUserDefaultTimelineWidth();
  }, []);

  const changeTimelineWidth = async (width) => {
    setUserTrack(width);

    try {
      await setStorage({ timelineWidth: width });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <form
      aria-label="时间线宽度"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
        gap: 8,
      }}
    >
      {timelineWidthOptions.map((width) => {
        const isSelected = userTrack === width;

        return (
          <button
            key={width}
            type="button"
            aria-pressed={isSelected}
            onClick={() => changeTimelineWidth(width)}
            style={{
              backgroundColor: isSelected ? "#1d9bf0" : "#ffffff",
              border: `1px solid ${isSelected ? "#1d9bf0" : "#8ecdf8"}`,
              borderRadius: 9999,
              boxShadow: isSelected ? "0 4px 12px rgba(29, 155, 240, 0.25)" : "none",
              color: isSelected ? "#ffffff" : "#1d9bf0",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: "20px",
              padding: "7px 0",
              transition: "all 120ms ease",
            }}
          >
            {width}px
          </button>
        );
      })}
    </form>
  );
};

export default TimelineWidthSlider;
