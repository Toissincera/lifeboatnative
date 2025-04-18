import React from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Dashboard from "../pages/dashboard/Dashboard";
import Navbar from "./Navbar";
import CustomDrawerContent from "./CustomDrawerContent";
import Profile2 from "../pages/profile/Profile";

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
          component={Profile2}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function MembersScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Members Screen</Text>
    </View>
  );
}
