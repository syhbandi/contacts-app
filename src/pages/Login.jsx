import { Alert, Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { cekLogin, login, reLogin, reset } from "../features/authSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const { status, message, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorKey = Object.keys(formData).filter(
      (key, value) => !formData[key]
    );

    if (errorKey.length) {
      errorKey.forEach((key) => {
        setError((prev) => ({
          ...prev,
          [key]: true,
        }));
      });
      return;
    }

    dispatch(login(formData));
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError((prev) => ({ ...prev, [e.target.name]: false }));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          reLogin({ uid: user.uid, nama: user.displayName, email: user.email })
        );
        navigate("/");
      }
    });
  }, [dispatch]);

  return (
    <div className="px-5 flex flex-col h-screen justify-center">
      <h1 className="text-3xl font-bold text-center">APP Kontak</h1>
      <form onSubmit={handleSubmit}>
        {status == "rejected" ? (
          <Alert severity="error" className="mb-4">
            {message}
          </Alert>
        ) : null}
        <TextField
          error={error.email ? true : false}
          variant="outlined"
          label="Email"
          className="w-full mb-3"
          name="email"
          type={"email"}
          autoComplete="off"
          onChange={handleChange}
          helperText={error.email ? "Isi email dulu" : null}
        />
        <TextField
          error={error.password ? true : false}
          variant="outlined"
          label="Password"
          className="w-full mb-3"
          name="password"
          type={"password"}
          onChange={handleChange}
          helperText={error.password ? "Isi password dulu" : null}
        />
        <Button
          variant={status === "pending" ? "outlined" : "contained"}
          className={`w-full ${status === "pending" ? "" : "bg-blue-600"} py-3`}
          type="submit"
          disabled={status === "pending" ? true : false}
        >
          {status === "pending" ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-blue-400"
              viewBox="0 0 24 24"
            ></svg>
          ) : null}
          login
        </Button>
      </form>
      <Button
        className="w-full text-red-800 py-3 mt-4"
        onClick={() => navigate("/register")}
      >
        Daftar sekarang
      </Button>
    </div>
  );
};

export default Login;
