import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router-dom";
import CustomAccordion from "../../atoms/Accordion";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import logo from "../../../assets/Logo.png";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const drawerWidth = 280;

function ResponsiveDrawer(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const redirectToPage = (val) => {
    navigate(`/${val}`);
  };

  const Menu = [
    {
      key: "Dashboard",
      icon: <DashboardIcon style={{ color: "white" }} />,
    },
    {
      key: <CustomAccordion />,
      icon: <SchoolIcon style={{ color: "white" }} />,
    },
    {
      key: "Payment",
      icon: <CurrencyRupeeIcon style={{ color: "white" }} />,
    },
    {
      key: "Daybook",
      icon: <ManageAccountsIcon style={{ color: "white" }} />,
    },
  ];

  const drawer = (
    <div style={{ backgroundColor: "#031C30", height: "100%" }}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "center",
          height: "80px",
          backgroundColor: "white",
        }}
      >
        <img src={logo} width="180px" height="60px" />
      </Toolbar>
      <Divider />
      <List style={{ marginTop: "20px" }}>
        {Menu.map((text, index) => (
          <ListItem key={text.key} disablePadding style={{ marginTop: "10px" }}>
            <ListItemButton>
              <ListItemIcon>{text?.icon}</ListItemIcon>
              {typeof text.key === "string" ? (
                <ListItemText
                  style={{ color: "white" }}
                  primary={text.key}
                  onClick={() => {
                    redirectToPage(text.key);
                  }}
                />
              ) : (
                <div>{text.key}</div>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f2f7ff" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#031C30",
          height: "80px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "20px",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography sx={{ marginBottom: 2 }}>
          <Outlet />
        </Typography>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node,
};

export default ResponsiveDrawer;
