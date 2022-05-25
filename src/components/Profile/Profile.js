import "./Profile.css";
import { Button, TextField, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ProfileImg from "../Images copy/userIcon.png";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export function Profile() {
  let id = reactLocalStorage.getObject("userId", true).userId;

  const navigate = useNavigate();
  async function sendRequest() {
    const res = await axios
      .get(`https://project-management-tool-server.herokuapp.com/user/${id}`)
      .catch((err) => {
        alert(err.response.data.message);
      });

    const data = await res.data;

    reactLocalStorage.set("user", true);
    reactLocalStorage.setObject("user", { user: data.user });
    return data;
  }
  sendRequest();
  return (
    <div className="container1">
      <div className="row">
        <aside className="col-lg-3">
          <div className="sbar-items">
            <span>
              <HomeRoundedIcon />
            </span>
            <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
              Dashboard
            </h3>
          </div>
          <hr />
          <div className="sbar-items">
            <span>
              <AccountCircleRoundedIcon />
            </span>
            <h4
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/profile`)}
            >
              Profile
            </h4>
          </div>
        </aside>

        {/*Projects*/}
        <section className="col-lg-9">
          <div className="heading">
            <h1>Profile</h1>
          </div>
          <div className="row2">
            <div className="col-lg-4" id="col-4">
              <div className="profile-logo">
                <img src={ProfileImg} alt="Profile-Image" className="pro-img" />
              </div>
              <h1>{reactLocalStorage.getObject("user", true).user.name}</h1>
              <Button
                variant="contained"
                sx={{ margin: "10px 0px 10px 0px" }}
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </Button>
              <Button
                color="error"
                variant="contained"
                sx={{ margin: "10px 0px 10px 0px" }}
                onClick={() => navigate("/")}
              >
                Logout
              </Button>
            </div>
            <div className="col-lg-8">
              <div className="field">
                <div className="lable">Name:</div>
                <div className="data">
                  {reactLocalStorage.getObject("user", true).user.name}
                </div>
              </div>
              <div className="field">
                <div className="lable">Email:</div>
                <div className="data">
                  {reactLocalStorage.getObject("user", true).user.email}
                </div>
              </div>
              <div className="field">
                <div className="lable">Job:</div>
                <div className="data">
                  {reactLocalStorage.getObject("user", true).user.job}
                </div>
              </div>
              <div className="field">
                <div className="lable">Institution/Company:</div>
                <div className="data">
                  {reactLocalStorage.getObject("user", true).user.institution}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
