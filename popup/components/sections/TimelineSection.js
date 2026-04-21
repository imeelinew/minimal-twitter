import {
  KeyFollowingTimeline,
  KeyHideViewCount,
  KeyRecentMedia,
  KeyRemovePromotedPosts,
  KeyRemoveTimelineBorders,
  KeyRemoveTimelineTabs,
  KeyRemoveTopicsToFollow,
  KeyRemoveTweetBorders,
  KeyStickyHeader,
  KeyTrendsHomeTimeline,
  KeyWriterMode,
} from "../../../storage-keys";
import useMounted from "../../utilities/hooks/useMounted";
import TimelineWidthSlider from "../controls/TimelineWidthSlider";
import VanityCheckboxes from "../controls/VanityCheckboxes";
import ControlsWrapper from "../ui/ControlsWrapper";
import SectionLabel from "../ui/SectionLabel";
import Separator from "../ui/Separator";
import SwitchControl from "../ui/SwitchControl";
import { LocalStorageCheckboxControl } from "../ui/checkboxes";

const TimelineSection = () => {
  const mounted = useMounted();

  return (
    <section className="flex flex-col gap-y-2">
      <SectionLabel htmlFor="user-control-timeline">时间线</SectionLabel>
      {mounted ? (
        <ControlsWrapper id="user-control-timeline">
          <TimelineWidthSlider />
          <Separator />
          <SwitchControl label="禅意写作模式" storageKey={KeyWriterMode} />
          <SwitchControl label="固定顶部栏" storageKey={KeyStickyHeader} />
          <SwitchControl label="首页时间线趋势" storageKey={KeyTrendsHomeTimeline} />
          <SwitchControl label="个人主页近期媒体" storageKey={KeyRecentMedia} />
          <Separator />
          <SectionLabel>移除干扰元素</SectionLabel>
          <VanityCheckboxes />
          <LocalStorageCheckboxControl label="推文浏览量" storageKey={KeyHideViewCount} crossedIcon />
          <LocalStorageCheckboxControl label="推广推文" storageKey={KeyRemovePromotedPosts} crossedIcon />
          <LocalStorageCheckboxControl label="推荐关注话题" storageKey={KeyRemoveTopicsToFollow} crossedIcon />
          <LocalStorageCheckboxControl label={`时间线标签页（为你推荐、正在关注、列表...）`} storageKey={KeyRemoveTimelineTabs} crossedIcon />
          <LocalStorageCheckboxControl label="时间线边框" storageKey={KeyRemoveTimelineBorders} crossedIcon />
          <LocalStorageCheckboxControl label="推文边框" storageKey={KeyRemoveTweetBorders} crossedIcon />
          <Separator />
          <LocalStorageCheckboxControl label={`始终使用“正在关注”标签页`} storageKey={KeyFollowingTimeline} />
        </ControlsWrapper>
      ) : (
        <ControlsWrapper className="animate-pulse h-[115.5px]" />
      )}
      <p className="pt-1 pb-2 text-xs text-center font-medium leading-5 dark:text-x-accentDark text-x-accent1">
        查看更多 𝕏 显示设置{" "}
        <a href="https://twitter.com/i/display" target="_blank" rel="noreferrer" className="text-x-premium hover:underline">
          这里
        </a>
        .
      </p>
    </section>
  );
};

export default TimelineSection;
