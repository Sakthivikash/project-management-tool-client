import "./Project.css";
import { Button, TextField, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Box } from "@mui/system";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import { reactLocalStorage } from "reactjs-localstorage";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const projectValidationSchema = yup.object({
  task: yup.string().required("💡 Why not fill the Title?"),
  desc: yup
    .string()
    .required("💡 Why not fill this Description?")
    .min(10, "Need a Longer description"),
});
export const taskValidationSchema = yup.object({
  task: yup.string().required("💡 Why not fill the task field?"),
});

export function Project() {
  const [card, setCard] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [todo, setToDo] = useState([]);
  const [inprog, setInProg] = useState([]);
  const [done, setDone] = useState([]);

  const getProject = () => {
    fetch(
      `https://project-management-tool-server.herokuapp.com/projects/${id}`,
      { method: "GET" }
    )
      .then((data) => data.json())
      .then((pro) => setData(pro.project));
  };

  useEffect(() => getProject(), []);

  //List of Task To Do:
  const getTasksToDo = () => {
    fetch(
      `https://project-management-tool-server.herokuapp.com/tasks/to-do/${id}`,
      { method: "GET" }
    )
      .then((data) => data.json())
      .then((task) => setToDo(task.tasks))
      .catch((err) => err.response.data.message);
  };
  useEffect(() => getTasksToDo(), []);

  //List of In-Prograss tasks:
  const getTasksInProg = () => {
    fetch(
      `https://project-management-tool-server.herokuapp.com/tasks/in-prograss/${id}`,
      { method: "GET" }
    )
      .then((data) => data.json())
      .then((task) => setInProg(task.tasks))
      .catch((err) => err.response.data.message);
  };
  useEffect(() => getTasksInProg(), []);

  //List of Tasks Done:
  const getTasksDone = () => {
    fetch(
      `https://project-management-tool-server.herokuapp.com/tasks/done/${id}`,
      { method: "GET" }
    )
      .then((data) => data.json())
      .then((task) => setDone(task.tasks))
      .catch((err) => err.response.data.message);
  };
  useEffect(() => getTasksDone(), []);

  const formik = useFormik({
    initialValues: {
      task: "",
      prograss: "To-Do",
    },
    validationSchema: taskValidationSchema,
    onSubmit: async (newTask) => {
      await sendRequest(newTask);
      await getTasksToDo();
      navigate(`/project/${id}`);
    },
  });

  async function sendRequest(newTask) {
    console.log(id);
    const res = await axios
      .post(
        `https://project-management-tool-server.herokuapp.com/tasks/create-task/${id}`,
        newTask
      )
      .catch((err) => {
        alert(err.response.data.message);
      });

    const data = await res.data;
    alert(data.message);
    console.log(data);
    return data;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="container1">
      <div className="row">
        <aside className="col-lg-3">
          <div className="sbar-items">
            <span>
              <HomeRoundedIcon />
            </span>
            <h3 onClick={() => navigate("/home")}>Dashboard</h3>
          </div>
          <hr />
          <div className="sbar-items">
            <span>
              <AccountCircleRoundedIcon />
            </span>
            <h4 style={{ cursor: "pointer" }}>Profile</h4>
          </div>
        </aside>

        {/*Project*/}
        <section className="col-lg-9">
          <div>
            <div className="heading">
              <p className="tit">
                Project: <b>{data.title}</b>-{data.desc}
              </p>
              <div className="btns">
                <div
                  className="btn"
                  onClick={() => {
                    setPage(false);
                    reactLocalStorage.set("project", true);
                    reactLocalStorage.setObject("project", { project: data });
                    navigate(`/update-project/${data._id}`);
                    getProject();
                  }}
                >
                  <ModeEditOutlineRoundedIcon />
                </div>
                <div
                  className="btn"
                  onClick={async () => {
                    const deleteProject = await axios
                      .delete(
                        `https://project-management-tool-server.herokuapp.com/projects/del/${data._id}`
                      )
                      .catch((err) => {
                        alert(err.response.data.message);
                      });
                    alert("Project deleted");
                    navigate("/home");
                  }}
                >
                  <DeleteRoundedIcon />
                </div>
              </div>
            </div>

            {/* Task Box */}
            <form className="container-task" onSubmit={formik.handleSubmit}>
              <div className="row-task">
                <div className="col-lg-4">
                  <h3 className="task-titl">To-Do</h3>
                  <hr />
                  <div className="task-box">
                    <TextField
                      sx={{
                        margin: 1,
                        height: "50px",
                        width: "90%",
                        backgroundColor: "#ccc",
                      }}
                      type="text"
                      label="Task"
                      id="task"
                      task="task"
                      onChange={formik.handleChange}
                      value={formik.values.task}
                      onBlur={formik.handleBlur}
                      error={formik.touched.task && formik.errors.task}
                      helperText={
                        formik.touched.task && formik.errors.task
                          ? formik.errors.task
                          : ""
                      }
                    />
                    <Button
                      type="submit"
                      sx={{
                        borderRadius: 3,
                        marginTop: 2,
                      }}
                      variant="contained"
                      color="primary"
                    >
                      <b>Add Task</b>
                    </Button>
                  </div>
                  <hr />
                  {todo.map((data) => {
                    return (
                      <>
                        <div className="task-card">
                          <div className="task-tit">
                            <p className="Tit">{data.task}</p>
                          </div>
                          <hr />
                          <div className="task-btns">
                            <div className="btn">
                              <Button
                                id="basic-button"
                                width="24px"
                                height="24px"
                                sx={{
                                  margin: "10px",
                                  color: "darkblue",
                                }}
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                              >
                                <TimelineRoundedIcon />
                              </Button>
                              <Menu
                                sx={{ padding: "5px" }}
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button",
                                }}
                              >
                                <MenuItem
                                  onClick={async () => {
                                    const res = await axios
                                      .put(
                                        `http://localhost:5000/tasks/update-task/${data._id}`,
                                        {
                                          task: data.task,
                                          prograss: "To-Do",
                                        }
                                      )
                                      .catch((err) =>
                                        alert(err.response.data.message)
                                      );
                                    const update = await res.data;
                                    console.log(update);
                                    handleClose();
                                    alert(update.message);
                                    navigate(`/project/${data.projectId}`);
                                    getTasksToDo();
                                  }}
                                  sx={{ color: "black" }}
                                >
                                  To-Do
                                </MenuItem>
                                <hr />
                                <MenuItem
                                  onClick={async () => {
                                    console.log(data._id);
                                    const res = await axios
                                      .put(
                                        `http://localhost:5000/tasks/update-task/${data._id}`,
                                        {
                                          task: data.task,
                                          prograss: "In-Prograss",
                                        }
                                      )
                                      .catch((err) =>
                                        alert(err.response.data.message)
                                      );
                                    const update = await res.data;
                                    console.log(update);
                                    handleClose();
                                    alert(update.message);

                                    navigate(`/project/${data.projectId}`);
                                    getTasksInProg();
                                    getTasksToDo();
                                  }}
                                  sx={{ color: "black" }}
                                >
                                  In-Prograss
                                </MenuItem>
                                <hr />
                                <MenuItem
                                  onClick={async () => {
                                    const res = await axios
                                      .put(
                                        `http://localhost:5000/tasks/update-task/${data._id}`,
                                        {
                                          task: data.task,
                                          prograss: "Done",
                                        }
                                      )
                                      .catch((err) =>
                                        alert(err.response.data.message)
                                      );
                                    const update = await res.data;
                                    console.log(update);
                                    handleClose();
                                    alert(update.message);
                                    navigate(`/project/${data.projectId}`);
                                    getTasksDone();
                                    getTasksToDo();
                                  }}
                                  sx={{ color: "black" }}
                                >
                                  Done
                                </MenuItem>
                              </Menu>
                            </div>
                            <Button
                              className="btn"
                              onClick={() => {
                                reactLocalStorage.set("task", true);
                                reactLocalStorage.setObject("task", {
                                  task: data,
                                });
                                navigate(`/update-task/${data._id}`);
                              }}
                            >
                              <ModeEditOutlineRoundedIcon />
                            </Button>
                            <Button
                              className="btn"
                              onClick={async () => {
                                const deleteTask = await axios
                                  .delete(
                                    `https://project-management-tool-server.herokuapp.com/tasks/del/${data._id}`
                                  )
                                  .catch((err) => {
                                    alert(err.response.data.message);
                                  });
                                alert(await deleteTask.data.message);
                                navigate(`/project/${data.projectId}`);
                                getTasksToDo();
                              }}
                            >
                              <DeleteRoundedIcon />
                            </Button>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="col-lg-4">
                  <h3 className="task-titl">In-Prograss</h3>
                  <hr />
                  {inprog.map((data) => {
                    return (
                      <div className="task-card">
                        <div className="task-tit">
                          <p className="Tit">{data.task}</p>
                        </div>
                        <hr />
                        <div className="task-btns">
                          <div className="btn">
                            <Button
                              id="basic-button"
                              width="24px"
                              height="24px"
                              sx={{
                                margin: "10px",
                                color: "darkblue",
                              }}
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                            >
                              <TimelineRoundedIcon />
                            </Button>
                            <Menu
                              sx={{ padding: "5px" }}
                              id="basic-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem
                                onClick={async () => {
                                  const res = await axios
                                    .put(
                                      `http://localhost:5000/tasks/update-task/${data._id}`,
                                      {
                                        task: data.task,
                                        prograss: "To-Do",
                                      }
                                    )
                                    .catch((err) =>
                                      alert(err.response.data.message)
                                    );
                                  const update = await res.data;
                                  console.log(update);
                                  handleClose();
                                  alert(update.message);
                                  navigate(`/project/${data.projectId}`);
                                  getTasksToDo();
                                  getTasksInProg();
                                }}
                                sx={{ color: "black" }}
                              >
                                To-Do
                              </MenuItem>
                              <hr />
                              <MenuItem
                                onClick={async () => {
                                  const res = await axios
                                    .put(
                                      `http://localhost:5000/tasks/update-task/${data._id}`,
                                      {
                                        task: data.task,
                                        prograss: "In-Prograss",
                                      }
                                    )
                                    .catch((err) =>
                                      alert(err.response.data.message)
                                    );
                                  const update = await res.data;
                                  console.log(update);
                                  handleClose();
                                  alert(update.message);
                                  console.log(data._id);
                                  navigate(`/project/${data.projectId}`);
                                  getTasksInProg();
                                }}
                                sx={{ color: "black" }}
                              >
                                In-Prograss
                              </MenuItem>
                              <hr />

                              <MenuItem
                                onClick={async () => {
                                  console.log(data._id);
                                  const res = await axios
                                    .put(
                                      `http://localhost:5000/tasks/update-task/${data._id}`,
                                      {
                                        task: data.task,
                                        prograss: "Done",
                                      }
                                    )
                                    .catch((err) =>
                                      alert(err.response.data.message)
                                    );
                                  const update = await res.data;
                                  console.log(update);
                                  handleClose();
                                  alert(update.message);
                                  navigate(`/project/${data.projectId}`);
                                  getTasksDone();
                                  getTasksInProg();
                                }}
                                sx={{ color: "black" }}
                              >
                                Done
                              </MenuItem>
                            </Menu>
                          </div>
                          <Button
                            className="btn"
                            onClick={() => {
                              reactLocalStorage.set("task", true);
                              reactLocalStorage.setObject("task", {
                                task: data,
                              });
                              navigate(`/update-task/${data._id}`);
                            }}
                          >
                            <ModeEditOutlineRoundedIcon />
                          </Button>
                          <Button
                            className="btn"
                            onClick={async () => {
                              const deleteTask = await axios
                                .delete(
                                  `https://project-management-tool-server.herokuapp.com/tasks/del/${data._id}`
                                )
                                .catch((err) => {
                                  alert(err.response.data.message);
                                });
                              alert(await deleteTask.data.message);
                              navigate(`/project/${data.projectId}`);
                              getTasksInProg();
                            }}
                          >
                            <DeleteRoundedIcon />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-lg-4">
                  <h3 className="task-titl">Done</h3>
                  <hr />
                  {done.map((data) => {
                    return (
                      <div className="task-card">
                        <div className="task-tit">
                          <p className="Tit">{data.task}</p>
                        </div>
                        <hr />
                        <div className="task-btns">
                          <div className="btn">
                            <Button
                              id="basic-button"
                              width="24px"
                              height="24px"
                              sx={{
                                margin: "10px",
                                color: "darkblue",
                              }}
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                            >
                              <TimelineRoundedIcon />
                            </Button>
                            <Menu
                              sx={{ padding: "5px" }}
                              id="basic-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem
                                onClick={async () => {
                                  const res = await axios
                                    .put(
                                      `http://localhost:5000/tasks/update-task/${data._id}`,
                                      {
                                        task: data.task,
                                        prograss: "To-Do",
                                      }
                                    )
                                    .catch((err) =>
                                      alert(err.response.data.message)
                                    );
                                  const update = await res.data;
                                  console.log(update);
                                  handleClose();
                                  alert(update.message);
                                  navigate(`/project/${data.projectId}`);
                                  getTasksToDo();
                                  getTasksDone();
                                }}
                                sx={{ color: "black" }}
                              >
                                To-Do
                              </MenuItem>
                              <hr />
                              <MenuItem
                                onClick={async () => {
                                  const res = await axios
                                    .put(
                                      `http://localhost:5000/tasks/update-task/${data._id}`,
                                      {
                                        task: data.task,
                                        prograss: "In-Prograss",
                                      }
                                    )
                                    .catch((err) =>
                                      alert(err.response.data.message)
                                    );
                                  const update = await res.data;
                                  console.log(update);
                                  handleClose();
                                  alert(update.message);
                                  navigate(`/project/${data.projectId}`);
                                  getTasksInProg();
                                  getTasksDone();
                                }}
                                sx={{ color: "black" }}
                              >
                                In-Prograss
                              </MenuItem>
                              <hr />
                              <MenuItem
                                onClick={async () => {
                                  const res = await axios
                                    .put(
                                      `http://localhost:5000/tasks/update-task/${data._id}`,
                                      {
                                        task: data.task,
                                        prograss: "Done",
                                      }
                                    )
                                    .catch((err) =>
                                      alert(err.response.data.message)
                                    );
                                  const update = await res.data;
                                  console.log(update);
                                  handleClose();
                                  alert(update.message);
                                  navigate(`/project/${data.projectId}`);
                                  getTasksDone();
                                }}
                                sx={{ color: "black" }}
                              >
                                Done
                              </MenuItem>
                            </Menu>
                          </div>
                          <Button
                            className="btn"
                            onClick={() => {
                              reactLocalStorage.set("task", true);
                              reactLocalStorage.setObject("task", {
                                task: data,
                              });
                              navigate(`/update-task/${data._id}`);
                            }}
                          >
                            <ModeEditOutlineRoundedIcon />
                          </Button>
                          <Button
                            className="btn"
                            onClick={async () => {
                              const deleteTask = await axios
                                .delete(
                                  `https://project-management-tool-server.herokuapp.com/tasks/del/${data._id}`
                                )
                                .catch((err) => {
                                  alert(err.response.data.message);
                                });
                              alert(await deleteTask.data.message);
                              navigate(`/project/${data.projectId}`);
                              getTasksDone();
                            }}
                          >
                            <DeleteRoundedIcon />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
