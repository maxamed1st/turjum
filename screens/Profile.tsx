import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "@/utils/firebase";
import { useTailwind } from 'tailwind-rn';
import log from "../utils/logger";
import { User, deleteUser, signOut } from "firebase/auth";
import useUser from "@/store/useUser";

export default function Profile() {
  const tailwind = useTailwind();
  const user = auth.currentUser as User;
  const userData = useUser(state => state.data);

  const onDelPress = async () => {
    try {
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
    <View style={tailwind("p-4")}>
      <Text style={styles.title}>Hello {userData.firstName}</Text>
      <TouchableOpacity onPress={onDelPress} style={styles.link}>
        <Text style={styles.linkText}>Delete Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSignOutPress} style={styles.link}>
        <Text style={styles.linkText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
