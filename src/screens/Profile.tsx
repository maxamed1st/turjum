import useUser from "@/store/useUser";
import { auth, db, } from "@/utils/firebase";
import log, { logErr } from "@/utils/logger";
import { User, deleteUser, signOut } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const user = auth.currentUser as User;
  const userData = useUser(state => state.data);

  const onDelPress = async () => {
    //delete user data
    try {
      const userDocRef = doc(db, "users", user.uid);
      await deleteDoc(userDocRef);
    } catch (err) {
      logErr("delete data", err);
    }

    //delete user
    try {
      await deleteUser(user);
    } catch (err) {
      logErr("delete user", err)
    }
  }

  const onSignOutPress = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      log("Error", err?.status || "");
      log("Error", err?.errors ? JSON.stringify(err.errors) : err);
    }
  };

  return (
    <View tw="m-4 p-4">
      < Text tw="text-2xl text-bold mb-2"> Hello {userData.firstName}</Text >
      <TouchableOpacity onPress={onDelPress} tw="mt-2 px-4">
        <Text tw="text-lg text-blue-600">Delete Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSignOutPress} tw="mt-2 px-4">
        <Text tw="text-lg text-blue-600">Sign Out</Text>
      </TouchableOpacity>
    </View >
  );
}

