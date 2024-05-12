import { router } from "expo-router";
import {
  Pressable,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useSession } from "./auth-context";
import { useState } from "react";

export default function SignIn() {
  const { logIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        style={$inputStyle}
      ></TextInput>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={true}
        style={$inputStyle}
      ></TextInput>
      <Text style={$errorStyle}>{error}</Text>
      <Pressable
        style={$buttonStyle}
        onPress={async () => {
          try {
            await logIn(email, password);
            router.replace("/");
          } catch (e) {
            setError(e as string);
          }
        }}
      >
        <Text style={$buttonTextStyle}>Sign In</Text>
      </Pressable>
    </View>
  );
}

const $inputStyle: TextStyle = {
  alignSelf: "stretch",
  borderBottomColor: "#a3a3a3",
  borderBottomWidth: 1,
  color: "#191015",
  fontSize: 16,
  height: 24,
  marginVertical: 8,
  marginHorizontal: 12,
};

const $errorStyle: TextStyle = {
  color: "red", //#e11d48
};

const $buttonStyle: ViewStyle = {
  alignItems: "center",
  alignSelf: "stretch",
  backgroundColor: "#3b82f6",
  borderRadius: 5,
  height: 40,
  justifyContent: "center",
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginVertical: 8,
  marginHorizontal: 12,
};

const $buttonTextStyle: TextStyle = {
  color: "white",
  fontSize: 16,
  fontWeight: "bold",
};
