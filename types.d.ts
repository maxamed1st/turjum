import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
}

export type RootTabParamList = {
  TranslationStack: undefined;
  Profile: undefined;
}

export type TranslationParamList = {
  Translate: undefined;
  Camera: undefined;
}

export type signInProps = NativeStackScreenProps<RootStackParamList, "SignIn">
export type signUpProps = NativeStackScreenProps<RootStackParamList, "SignUp">
export type profileProps = BottomTabScreenProps<RootTabParamList, "Profile">
export type translateProps = NativeStackScreenProps<TranslationParamList, "Translate">

