import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import SignUp from "./screens/SignUp";


type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
}


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type loginProps = NativeStackScreenProps<RootStackParamList, "Login">
export type signUpProps = NativeStackScreenProps<RootStackParamList, "SignUp">
