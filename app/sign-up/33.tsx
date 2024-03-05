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

export default function BirthDate() {
  const { signIn, isLoading, session, signInWithEmail } = useSession();
  const [date, setDate] = useState(new Date());
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    console.log(session, isLoading);
  }, [session, isLoading]);

  useEffect(() => {
    const now = new Date();
    setCanNext(date != now);
  }, [date]);

  const onNext = () => {
    // check if date is valid
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();

    if (age < 18) {
      // check if user is over 18
      return;
    }

    router.push("/sign-up/2");
  };

  return (
    <View flex bg={1}>
      <SafeTop />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Text variant="header" style={{ textAlign: "center" }}>
          🔥Fightder
        </Text>
        <Link href="/auth" style={{ left: 20 }} asChild>
          <IconButton name="arrow-back" size={30} />
        </Link>
        <View flex style={{ paddingHorizontal: 20 }}>
          <BirthdateComponent date={date} />
        </View>
        <Button style={{ margin: 20 }} onPress={onNext} disabled={!canNext}>
          <View center variant={canNext ? "primary" : "muted"} p={10} r={100}>
            <Text variant="title">Next</Text>
          </View>
        </Button>
      </KeyboardAvoidingView>
      <SafeBottom />
    </View>
  );
}

const BirthdateComponent = ({ date }: { date: Date }) => (
  <View m={30} gap={5}>
    <Text variant="header">When is your birthdate?</Text>
    <DateTimePicker
      value={date}
      mode="date"
      maximumDate={new Date(2020, 1, 1)}
    />
  </View>
);
