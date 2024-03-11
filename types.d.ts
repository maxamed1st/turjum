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

export type TranslationParamList = {
  Translate: undefined;
  Camera: undefined;
}

export type signInProps = NativeStackScreenProps<RootStackParamList, "SignIn">
export type signUpProps = NativeStackScreenProps<RootStackParamList, "SignUp">
export type profileProps = BottomTabScreenProps<RootTabParamList, "Profile">
export type translateProps = NativeStackScreenProps<TranslationParamList, "Translate">

export type jobDocument = {
  title: string,
  path: string,
  srcLang: string,
  targetLang: string,
  credit: number
}

export type TranslateDocumentProps = {
  title: string,
  setTitle: (v: any) => any,
  srcLang: string,
  setSrcLang: (v: string) => any,
  targetLang: string,
  setTargetLang: (v: string) => any,
  handleUploadDoc: () => void,
  isLoading: boolean,
  setUri: (v: string) => any
}
