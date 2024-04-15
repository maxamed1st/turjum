import { auth, db } from "../utils/firebase";
import log from "../utils/logger";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";

type state = {
  currentUser: User | null,
  data: {
    uid: String | null,
    firstName: String | null,
    surname: String | null,
    emailAddress: String | null
    credit: number
  },
  loading: boolean,
}

type action = {
  setCurrentUser: (data: state["currentUser"]) => void;
  setData: (newData: state["data"]) => void;
  resetUser: () => void;
  setLoading: (loading: boolean) => void;
}

const initialState: state = {
  loading: true,
  currentUser: null,
  data: {
    uid: null,
    firstName: null,
    surname: null,
    emailAddress: null,
    credit: 0
  },
}

const useUser = create<state & action>(set => ({
  ...initialState,

  setCurrentUser: (data) => set({ currentUser: data }),
  setData: (newData: state["data"]) => set({ data: newData }),
  resetUser: () => set({ ...initialState }),
  setLoading: (loading: boolean) => set({ loading })
}));

onAuthStateChanged(auth, async (usr: User) => {
  const { currentUser,
    setCurrentUser,
    setData,
    resetUser,
    setLoading
  } = useUser.getState();

  try {
    setLoading(true);

    if (usr) {
      const userDocRef = doc(db, "users", usr.uid);
      const docSnap = await getDoc(userDocRef);
      const data: any = docSnap.exists() ? docSnap.data() : null;

      setCurrentUser(usr);
      setData(data);

      setLoading(false);
      return;
    }

    if (currentUser) {
      resetUser();
    }

  } catch (err: any) {
    //error handling
    log("AuthState", err?.status || "");
    log("AuthState", err?.errors ? JSON.stringify(err.errors) : err);

  } finally {
    setLoading(false);
  }
});

export default useUser;
