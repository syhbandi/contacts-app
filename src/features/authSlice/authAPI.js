import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

const register = async (data) => {
  const register = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  const user = register.user;

  await updateProfile(user, { displayName: data.nama });
  await setDoc(doc(db, "user", user.uid), {
    nama: user.displayName,
    email: user.email,
  });
  return "Registrasi berhasil";
};

const login = async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const { uid, displayName } = userCredential.user;
  return { uid, nama: displayName, email };
  // localStorage.setItem("user", JSON.stringify({ email, displayName, uid }));
};

const logout = async () => {
  return await signOut(auth);
};

const authAPI = {
  login,
  register,
  logout,
};

export default authAPI;
