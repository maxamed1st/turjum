import utilities from '@/tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import { TailwindProvider } from 'tailwind-rn';
import Navigator from './utils/navigation';

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider utilities={utilities}>
        <Navigator />
      </TailwindProvider>
    </NavigationContainer >
  );
}

