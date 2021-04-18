import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, Route, useHistory } from "react-router-dom";
import ViewListIcon from "@material-ui/icons/ViewList";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import LineChart from "./LineChart";
import { Logout } from "../Logout/Logout";
import { CustomTable } from "../Table/Table";
import TickerCard from "./TickerCard";
import { getStockData } from "./StockBoard.service";
import BarChart from "./BarChart";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  linkItems: {
    textDecoration: "none",
  },
  listItem: {
    display: "flex",
    gap: "10px",
    color: "white",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function StockBoard() {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [stockData, setStockData] = useState(null);

  const sideNavPermission = [
    {
      name: "Table",
      icon: <ViewListIcon />,
      redirectUrl: "/",
    },
    {
      name: "Graph",
      icon: <ShowChartIcon />,
      redirectUrl: "/graph",
    },
  ];

  const triggerListAPI = () => {
    getStockData()
      .then(function (response) {
        // handle success
        setStockData(response.data);
      })
      .catch(function (error) {
        // handle error
        if (error.response) {
          if (error.response.status) {
            localStorage.clear();
            history.push("/");
            window.location.reload();
          }
        }

        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    triggerListAPI();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Stock App
          </Typography>
          <Logout />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List>
          {sideNavPermission.map((item) => (
            <Link className={classes.linkItems} to={item.redirectUrl}>
              <ListItem className={classes.listItem} button key={item.name}>
                {item.icon}
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Route exact path="/">
          <CustomTable data={stockData} triggerListAPI={triggerListAPI} />
          <TickerCard data={stockData} />
        </Route>
        <Route path="/graph">
          {stockData ? (
            <div className="">
              <LineChart data={stockData}/>
              <BarChart data={stockData}/>
              <TickerCard data={stockData} />
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </Route>
      </main>
    </div>
  );
}
