import { ClerkLoaded, ClerkProvider, useUser } from '@clerk/clerk-expo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import Profile from '@/screens/Profile';
import SignIn from '@/screens/SignIn';
import SignUp from "@/screens/SignUp";
import Translate from '@/screens/Translate';
import VerifyCode from '@/screens/VerifyCode';
import { TailwindProvider } from 'tailwind-rn'
import utilities from '@/tailwind.json'
import { RootStackParamList, RootTabParamList } from '@/types';
import Output from '@/screens/Output';


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <ClerkProvider publishableKey={Constants?.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}>
      <NavigationContainer>
        <TailwindProvider utilities={utilities}>
          <Navigator />
        </TailwindProvider>
      </NavigationContainer >
    </ClerkProvider >
  );
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
    </Stack.Navigator>
  );
}

function RestrictedTabs() {
  return (
    <Tab.Navigator initialRouteName='Translate' screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Translate" component={Translate} />
      <Tab.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Output" component={Output} />
    </Tab.Navigator>
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

