import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList, RootTabParamList, TranslationParamList } from 'types';
import CameraComponent from './src/features/Camera';
import Profile from '@/screens/Profile';
import SignIn from '@/screens/SignIn';
import SignUp from "@/screens/SignUp";
import Translate from '@/screens/Translate';
import useUser from '@/store/useUser';
import Spinner from '@/components/Spinner';
import log from "@/utils/logger";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const TranslateStack = createNativeStackNavigator<TranslationParamList>();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function TranslationStack() {
  return (
    <TranslateStack.Navigator initialRouteName="Translate" screenOptions={{ headerShown: false }}>
      <TranslateStack.Screen name="Translate" component={Translate} />
      <TranslateStack.Screen name="Camera" component={CameraComponent} />
    </TranslateStack.Navigator>)
}

function RestrictedTabs() {
  return (
    <Tab.Navigator initialRouteName='Translation' screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Translation" component={TranslationStack} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function Navigator() {
  log("navigation")
  const currentUser = useUser(state => state.currentUser);
  const loading = useUser(state => state.loading);

  return (
    loading ? <Spinner /> :
      currentUser ? <RestrictedTabs /> :
        <AuthStack />
  )
}
