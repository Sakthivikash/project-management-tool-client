import { Button, TextField, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Box } from "@mui/system";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { reactLocalStorage } from "reactjs-localstorage";
import { useState, useEffect } from "react";

const projectValidationSchema = yup.object({
  title: yup.string().required("💡 Why not fill the Title?"),
  desc: yup
    .string()
    .required("💡 Why not fill this Description?")
    .min(10, "Need a Longer description"),
});

export function UpdateProject() {
  let project = reactLocalStorage.getObject("project", true).project;

  const [data, setData] = useState(project);
  const id = data._id;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: data.title,
      desc: data.desc,
    },
    validationSchema: projectValidationSchema,
    onSubmit: async (updateProject) => {
      await sendRequest(updateProject);
      navigate(`/project/${data._id}`);
    },
  });

  async function sendRequest(updateProject) {
    const res = await axios
      .put(
        `https://project-management-tool-server.herokuapp.com/projects/update-project/${id}`,
        updateProject
      )
      .catch((err) => {
        alert(err.response.data.message);
      });

    const data = await res.data;
    alert(data.message);
    return data;
  }
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
              onClick={() => navigate("/profile")}
            >
              Profile
            </h4>
          </div>
        </aside>

        {/*Projects*/}
        <section className="col-lg-9">
          <div style={{ position: "relative" }}>
            <form
              display="flex"
              flexDirection={"column"}
              alignItems="center"
              justifyContent={"center"}
              onSubmit={formik.handleSubmit}
            >
              <Box
                maxWidth={600}
                display="flex"
                flexDirection={"column"}
                alignItems="stretch"
                justifyContent={"center"}
                boxShadow=" 10px 10px 25px #ccc"
                padding={3}
                margin="auto"
                marginTop={5}
                borderRadius={5}
                border={"1px solid #ccc"}
              >
                <>
                  <Typography variant="h4" padding={3} textAlign="center">
                    Update Project
                  </Typography>
                  <TextField
                    sx={{ margin: 1 }}
                    type="text"
                    label="Title"
                    id="title"
                    title="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && formik.errors.title}
                    helperText={
                      formik.touched.title && formik.errors.title
                        ? formik.errors.title
                        : ""
                    }
                  />
                  <TextField
                    sx={{ margin: 1 }}
                    type="desc"
                    label="Description"
                    id="desc"
                    desc="desc"
                    onChange={formik.handleChange}
                    value={formik.values.desc}
                    onBlur={formik.handleBlur}
                    error={formik.touched.desc && formik.errors.desc}
                    helperText={
                      formik.touched.desc && formik.errors.desc
                        ? formik.errors.desc
                        : ""
                    }
                  />
                </>

                <Button
                  type="submit"
                  sx={{
                    borderRadius: 3,
                    marginTop: 2,
                    background:
                      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(26,225,241,1) 0%, rgba(109,203,209,1) 0%, rgba(30,232,216,1) 0%, rgba(8,251,236,1) 0%, rgba(11,5,214,1) 0%, rgba(148,5,142,0.577468487394958) 0%, rgba(8,34,144,1) 0%, rgba(13,32,232,1) 60%, rgba(122,226,223,1) 99%, rgba(164,224,255,1) 100%, rgba(11,97,222,1) 100%)",
                  }}
                  variant="contained"
                >
                  <b>Update</b>
                </Button>
              </Box>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
