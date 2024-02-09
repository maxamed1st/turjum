import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { signUpProps } from '../App';
import Button from '../components/Button';
import Input from '../components/Input';
import Container from '../components/Container';

export default function SignUp({ navigation }: signUpProps) {
  const [email, onChangeEmail] = useState("");
  const [pass, onChangePass] = useState("");
  const [confPass, onChangeConfPass] = useState("");

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

      <Input
        label="Confirm Password"
        value={confPass}
        onChangeText={onChangeConfPass}
      />

      <Button text="Sign Up" />

      <Text style={styles.ghost} onPress={() => navigation.navigate("Login")}>
        already have an account? Login
      </Text>
    </Container>
  )
}

const styles = StyleSheet.create({

  ghost: {
    color: '#111',
    paddingHorizontal: 6,
  },
})
