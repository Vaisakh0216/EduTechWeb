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
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import CustomAccordion from "../../atoms/Accordion";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import logo from "../../../assets/Logo.png";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import college from "../../../assets/college.svg";
import admission from "../../../assets/admission.svg";
import agent from "../../../assets/agent.svg";
import course from "../../../assets/course.svg";
import { Avatar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const drawerWidth = 230;

function ResponsiveDrawer(props) {
  const { window } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [currentPath, setCurrentPath] = React.useState("");
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  console.log("the name", userData?.name);

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
    setCurrentPath(val);
  };

  const AdmissionMenu = {
    main: "Admission",
    sub: ["Admission", "College", "Course", "Agent"],
  };

  const CRMenu = {
    main: "CRM",
    sub: ["Leads", "Calls"],
  };

  const Menu = [
    {
      key: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      key: (
        <CustomAccordion
          mainMenus={AdmissionMenu?.main}
          subMenus={AdmissionMenu?.sub}
        />
      ),
      icon: <img src={admission} width={25} height={25} />,
    },
    {
      key: <CustomAccordion mainMenus={CRMenu?.main} subMenus={CRMenu?.sub} />,
      icon: <SupportAgentIcon />,
    },
    {
      key: "Payment",
      icon: <CurrencyRupeeIcon />,
    },
    {
      key: "Daybook",
      icon: <MenuBookIcon s />,
    },
    {
      key: "Cashbook",
      icon: <ManageAccountsIcon />,
    },
  ];

  console.log("this is props", location?.pathname, currentPath);

  const drawer = (
    <div
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "center",
          height: "72px",
          backgroundColor: "white",
        }}
      >
        <img src={logo} width="150px" height="40px" />
      </Toolbar>
      <Divider />
      <List style={{ marginTop: "20px" }}>
        {Menu.map((text, index) => (
          <ListItem
            key={text.key}
            disablePadding
            style={{
              marginTop: "5px",
            }}
          >
            <ListItemButton
              style={{
                backgroundColor:
                  text.key == location?.pathname?.split("/")[1]
                    ? "#898989"
                    : "",
                margin: "0px 10px",
                borderRadius: "10px",
              }}
            >
              <ListItemIcon
                style={{
                  color:
                    text.key == location?.pathname?.split("/")[1]
                      ? "white"
                      : "#898989",
                }}
              >
                {text?.icon}
              </ListItemIcon>
              {typeof text.key === "string" ? (
                <ListItemText
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "14px",
                      fontWeight: "500",
                    },
                  }}
                  style={{
                    color:
                      text.key == location?.pathname?.split("/")[1]
                        ? "white"
                        : "black",
                  }}
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
          backgroundColor: "white",
          height: "72px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "#898989" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <NotificationsIcon sx={{ color: "#898989", marginRight: "20px" }} />
            <Avatar sx={{ width: "40px", height: "40px" }}>
              {userData?.name.charAt(0)}
            </Avatar>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <span
                style={{ color: "black", fontSize: "14px", fontWeight: 500 }}
              >
                {userData?.name}
              </span>
              <span
                style={{
                  color: "black",
                  fontSize: "12px",
                  color: "#898989",
                  textTransform: "capitalize",
                }}
              >
                {userData?.role}
              </span>
            </div>
          </div>
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
