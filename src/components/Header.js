import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logoImg from "./images/logo.png";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { reactLocalStorage } from "reactjs-localstorage";

export function Header({ setState, state }) {
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
        <div style={{ marginLeft: "auto" }}>
          <IconButton
            sx={{
              backgroundColor: "white",
              color: "black",
            }}
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                navigate("/login");
                handleClose();
              }}
              sx={{
                backgroundColor: "lightgrey",
                color: "black",
              }}
            >
              Login
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/signup");
                handleClose();
              }}
              sx={{
                backgroundColor: "lightgrey",
                color: "black",
              }}
            >
              Signup
            </MenuItem>
            <hr />
            <MenuItem
              sx={{
                backgroundColor: "lightgrey",
                color: "black",
              }}
              onClick={() => {
                navigate("/");
                reactLocalStorage.remove("userId");
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
        {/* <Box display="flex" marginLeft="auto">
          {state === "login" ? (
            <Button
              variant="contained"
              sx={{ margin: 1, borderRadius: 5, background: "darkblue" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              <LoginRoundedIcon />
              Login
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ margin: 1, borderRadius: 5, background: "darkblue" }}
              onClick={() => {
                navigate("/");
                setState("login");
              }}
            >
              <LogoutRoundedIcon />
              Logout
            </Button>
          )}
        </Box> */}
      </Toolbar>
    </AppBar>
  );
}
