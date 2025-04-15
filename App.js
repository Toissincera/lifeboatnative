import './gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerMenu from './architecture/DrawerMenu';



export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DrawerMenu />
    </GestureHandlerRootView>
  );
}
