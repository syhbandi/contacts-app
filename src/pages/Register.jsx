import ArrowBack from "@mui/icons-material/ArrowBack";
import { Alert, Button, IconButton, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    password: "",
    password2: "",
    email: "",
  });
  const [error, setError] = useState({});
  const { status, message } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setError(errors);

    if (Object.keys(errors).length !== 0) {
      console.log(errors);
      return;
    }

    dispatch(register(formData));
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.nama) {
      errors.nama = "Nama harus diisi!";
    }
    if (!values.email) {
      errors.email = "Email harus diisi!";
    } else if (!regex.test(values.email)) {
      errors.email = "Email tidak valid!";
    }
    if (!values.password) {
      errors.password = "Password harus diisi";
    } else if (values.password.length < 6) {
      errors.password = "Password harus lebih dari 6 karakter";
    }
    if (!values.password2) {
      errors.password2 = "Password harus diisi";
    } else if (values.password !== values.password2) {
      errors.password2 = "Password tidak sama";
    }
    return errors;
  };

  useEffect(() => {
    if (status === "fulfilled") {
      setTimeout(() => {
        dispatch(reset());
        navigate("/login");
      }, 2000);
    }
  }, [dispatch, status, navigate]);
  return (
    <div className="flex flex-col h-screen px-5">
      <div className="mt-5">
        <IconButton
          className="-ml-3 mb-4 text-black"
          onClick={() => navigate("/login")}
        >
          <ArrowBack />
        </IconButton>
        <h1 className="text-2xl">Daftar</h1>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        {status === "rejected" || status === "fulfilled" ? (
          <Alert
            severity={status === "rejected" ? "error" : "success"}
            className="mb-4"
          >
            {message}
          </Alert>
        ) : null}
        <TextField
          error={error.nama ? true : false}
          variant="outlined"
          label="Nama"
          className="w-full mb-3"
          name="nama"
          type={"text"}
          autoComplete="off"
          onChange={handleChange}
          helperText={error.nama || null}
        />
        <TextField
          error={error.email ? true : false}
          variant="outlined"
          label="Email"
          className="w-full mb-3"
          name="email"
          type={"email"}
          autoComplete="off"
          onChange={handleChange}
          helperText={error.email || null}
        />
        <TextField
          error={error.password ? true : false}
          variant="outlined"
          label="Password"
          className="w-full mb-3"
          name="password"
          type={"password"}
          autoComplete="off"
          onChange={handleChange}
          helperText={error.password || null}
        />
        <TextField
          error={error.password2 ? true : false}
          variant="outlined"
          label="Konfirmasi Password"
          className="w-full mb-3"
          name="password2"
          type={"password"}
          autoComplete="off"
          onChange={handleChange}
          helperText={error.password2 || null}
        />
        <Button
          variant={status === "pending" ? "outlined" : "contained"}
          className={`w-full ${status === "pending" ? "" : "bg-blue-600"} py-3`}
          type="submit"
          disabled={status === "pending" ? true : false}
        >
          Daftar
        </Button>
      </form>
    </div>
  );
};

export default Register;
