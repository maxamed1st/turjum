import { Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "@/utils/firebase";
import log from "@/utils/logger";
import { User, deleteUser, signOut } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import useUser from "@/store/useUser";
import React from "react";

export default function Profile() {
  const user = auth.currentUser as User;
  const userData = useUser(state => state.data);

  const onDelPress = async () => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      deleteDoc(userDocRef);
      deleteUser(user);
    } catch (err: any) {
      log("Error", err?.status || "");
      log("Error", err?.errors ? JSON.stringify(err.errors) : err);
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

