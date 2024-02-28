import { create } from "zustand";
import { auth, db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth"

type state = {
  currentUser: User | null,
  data: {
    uid: String | null,
    firstName: String | null,
    surname: String | null,
    emailAddress: String | null
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
    emailAddress: null
  },
}

const useUser = create<state & action>(set => ({
  ...initialState,

  setCurrentUser: (data) => set({ currentUser: data }),
  setData: (newData: state["data"]) => set({ data: newData }),
  resetUser: () => set({ ...initialState }),
  setLoading: (loading: boolean) => set({ loading })
}));

onAuthStateChanged(auth, async (usr: any) => {
  const { currentUser,
    setCurrentUser,
    setData,
    resetUser,
    loading,
    setLoading
  } = useUser.getState();

  if (usr) {
    if (!loading) setLoading(true);

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
    setLoading(false);
  }
});

export default useUser;
