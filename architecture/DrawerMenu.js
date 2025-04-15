import React from "react";
import { Button, Text, View } from "react-native";
import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Dashboard from "../pages/dashboard/Dashboard";
import Navbar from "./Navbar";
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

export default function DrawerMenu() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            paddingVertical: 24,
            width: 240,
          },
          // headerRight: () => <Navbar />,
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          component={Dashboard}
        />
        <Drawer.Screen
          name="Members"
          component={MembersScreen}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

function MembersScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Members Screen</Text>
    </View>
  );
}
