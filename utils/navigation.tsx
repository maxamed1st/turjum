import Profile from '@/screens/Profile';
import SignIn from '@/screens/SignIn';
import SignUp from "@/screens/SignUp";
import Translate from '@/screens/Translate';
import useUser from '@/store/useUser';
import { RootStackParamList, RootTabParamList } from '@/types';
import log from "@/utils/logger";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn" >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function RestrictedTabs() {
  return (
    <Tab.Navigator initialRouteName='Translate' screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Translate" component={Translate} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function Navigator() {
  log("navigation")
  const currentUser = useUser(state => state.currentUser);
  return currentUser ? <RestrictedTabs /> : <AuthStack />
}

