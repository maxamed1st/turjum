import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  VerifyCode: undefined;
  Output: undefined;
}

export type RootTabParamList = {
  Translate: undefined;
  Profile: undefined;
}

export type signInProps = NativeStackScreenProps<RootStackParamList, "SignIn">
export type signUpProps = NativeStackScreenProps<RootStackParamList, "SignUp">
export type verifyCodeProps = NativeStackScreenProps<RootStackParamList, "VerifyCode">
export type profileProps = BottomTabScreenProps<RootTabParamList, "Profile">
export type transcribeProps = BottomTabScreenProps<RootTabParamList, "Translate">

