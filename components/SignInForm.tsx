import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View } from "./View";
import { Text } from "./Text";
import { Button } from "./Button";
import { Input } from "./Input";
import { useColorScheme } from "react-native";
import { router } from "expo-router";

const SignInForm = ({
  onSignIn,
}: {
  onSignIn: (email: string, password: string) => void;
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [signUp, setSignUp] = React.useState(false);
  const colorMode = useColorScheme();

  // const onSignIn = () => {};
  const onSignUp = () => {};
  return (
    <>
      <View col bg={2} glass gap={10} r={20} p={10} m={5}>
        <Input
          r={20}
          p={5}
          bg={1}
          value={email}
          onChangeText={(t) => {
            setEmail(t);
          }}
          leftItem={
            <Ionicons
              name="person"
              size={24}
              color={colorMode == "dark" ? "#fff" : "black"}
            />
          }
          keyboardType="email-address"
          autoComplete="email"
          placeholder="Email"
        />
        <Input
          value={password}
          onChangeText={(t) => {
            setPassword(t);
          }}
          keyboardType="visible-password"
          autoComplete={signUp ? "new-password" : "password"}
          secureTextEntry={true}
          bg={1}
          p={5}
          r={20}
          leftItem={
            <Ionicons
              name="lock-closed"
              size={24}
              color={colorMode == "dark" ? "#fff" : "black"}
            />
          }
          placeholder="Password"
        />
        {signUp ? (
          <Input
            value={repeatPassword}
            onChangeText={(t) => {
              setRepeatPassword(t);
            }}
            keyboardType="visible-password"
            autoComplete="new-password"
            secureTextEntry={true}
            bg={1}
            p={5}
            r={20}
            leftItem={
              <Ionicons
                name="lock-closed"
                size={24}
                color={colorMode == "dark" ? "#fff" : "black"}
              />
            }
            placeholder="Repeat Password"
          />
        ) : null}
        <Button
          onPress={() => {
            if (signUp) {
              onSignUp();
            } else {
              onSignIn(email, password);
              router.replace("/home");
            }
          }}
        >
          <View variant="text" r={5} px={20} p={10}>
            <Text color="inverted" variant="subtitle">
              {signUp ? "Sign Up" : "Sign In"}
            </Text>
          </View>
        </Button>
      </View>

      <Button
        onPress={() => {
          setSignUp(!signUp);
        }}
      >
        <Text color="primary" variant="body">
          {signUp ? "Already have an account?" : "Create an account"}
        </Text>
      </Button>
    </>
  );
};

export default SignInForm;
