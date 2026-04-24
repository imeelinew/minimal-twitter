import selectors from "../../selectors";
import addStyles from "./addStyles";

export function updateLeftSidebarPositioning() {
    addStyles(
      "navigation-position",
      `@media only screen and (min-width: 1000px) {
        ${selectors.leftSidebar} {
          position: fixed;
          left: 0;
          pointer-events: none;
        }
        ${selectors.leftSidebarLinks} > *,
        ${selectors.accountSwitcherButton},
        ${selectors.tweetButton},
        ${selectors.leftSidebar} a,
        ${selectors.leftSidebar} button,
        ${selectors.leftSidebar} [role="button"] {
          pointer-events: auto;
        }
      }
      /* Add padding equal to navigation size when between 1000px-1265px */
      @media only screen and (min-width: 1000px) and (max-width: 1265px) {
        body {
          padding-left: 88px;
        }
      }`
    );
}
