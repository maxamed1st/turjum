/// <reference types="nativewind/types" />
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
}

export type RootTabParamList = {
  Translation: undefined;
  Profile: undefined;
}

export type signInProps = NativeStackScreenProps<RootStackParamList, "SignIn">
export type signUpProps = NativeStackScreenProps<RootStackParamList, "SignUp">
export type translateProps = BottomTabScreenProps<RootTabParamList, "Translate">
export type profileProps = BottomTabScreenProps<RootTabParamList, "Profile">

export type jobDocument = {
  title: string,
  path: string,
  srcLang: string,
  targetLang: string,
}
