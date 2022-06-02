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
        <div class="custom-shape-divider-bottom-1654051939">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
              background: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(104,124,246,1) 0%, rgba(30,232,216,1) 0%, rgba(8,251,236,1) 0%, rgba(11,5,214,1) 0%, rgba(148,5,142,0.577468487394958) 0%, rgba(8,139,144,1) 0%, rgba(122,226,223,1) 0%, rgba(12,9,226,1) 0%, rgba(41,219,184,1) 0%, rgba(13,32,232,1) 0%, rgba(5,12,139,1) 0%, rgba(164,169,245,1) 0%, rgba(40,162,226,0.989233193277311) 0%, rgba(12,26,207,1) 53%, rgba(10,27,159,1) 87%, rgba(8,26,148,1) 100%, rgba(13,219,200,1) 100%, rgba(44,46,158,1) 100%)`,
            }}
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
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
