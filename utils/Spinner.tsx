import { ActivityIndicator, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function Spinner() {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("flex-1 justify-center items-center")}>
      <ActivityIndicator size={"large"} />
    </View>
  )
}
