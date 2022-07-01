import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const contactsRef = collection(db, "contacts");

const getContacts = async (uid) => {
  const q = query(contactsRef, where("uid", "==", uid));
  const get = await getDocs(q);
  const contacts = [];
  get.forEach((doc) => contacts.push({ ...doc.data(), id: doc.id }));
  return contacts;
};

const deleteContact = async (id) => {
  await deleteDoc(doc(db, "contacts", id));
  return id;
};

const addContact = async (data) => {
  await addDoc(contactsRef, data);
};

const contactAPI = {
  getContacts,
  addContact,
  deleteContact,
};
export default contactAPI;
