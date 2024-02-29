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
    <View flex color="#161F2D" style={{ alignItems: "center" }}>
      <SafeTop />
      <Text variant="header" style={{ textAlign: "center" }}>
        FYNC
      </Text>
      <Image
        width={100}
        height={100}
        style={{
          width: 100,
          height: 100,
        }}
        source={require("assets/icon.png")}
      />
      <SignInForm onSignIn={signInWithEmail} />
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo.idToken) {
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "google",
                token: userInfo.idToken,
              });
              console.log(error, data);
            } else {
              throw new Error("no ID token present!");
            }
          } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
        }}
      /> */}
      <View flex style={{ marginBottom: "auto" }} />
      <Button
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
      </Button>
      <SafeBottom />
    </View>
  );
}
