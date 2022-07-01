import { Fab, IconButton } from "@mui/material";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Menu as MenuIcon } from "@mui/icons-material";
import Drawer from "../components/Drawer";
import ListContacts from "../components/ListContacts";
import PersonAdd from "@mui/icons-material/PersonAddAlt1";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <AppBar position="static" className="bg-blue-600">
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            className="mr-2"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <div className="text-lg font-medium ml-auto">{user && user.nama}</div>
        </Toolbar>
      </AppBar>
      <Drawer open={open} setOpen={setOpen} />
      <ListContacts />
      <Fab
        aria-label="tambah kontak"
        className="fixed right-4 bottom-7 bg-blue-500 text-white"
        onClick={() => navigate("/tambah-kontak")}
      >
        <PersonAdd />
      </Fab>
    </>
  );
};

export default Home;
