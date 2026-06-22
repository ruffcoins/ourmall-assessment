import { useFonts } from 'expo-font';
import {
  Geologica_300Light,
  Geologica_500Medium,
  Geologica_700Bold,
} from '@expo-google-fonts/geologica';

export function useAppFonts() {
  const [fontsLoaded, fontError] = useFonts({
    Geologica_300Light,
    Geologica_500Medium,
    Geologica_700Bold,
  });

  return { fontsLoaded, fontError };
}
