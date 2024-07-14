import Spinner from "@/components/Spinner";
import { styles } from "@/components/Styles";
import useUser from "@/store/useUser";
import { auth, db } from "@/utils/firebase";
import log from "@/utils/logger";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { signUpProps } from "types";

export default function SignUp({
  navigation,
}: signUpProps) {
  const [firstName, setFirstName] = useState("Walaalka");
  const [surname, setSurName] = useState("Dalabay");
  const [emailAddress, setEmailAddress] = useState("maxamed1st@outlook.com");
  const [password, setPassword] = useState("123456");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const setData = useUser(state => state.setData);

  const onSignUpPress = async () => {
    try {
      setIsLoading(true);
      setErrors("");
      const credential = await createUserWithEmailAndPassword(auth, emailAddress, password);
      const uid = credential.user.uid;
      const userDocRef = doc(db, "users", uid);

      const data = {
        uid,
        firstName,
        surname,
        emailAddress,
      }

      const res = await setDoc(userDocRef, data);
      setData(data);
      log("signUp", res);
    } catch (err: any) {
      log("SignUp", err?.status || "");
      log("SignUp", err?.errors ? JSON.stringify(err.errors) : err);
      err instanceof FirebaseError ? setErrors(err.message) : setErrors("something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const onSignInPress = () => navigation.replace("SignIn");

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          value={firstName}
          style={styles.textInput}
          placeholder="First name..."
          placeholderTextColor="#000"
          onChangeText={(firstName) => setFirstName(firstName.trim())}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          value={surname}
          style={styles.textInput}
          placeholder="surname..."
          placeholderTextColor="#000"
          onChangeText={(surname) => setSurName(surname.trim())}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          style={styles.textInput}
          placeholder="Email..."
          placeholderTextColor="#000"
          onChangeText={(email) => setEmailAddress(email.trim())}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          value={password}
          style={styles.textInput}
          placeholder="Password..."
          placeholderTextColor="#000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password.trim())}
        />
      </View>

      {errors &&
        < View >
          <Text tw="text-red-500">{errors}</Text>
        </View>
      }

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={onSignUpPress}>
        {isLoading ?
          <Spinner />
          :
          <Text style={styles.primaryButtonText}>Sign up</Text>
        }
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
