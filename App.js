import "./gesture-handler";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DrawerMenu from "./architecture/DrawerMenu";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RecoilRoot>
        <DrawerMenu />
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}
