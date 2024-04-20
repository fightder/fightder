import { useSession } from "contexts/auth.context";
import { Link, router, useGlobalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { View } from "components/View";
import { Text } from "components/Text";
import { Button } from "components/Button";
import { SafeBottom, SafeTop } from "components/SafeTop";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
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

export default function Email() {
  const { signIn, isLoading, session, signInWithEmail } = useSession();
  const [email, setEmail] = useState(storage.getString("email") || "");
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    console.log(session, isLoading);
  }, [session, isLoading]);

  useEffect(() => {
    const validated = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setCanNext(validated);
  }, [email]);

  const onNext = () => {
    // check if date is valid
    console.log(email, email.trim());
    if (email) {
      storage.set("email", email.trim());

      router.push("/sign-up/activities");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View flex bg={1}>
        <SafeTop back logo />
        <KeyboardAvoidingView style={{ flex: 1 }}>
          {/* </Link> */}
          <View flex style={{ paddingHorizontal: 20 }}>
            <View m={30} gap={5}>
              <Text variant="header">Please Enter your Email</Text>
              <Input
                value={email}
                onChangeText={(t) => setEmail(t)}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                autoCapitalize="none"
                bg={3}
                p={5}
                variant="subtitle"
              />
            </View>
          </View>
          <Button style={{ margin: 20 }} onPress={onNext} disabled={!canNext}>
            <View center variant={canNext ? "primary" : "muted"} p={10} r={100}>
              <Text variant="title">Next</Text>
            </View>
          </Button>
        </KeyboardAvoidingView>
        <SafeBottom />
      </View>
    </TouchableWithoutFeedback>
  );
}
