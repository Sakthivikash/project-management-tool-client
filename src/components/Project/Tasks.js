


export function Tasks({ data, }) {
    
    function UpdateTask(prog) {
        const res = await axios
            .put(
                 `https://project-management-tool-server.herokuapp.com/tasks/update-task/${data._id}`,
                {
                task: data.task,
                prograss: prog,
                }
                )
            .catch((err) => alert(err.response.data.message));
            const update = await res.data;
            console.log(update);
            handleClose();
            alert(update.message);
    }
    
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
                   await UpdateTask("To-Do")
                  }}
                  sx={{ color: "black" }}
                >
                  To-Do
                </MenuItem>
                <hr />
                <MenuItem
                  onClick={async () => {
                    await UpdateTask("In-Prograss")
                  }}
                  sx={{ color: "black" }}
                >
                  In-Prograss
                </MenuItem>
                <hr />
                <MenuItem
                  onClick={async () => {
                  await UpdateTask("Done")
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
              }}
            >
              <DeleteRoundedIcon />
            </Button>
          </div>
        </div>
      </>
    );
}