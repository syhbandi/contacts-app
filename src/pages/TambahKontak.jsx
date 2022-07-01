import {
  AppBar,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Toolbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../features/contactsSlice";

const TambahKontak = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nama: "",
    noHp: "",
  });
  const { status, message } = useSelector((state) => state.contacts);
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState({
    nama: false,
    noHp: false,
  });

  const { nama, noHp } = formData;
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError((prev) => ({
      ...prev,
      [e.target.name]: false,
    }));
  };
  const onSubmit = (e) => {
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

    dispatch(addContact({ ...formData, uid: user.uid }));
    navigate("/");
  };
  return (
    <>
      <AppBar className="bg-blue-600 sticky">
        <Toolbar>
          <IconButton onClick={() => navigate("/")}>
            <ArrowBackIcon className="text-white" />
          </IconButton>
          <h1 className="text-xl font-medium">Tambah kontak baru</h1>
        </Toolbar>
      </AppBar>
      <Container className="mt-4">
        <form onSubmit={onSubmit} noValidate>
          <TextField
            error={error.nama ? true : false}
            label="Nama"
            name="nama"
            variant="outlined"
            className="w-full mb-6"
            onChange={onChange}
            value={nama}
            autoComplete="off"
            helperText={error.nama ? "isi Nama dulu" : null}
          />
          <TextField
            error={error.noHp ? true : false}
            label="No. hp"
            name="noHp"
            variant="outlined"
            className="w-full mb-6"
            onChange={onChange}
            value={noHp}
            autoComplete="off"
            helperText={error.noHp ? "isi No. hp dulu" : null}
          />
          <Button variant="contained" className="w-full p-3" type="submit">
            simpan
          </Button>
        </form>
      </Container>
      {status && status === "pending" ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : status === "rejected" ? (
        <Dialog
          open={true}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Ada galat di sistem"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus>Oke</Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
};

export default TambahKontak;
