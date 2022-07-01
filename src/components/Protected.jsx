import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
// import { cekLogin } from "../features/authSlice";

const Protected = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(cekLogin());

    if (!user) {
      navigate("/login");
    }
  }, [navigate, user, dispatch]);

  return <Outlet />;
};

export default Protected;
