import React, { useEffect, useState } from "react";
import { View, Button, ActivityIndicator, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID =
  "628164387727-m9ueulm1aj69fchii46r81g95hl46k6f.apps.googleusercontent.com";

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

export default function Login() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
      scopes: ["profile", "email"],
      responseType: "token",
    },
    discovery
  );

  console.log(
    "makeRedirectUri",
    AuthSession.makeRedirectUri({ useProxy: true })
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      handleGoogleSuccess(access_token);
    } else if (response?.type === "error") {
      Alert.alert("Login failed", "Please try again.");
    }
  }, [response]);

  const handleGoogleSuccess = async (token) => {
    try {
      setLoading(true);
      // Optional: fetch user info
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userInfo = await res.json();

      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" }], // or trigger full app re-evaluation
      });
    } catch (err) {
      Alert.alert("Something went wrong", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button
          title="Sign in with Google"
          onPress={() => promptAsync()}
          disabled={!request}
        />
      )}
    </View>
  );
}
