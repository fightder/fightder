import { useSession } from "contexts/auth.context";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { View } from "components/View";
import { Text } from "components/Text";
import { Button } from "components/Button";
import { SafeBottom, SafeTop } from "components/SafeTop";
import { Image } from "react-native";
import SignInForm from "components/SignInForm";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
import { supabase } from "utils/supabase";

export default function SignIn() {
  const { signIn, isLoading, session, signInWithEmail } = useSession();
  // GoogleSignin.configure({
  //   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  //   webClientId: "YOUR CLIENT ID FROM GOOGLE CONSOLE",
  // });
  // const [signUp, setSignUp] = useState(false);
  useEffect(() => {
    console.log(session, isLoading);
  }, [session, isLoading]);

  return (
    <View
      flex
      bg={1}
      style={{ alignItems: "center", justifyContent: "flex-end" }}
    >
      <SafeTop />
      <Text variant="header" style={{ textAlign: "center" }}>
        🔥Fightder
      </Text>
      {/* <Image
        width={100}
        height={100}
        style={{
          width: 100,
          height: 100,
        }}
        source={require("assets/icon.png")}
      /> */}

      <View
        flex
        style={{
          marginBottom: "auto",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      />
      <SignInForm onSignIn={signInWithEmail} />
      {/* <Button
        onPress={async () => {
          await signIn();
          router.replace("/home");
        }}
      >
        <View variant="text" r={5} px={20} p={10}>
          <Text color="inverted" variant="subtitle">
            Sign In with Fync
          </Text>
        </View>
      </Button> */}
      <SafeBottom />
      <View style={{ flex: 0.2 }} />
    </View>
  );
}
