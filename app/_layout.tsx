import { SessionProvider } from "contexts/auth.context";
import { Slot, SplashScreen } from "expo-router";
import {
  useFonts,
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from "@tanstack/react-query";

import * as outfit from "@expo-google-fonts/outfit";
const {
  useFonts: useOutfitFonts,
  __metadata__: outfitMetadata,
  ...Outfits
} = outfit;
import { useCallback } from "react";
// import NetInfo from "@react-native-community/netinfo";

// onlineManager.setEventListener((setOnline) => {
//   return NetInfo.addEventListener((state) => {
//     setOnline(!!state.isConnected);
//   });
// });
// SplashScreen.preventAutoHideAsync();

console.log("this running");
export default function Root() {
  let [SpaceGroteskLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    Outfits,
  });

  let [outfitLoaded] = useOutfitFonts(Outfits);
  const queryClient = new QueryClient();

  const onLayoutRootView = useCallback(async () => {
    if (outfitLoaded) {
      console.log("loaded");
      SplashScreen.hideAsync();
    }
  }, [outfitLoaded]);

  if (!outfitLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </QueryClientProvider>
  );
}
