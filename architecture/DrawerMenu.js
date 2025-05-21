import { useState } from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Dashboard from "../pages/dashboard/Dashboard";
import CustomDrawerContent from "./CustomDrawerContent";
import Profile2 from "../pages/profile/Profile";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import { useRecoilValue } from "recoil";
import { UserState } from "../recoil/atom";
import CircularLoading from "../componentsNative/animated/CircularLoading";
import useHydrateUser from "./UserHydration";

const Drawer = createDrawerNavigator();

export default function DrawerMenu() {
  const [isHydrating, setIsHydrating] = useState(true);
  useHydrateUser(isHydrating, setIsHydrating);
  const user = useRecoilValue(UserState);

  if (isHydrating)
    return (
      <NavigationContainer>
        <CircularLoading fullScreen />
      </NavigationContainer>
    );

  return (
    <NavigationContainer>
      {user ? (
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
      ) : (
        <Drawer.Navigator>
          <Drawer.Screen
            name="Login"
            component={Login}
          />
          <Drawer.Screen
            name="SignUp"
            component={SignUp}
          />
        </Drawer.Navigator>
      )}
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
