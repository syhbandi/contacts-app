import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import Person from "@mui/icons-material/PersonAddAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { Logout } from "@mui/icons-material";

const Drawer = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      disableBackdropTransition={true}
    >
      <div className="px-4">
        <List>
          <ListItem>
            <ListItemButton onClick={() => navigate("/tambah-kontak")}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText>Tambah kontak</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => dispatch(logout())}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Keluar</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default Drawer;
