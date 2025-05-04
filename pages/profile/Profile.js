import React from "react";
import { Link } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ProfileParent, Avatar, UserInfo, RoleInfo } from "./ProfileComponents";
import { StyleSheet } from "react-native";
import MyDonations from "./MyDonations";
import MyCreatedCases from "./MyCreatedCases";
import MyAssignedCases from "./MyAssignedCases";

export default function Profile2() {
  return (
    <ProfileParent>
      <Avatar.Parent>
        <Avatar.Child>
          <MaterialIcons
            name="person"
            style={iconStyles.mainAvatar}
          />
        </Avatar.Child>
      </Avatar.Parent>

      <UserInfo.Parent>
        <Link screen={"Dashboard"}>
          <MaterialIcons
            name="chevron-left"
            style={iconStyles.backNav}
          />
        </Link>
        <UserInfo.H6>hoc admin</UserInfo.H6>
        <MaterialIcons
          name="verified-user"
          style={iconStyles.verified}
        />
      </UserInfo.Parent>

      <RoleInfo.Parent>
        <MaterialIcons
          name="volunteer-activism"
          style={iconStyles.info}
        />
        <RoleInfo.Text>AMEER</RoleInfo.Text>
      </RoleInfo.Parent>
      <RoleInfo.Parent>
        <MaterialIcons
          name="work"
          style={iconStyles.info}
        />
        <RoleInfo.Text>Software Engineer</RoleInfo.Text>
      </RoleInfo.Parent>
      <RoleInfo.Parent>
        <MaterialIcons
          name="business"
          style={iconStyles.info}
        />
        <RoleInfo.Text>Turing</RoleInfo.Text>
      </RoleInfo.Parent>
      <RoleInfo.Parent>
        <MaterialIcons
          name="phone"
          style={iconStyles.info}
        />
        <RoleInfo.Text>7990403421</RoleInfo.Text>
      </RoleInfo.Parent>
      <RoleInfo.Parent>
        <MaterialIcons
          name="email"
          style={iconStyles.info}
        />
        <RoleInfo.Text>houseofcharity97@gmail.com</RoleInfo.Text>
      </RoleInfo.Parent>
      <RoleInfo.Parent>
        <MaterialIcons
          name="home"
          style={iconStyles.info}
        />
        <RoleInfo.Text>
          A-126/4, Near Ashraf Masjid, Shaheen Bagh, {"\n"}
          Okhla Jamia Nagar {"\n"}
          142 110025
        </RoleInfo.Text>
      </RoleInfo.Parent>

      <MyDonations />
      <MyAssignedCases />
      <MyCreatedCases />
    </ProfileParent>
  );
}

const iconStyles = StyleSheet.create({
  mainAvatar: {
    fontSize: 120,
    color: "#fff",
  },
  backNav: {
    fontSize: 36,
    color: "teal",
  },
  verified: {
    fontSize: 24,
    color: "rgb(46,125,50)",
  },
  info: {
    fontSize: 24,
    color: "rgb(25,118,210)",
    marginRight: 8,
  },
});
