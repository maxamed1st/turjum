import Spinner from "@/utils/Spinner";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { signInProps } from "../../types";
import { styles } from "../components/Styles";
import { auth } from "../utils/firebase";
import log from "../utils/logger";

export default function SignIn({
  navigation,
}: signInProps) {
  const [emailAddress, setEmailAddress] = useState("maxamed1st@gmail.com");
  const [password, setPassword] = useState("123456");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const onSignInPress = async () => {
    try {
      setIsLoading(true);
      setErrors("");
      await signInWithEmailAndPassword(auth, emailAddress, password);

    } catch (err: any) {
      log("SignIn", err?.status || "");
      log("SignIn", err?.errors ? JSON.stringify(err.errors) : err);
      err instanceof FirebaseError ? setErrors(err.message) : setErrors("something went wrong");
    } finally {
      setIsLoading(false);
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
          onChangeText={(emailAddress) => setEmailAddress(emailAddress.trim())}
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

      <TouchableOpacity style={styles.primaryButton} onPress={onSignInPress}>
        {isLoading ?
          <Spinner />
          :
          <Text style={styles.primaryButtonText}>Sign in</Text>
        }
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
    </View >
  );
}
