import { useSession } from "contexts/auth.context";
import { Link, router } from "expo-router";
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
      <SafeTop />
      <SafeTop />
      <Image
        width={100}
        height={100}
        style={{
          width: 200,
          height: 200,
        }}
        source={require("assets/adaptive-icon.png")}
      />
      <Text variant="title">Grow with your Game</Text>

      <View
        flex
        style={{
          marginBottom: "auto",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      />
      {/* <SignInForm onSignIn={signInWithEmail} /> */}
      <Link href="/sign-up/age">
        <View
          variant="primary"
          r={10}
          px={20}
          p={10}
          style={{ width: 250 }}
          center
        >
          <Text color="inverted" variant="title">
            Create account
          </Text>
        </View>
      </Link>
      <View style={{ height: 20 }} />
      <Link href="/sign-in">
        <View
          variant="text"
          r={10}
          px={20}
          p={10}
          style={{ width: 250 }}
          center
        >
          <Text color="inverted" variant="title">
            Sign In
          </Text>
        </View>
      </Link>
      <View m={30}>
        <Text>
          Say something very important here. This is a very important message.
        </Text>
      </View>
      <SafeBottom />
      <View style={{ flex: 0.2 }} />
    </View>
  );
}
