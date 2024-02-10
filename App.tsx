import { ClerkLoaded, ClerkProvider, useUser } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from './screens/SignIn';
import SignUp from "./screens/SignUp";
import VerifyCode from './screens/VerifyCode'
import Profile from './screens/Profile'
import Reset from './screens/Reset';
import Constants from 'expo-constants';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Reset: undefined;
  VerifyCode: undefined;
}

type RootTabParamList = {
  Profile: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <ClerkProvider publishableKey={Constants?.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer >
    </ClerkProvider >
  );
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Reset" component={Reset} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
    </Stack.Navigator>
  );
}

function RestrictedTabs() {
  return (
    <ClerkLoaded>
      <Tab.Navigator initialRouteName='Profile'>
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </ClerkLoaded>
  );
}

function Navigator() {
  const { isSignedIn } = useUser()
  return (
    <ClerkLoaded>
      {isSignedIn ? <RestrictedTabs /> : <AuthStack />}
    </ClerkLoaded>
  );
}

export type signInProps = NativeStackScreenProps<RootStackParamList, "SignIn">
export type signUpProps = NativeStackScreenProps<RootStackParamList, "SignUp">
export type resetProps = NativeStackScreenProps<RootStackParamList, "Reset">
export type verifyCodeProps = NativeStackScreenProps<RootStackParamList, "VerifyCode">
export type profileProps = BottomTabScreenProps<RootTabParamList, "Profile">
