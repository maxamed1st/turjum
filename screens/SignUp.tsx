import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import log from "@/utils/logger";
import { styles } from "@/components/Styles";
import { signUpProps } from "@/types";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp({
  navigation,
}: signUpProps) {
  const isLoaded = true;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, emailAddress, password);
    } catch (err: any) {
      log("SignUp", err?.status || "");
      log("SignUp", err?.errors ? JSON.stringify(err.errors) : err);
    }
  };

  const onSignInPress = () => navigation.replace("SignIn");

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          value={firstName}
          style={styles.textInput}
          placeholder="First name..."
          placeholderTextColor="#000"
          onChangeText={(firstName) => setFirstName(firstName)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          value={lastName}
          style={styles.textInput}
          placeholder="Last name..."
          placeholderTextColor="#000"
          onChangeText={(lastName) => setLastName(lastName)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          style={styles.textInput}
          placeholder="Email..."
          placeholderTextColor="#000"
          onChangeText={(email) => setEmailAddress(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          value={password}
          style={styles.textInput}
          placeholder="Password..."
          placeholderTextColor="#000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={onSignUpPress}>
        <Text style={styles.primaryButtonText}>Sign up</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Have an account?</Text>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onSignInPress}
        >
          <Text style={styles.secondaryButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
