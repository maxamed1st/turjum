import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Navigator from "./src/utils/navigation";

export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer >
  );
}

