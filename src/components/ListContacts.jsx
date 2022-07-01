import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Delete from "@mui/icons-material/Delete";
import Person from "@mui/icons-material/Person";
import { deleteContact, getContacts } from "../features/contactsSlice";

const ListContacts = () => {
  const dispatch = useDispatch();
  const { contacts, status, message } = useSelector((state) => state.contacts);
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <>
      {contacts.length ? (
        <List>
          {contacts.map((contact) => (
            <ListItem
              key={contact.id}
              secondaryAction={
                <IconButton onClick={() => dispatch(deleteContact(contact.id))}>
                  <Delete />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton className="py-3">
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={contact.nama}
                  secondary={contact.noHp}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box className="p-5">
          <h1 className="text-2xl font-bold text-center">Belum ada kontak</h1>
        </Box>
      )}

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

export default ListContacts;
