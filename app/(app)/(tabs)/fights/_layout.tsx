import { useSession } from "contexts/auth.context";
import { View } from "components/View";
import { UserProvider } from "contexts/user.context";
import { Redirect, Stack, Tabs } from "expo-router";
import { StyleSheet, Text, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import { BlurView } from "expo-blur";
import { SHADOW } from "constants/shadow";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { COLORS } from "constants/colors";
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";

import { withLayoutContext } from "expo-router";
import { SafeTop } from "components/SafeTop";
const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function FightLayout() {
  const { session, isLoading } = useSession();
  const mode = useColorScheme();
  const insets = useSafeAreaInsets();
  return (
    <View flex bg={1}>
      <SafeTop title="Fights" />
      <MaterialTopTabs
        style={{ padding: 10 }}
        screenOptions={{
          tabBarLabelStyle: {
            color:
              mode == "dark" ? COLORS.background[50] : COLORS.background[900],
            fontWeight: "bold",
            fontSize: 17,
          },
          tabBarActiveTintColor: COLORS.primary[900],
          tabBarInactiveTintColor:
            COLORS.background[mode == "dark" ? 300 : 900],
          tabBarStyle: {
            marginTop: 10,
            backgroundColor: "transparent",
          },
          tabBarIndicatorStyle: {
            height: "100%",
            borderRadius: 35,
            // backgroundColor: "red",
            backgroundColor:
              mode == "dark" ? COLORS.background[800] : COLORS.background[300],
          },
          tabBarItemStyle: {
            padding: 10,
            borderRadius: 20,
          },
        }}
      />
    </View>
  );
}
