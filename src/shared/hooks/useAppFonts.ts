import { useFonts } from 'expo-font';
import {
  Geologica_300Light,
  Geologica_400Regular,
  Geologica_500Medium,
  Geologica_600SemiBold,
  Geologica_700Bold,
  Geologica_900Black,
} from '@expo-google-fonts/geologica';

export function useAppFonts() {
  const [fontsLoaded, fontError] = useFonts({
    Geologica_300Light,
    Geologica_400Regular,
    Geologica_500Medium,
    Geologica_600SemiBold,
    Geologica_700Bold,
    Geologica_900Black,
  });

  return { fontsLoaded, fontError };
}
