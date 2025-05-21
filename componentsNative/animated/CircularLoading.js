import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function CircularLoading({ fullScreen }) {
  // const rotateAnim = useRef(new Animated.Value(0)).current;  <= expensive, super buggy, but can tinker with it
  const isFocused = useIsFocused();
  const rotateAnim = new Animated.Value(0);
  useEffect(() => {
    if (isFocused) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [isFocused]);
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (fullScreen)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          style={[styles.spinnerStyle, { transform: [{ rotate: spin }] }]}
        ></Animated.View>
      </View>
    );

  return (
    <Animated.View
      style={[styles.spinnerStyle, { transform: [{ rotate: spin }] }]}
    ></Animated.View>
  );
}

const styles = StyleSheet.create({
  spinnerStyle: {
    width: 48,
    height: 48,
    borderWidth: 8,
    borderRadius: "50%",
    borderTopColor: "blue",
    borderRightColor: "ghostwhite",
    borderBottomColor: "ghostwhite",
    borderLeftColor: "ghostwhite",
  },
});
