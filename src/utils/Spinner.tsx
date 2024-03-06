import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Spinner() {

  return (
    <View tw="flex-1 justify-center items-center" >
      <ActivityIndicator size={"large"} />
    </View >
  )
}
