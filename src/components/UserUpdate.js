import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { reactLocalStorage } from "reactjs-localstorage";
import { useState } from "react";
import * as yup from "yup";

const userValidationSchema = yup.object({
  name: yup.string().required("💡 Why not fill the name?"),
  job: yup.string().required("💡 Why not fill this field?"),
  institution: yup.string().required("💡 Why not fill this field?"),
  email: yup.string().email().required("💡 Why not fill this field?"),
});

export function UserUpdate() {
  const navigate = useNavigate();
  let user = reactLocalStorage.getObject("user", true).user;
  const [data, setData] = useState(user);
  const id = data._id;

  const formik = useFormik({
    initialValues: {
      name: data.name,
      job: data.job,
      institution: data.institution,
      email: data.email,
    },
    validationSchema: userValidationSchema,
    onSubmit: async (updateUser) => {
      await sendRequest(updateUser);
      navigate(`/profile`);
    },
  });

  async function sendRequest(updateUser) {
    try {
      const res = await axios
        .put(
          `https://project-management-tool-server.herokuapp.com/user/update/${id}`,
          updateUser
        )
        .catch((err) => alert(err.response.data.message));

      const data = await res.data;
      await alert(data.message);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <form
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        onSubmit={formik.handleSubmit}
      >
        <Box
          maxWidth={400}
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
          <Typography variant="h4" padding={3} textAlign="center">
            Edit Profile
          </Typography>
          <TextField
            sx={{ margin: 1 }}
            type="text"
            label="Name"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
          />
          <TextField
            sx={{ margin: 1 }}
            type="text"
            label="Job"
            id="job"
            job="job"
            onChange={formik.handleChange}
            value={formik.values.job}
            onBlur={formik.handleBlur}
            error={formik.touched.job && formik.errors.job}
            helperText={
              formik.touched.job && formik.errors.job ? formik.errors.job : ""
            }
          />
          <TextField
            sx={{ margin: 1 }}
            type="text"
            label="Institution/ Company"
            id="institution"
            institution="institution"
            onChange={formik.handleChange}
            value={formik.values.institution}
            onBlur={formik.handleBlur}
            error={formik.touched.institution && formik.errors.institution}
            helperText={
              formik.touched.institution && formik.errors.institution
                ? formik.errors.institution
                : ""
            }
          />
          <TextField
            sx={{ margin: 1 }}
            type="text"
            label="Email"
            id="email"
            email="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
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
            <b>Submit</b>
          </Button>
        </Box>
      </form>
    </div>
  );
}
