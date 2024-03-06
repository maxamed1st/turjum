import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import log from "../utils/logger";
import { styles } from "../components/Styles";
import { signInProps } from "../../types";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn({
  navigation,
}: signInProps) {
  const [emailAddress, setEmailAddress] = useState("maxamed1st@gmail.com");
  const [password, setPassword] = useState("123456");

  const onSignInPress = async () => {
    try {
      await signInWithEmailAndPassword(auth, emailAddress, password);

    } catch (err: any) {
      log("SignIn", err?.status || "");
      log("SignIn", err?.errors ? JSON.stringify(err.errors) : err);
    }
  };

  const onSignUpPress = () => navigation.replace("SignUp");

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          style={styles.textInput}
          placeholder="Email..."
          placeholderTextColor="#000"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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

      <TouchableOpacity style={styles.primaryButton} onPress={onSignInPress}>
        <Text style={styles.primaryButtonText}>Sign in</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Have an account?</Text>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onSignUpPress}
        >
          <Text style={styles.secondaryButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
