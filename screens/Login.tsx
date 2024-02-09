import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { loginProps } from '../App';
import Button from '../components/Button';
import Input from '../components/Input';
import Container from '../components/Container';

export default function Login({ navigation }: loginProps) {
  const [email, onChangeEmail] = useState("");
  const [pass, onChangePass] = useState("");

  return (
    <Container>

      <Input
        label="Email"
        value={email}
        onChangeText={onChangeEmail}
      />

      <Input
        label="Password"
        value={pass}
        onChangeText={onChangePass}
      />

      <Button text="Login" />

      <Text style={styles.ghost} onPress={() => navigation.navigate("SignUp")}>
        Don't have an account yet? Sign Up
      </Text>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    display: 'flex',
    justifyContent: "space-around",
  },
  ghost: {
    color: '#111',
    paddingHorizontal: 6,
  },
});
