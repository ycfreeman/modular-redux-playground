import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import DesktopNavigation from "./Desktop";
import MobileNavigation from "./Mobile";

const Navigation: React.FC = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return isDesktop ? (
    <DesktopNavigation>{children}</DesktopNavigation>
  ) : (
    <MobileNavigation>{children}</MobileNavigation>
  );
};

export default Navigation;
