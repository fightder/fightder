import { useSession } from "contexts/auth.context";
import { Link, router, useGlobalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { View } from "components/View";
import { Text } from "components/Text";
import { Button } from "components/Button";
import { SafeBottom, SafeTop } from "components/SafeTop";
import { Image, KeyboardAvoidingView } from "react-native";
import SignInForm from "components/SignInForm";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
import { supabase } from "utils/supabase";
import { Input } from "components/Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MotiView } from "moti";
import { IconButton } from "components/IconButton";
import { storage } from "utils/storage";
import { BlurView } from "expo-blur";

export default function SignIn() {
  const { signIn, isLoading, session, signInWithEmail } = useSession();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [canNext, setCanNext] = useState(false);

  const onNext = async () => {
    setLoading(true);
    const res = await signInWithEmail(username, password);
    if (res) {
      console.log(res, "res pls go in");
      router.push("/home");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (username && password && password.length > 6) {
      storage.set("username", username);
      setCanNext(true);
    } else setCanNext(false);
  }, [username, password]);

  return (
    <View flex bg={1}>
      <SafeTop back logo />
      {loading && (
        <BlurView
          intensity={100}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
          }}
        >
          <View flex center>
            <Text variant="title">Loading...</Text>
          </View>
        </BlurView>
      )}
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View flex style={{ paddingHorizontal: 20 }}>
          <View m={30} gap={5}>
            <Text variant="title">username/email</Text>
            <Input
              value={username}
              onChangeText={(t) => setUsername(t)}
              placeholder="omjain"
              bg={3}
              p={5}
              variant="subtitle"
              textContentType="username"
              autoCapitalize="none"
            />
            <Text variant="title">password</Text>
            <Input
              value={password}
              onChangeText={(t) => setPassword(t)}
              placeholder="*********"
              bg={3}
              p={5}
              variant="subtitle"
              textContentType="password"
              secureTextEntry
            />
          </View>
        </View>
        <Button style={{ margin: 20 }} onPress={onNext} disabled={null}>
          <View center variant={canNext ? "primary" : "muted"} p={10} r={100}>
            <Text variant="title">Sign In</Text>
          </View>
        </Button>
      </KeyboardAvoidingView>
      <SafeBottom />
    </View>
  );
}
