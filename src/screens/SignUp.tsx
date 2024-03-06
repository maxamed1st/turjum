import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import log from "../utils/logger";
import { styles } from "../components/Styles";
import { signUpProps } from "../../types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import useUser from "../store/useUser";

export default function SignUp({
  navigation,
}: signUpProps) {
  const [firstName, setFirstName] = useState("Walaalka");
  const [surname, setSurName] = useState("Dalabay");
  const [emailAddress, setEmailAddress] = useState("maxamed1st@outlook.com");
  const [password, setPassword] = useState("123456");
  const setData = useUser(state => state.setData);

  const onSignUpPress = async () => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, emailAddress, password);
      const uid = credential.user.uid;
      const userDocRef = doc(db, "users", uid);

      const data = {
        uid,
        firstName,
        surname,
        emailAddress
      }

      const res = await setDoc(userDocRef, data);
      setData(data);
      log("signUp", res);
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
          value={surname}
          style={styles.textInput}
          placeholder="Last name..."
          placeholderTextColor="#000"
          onChangeText={(surname) => setSurName(surname)}
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
