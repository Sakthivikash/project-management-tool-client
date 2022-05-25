import "./Landing.css";
import { Button } from "@mui/material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import CheckIcon from "../Images copy/checklist.png";
import ProjectFlow from "../Images copy/project-flow.png";
import ComputerWoman from "../Images copy/computerWoman.png";
import Progress from "../Images copy/progressChart.png";
import { Link } from "react-router-dom";

export function Landing() {
  return (
    <div class="container">
      <div className="main">
        <div class="row1">
          <div class="card-02">
            <h1 className="title">Welcome to TaskFlow!</h1>
            <p className="p">
              A space where you can easily manage all your project tasks.
            </p>
            <Button
              LinkComponent={Link}
              to="/signup"
              variant="contained"
              color="primary"
              sx={{
                margin: "10px",
                borderRadius: 5,
                background: "white",
                color: "darkblue",
                fontWeight: "bold",
              }}
            >
              <PersonAddAltRoundedIcon />
              Sign-Up
            </Button>
          </div>
          <div class="card-02">
            <img
              src={ProjectFlow}
              alt="a man standing before a completed checklist"
              className="img-fluid"
            />
          </div>
        </div>
        <div class="custom-shape-divider-top-1653295329">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M1200 0L0 0 598.97 114.72 1200 0z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      <div class="row2">
        <div class="card-03">
          <img
            src={Progress}
            alt="black board with to do, in progress, and done columns"
            className="img-fluid"
          />
        </div>
        <div class="card-03">
          <img
            src={CheckIcon}
            alt="woman checking off to do list"
            className="img-fluid"
          />
        </div>
      </div>
      <div className="main">
        <div class="custom-shape-divider-top-1653302881">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        <div class="row3">
          <div class="card-02">
            <img
              src={ComputerWoman}
              alt="woman working at a computer"
              className="img-fluid"
            />
          </div>
          <div class="card-02">
            <h1 className="my-3">What can TaskFlow do?</h1>
            <p className="p">
              TaskFlow is reimaging how project management can be done. By
              streamlining the process and giving you a place to keep track of
              all of your projects, you no longer need to go anywhere else to
              keep track of your work.
            </p>
            <ul>
              <li> Create a project.</li>
              <li> Add tasks.</li>
              <li> Get projects done.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
