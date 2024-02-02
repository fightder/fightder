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

export default function SignIn() {
  const { signIn, isLoading, session } = useSession();
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
      <SignInForm />

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
