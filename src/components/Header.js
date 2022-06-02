import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logoImg from "./images/logo.png";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { reactLocalStorage } from "reactjs-localstorage";

export function Header({ setloggedIn, loggedIn }) {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        background: "white",
        position: "sticky",
        top: 0,
        width: "100%",
      }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logoImg}
            alt="logo-image"
            style={{
              objectFit: "cover",
              alignItems: "center",
              width: "40px",
              height: "40px",
              margin: "none",
            }}
          />
          <span
            style={{
              fontSize: "25px",
              fontFamily: "'Prompt', sans-serif",
              color: "darkblue",
            }}
          >
            TaskFlow
          </span>
        </Box>
        <Box sx={{ marginLeft: "auto" }}>
          {!loggedIn && (
            <Button
              onClick={() => navigate("/login")}
              color="primary"
              variant="contained"
              sx={{ margin: 1 }}
            >
              Login <LoginIcon />
            </Button>
          )}
          {loggedIn && (
            <Button
              onClick={() => {
                navigate("/");
                setloggedIn(false);
              }}
              color="primary"
              variant="contained"
              sx={{ margin: 1 }}
            >
              Logout <LogoutIcon />
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
