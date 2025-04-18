import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View } from "react-native";

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
      }}
      {...props}
    >
      <View>
        <DrawerItem
          label={() => (
            <View style={{ marginLeft: "auto" }}>
              <MaterialIcons
                name="chevron-left"
                size={24}
                color="black"
              />
            </View>
          )}
          onPress={() => props.navigation.closeDrawer()}
        />
        <DrawerItemList {...props} />
      </View>
      <DrawerItem
        label="Log Out"
        onPress={() => {
          props.navigation.closeDrawer();
          alert("This should log you out...ideally");
        }}
      />
    </DrawerContentScrollView>
  );
}
