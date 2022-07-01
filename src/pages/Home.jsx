import { Fab, IconButton } from "@mui/material";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Menu as MenuIcon } from "@mui/icons-material";
import MenuUser from "../components/MenuUser";
import Drawer from "../components/Drawer";
import ListContacts from "../components/ListContacts";
import PersonAdd from "@mui/icons-material/PersonAddAlt1";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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
          <h4>APP kontak</h4>
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
