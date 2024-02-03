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
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import {
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
  AppleAuthenticationScope,
  isAvailableAsync,
  signInAsync,
} from "expo-apple-authentication";

export default function SignIn() {
  const { signIn, isLoading, session } = useSession();
  // const [signUp, setSignUp] = useState(false);
  const available = isAvailableAsync().then((res) => {
    console.log(res, "res");
  });
  useEffect(() => {
    console.log(session, isLoading);
    console.log(available, "av");
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
      <SignInForm />
      <AppleAuthenticationButton
        buttonType={AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        onPress={async () => {
          try {
            const credential = await signInAsync({
              requestedScopes: [
                AppleAuthenticationScope.FULL_NAME,
                AppleAuthenticationScope.EMAIL,
              ],
            });
            // signed in
          } catch (e) {
            if (e.code === "ERR_REQUEST_CANCELED") {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
      />
      <View flex style={{ marginBottom: "auto" }} />
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn}
        disabled={this.state.isSigninInProgress}
      />
      ;
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
