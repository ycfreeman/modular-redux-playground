import React from "react";

import useReactRouter from "use-react-router";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import routes from "../routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      height: "100vh"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    footer: {
      display: "flex"
    }
  })
);

const MobileNavigation: React.FC = ({ children }) => {
  const classes = useStyles();
  const { location, history } = useReactRouter();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            App
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      <BottomNavigation
        value={location.pathname}
        onChange={(event, newValue) => {
          history.push(newValue);
        }}
        showLabels
        className={classes.footer}
      >
        {routes.map(route => {
          const { path, title, Icon } = route;
          return (
            <BottomNavigationAction
              key={path}
              label={title}
              value={path}
              icon={<Icon />}
            />
          );
        })}
      </BottomNavigation>
    </div>
  );
};

export default MobileNavigation;
