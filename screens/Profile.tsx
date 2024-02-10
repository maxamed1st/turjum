import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { profileProps } from "../App";
import { log } from "../utils/logger";

export default function SafeProfile(
  props: profileProps
) {
  return (
    <>
      <SignedIn>
        <Profile {...props} />
      </SignedIn>
      <SignedOut>
        <View style={styles.container}>
          <Text>Unauthorized</Text>
        </View>
      </SignedOut>
    </>
  );
}

function Profile({ navigation }: profileProps) {
  const { signOut } = useAuth();
  const { user } = useUser();

  const onDelPress = async () => {
    try {
      user?.delete();
    } catch (err: any) {
      log("Error:> " + err?.status || "");
      log("Error:> " + err?.errors ? JSON.stringify(err.errors) : err);
    }
  }

  const onSignOutPress = async () => {
    try {
      await signOut();
    } catch (err: any) {
      log("Error:> " + err?.status || "");
      log("Error:> " + err?.errors ? JSON.stringify(err.errors) : err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {user?.firstName}</Text>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
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
