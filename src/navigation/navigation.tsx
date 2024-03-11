import Spinner from '@/components/Spinner';
import Profile from '@/screens/Profile';
import SignIn from '@/screens/SignIn';
import SignUp from "@/screens/SignUp";
import Translate from '@/screens/translate';
import useUser from '@/store/useUser';
import log from "@/utils/logger";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList, RootTabParamList } from 'types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function RestrictedTabs() {
  return (
    <Tab.Navigator initialRouteName='Translation' screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Translation" component={Translate} />
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
