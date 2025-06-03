import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { mockAPIResponse } from "../../referenceData/sampleUserInfo";

export default function Members() {
  const [members, setMembers] = useState(mockAPIResponse.membersList);
  return (
    <ScrollView
      persistentScrollbar
      style={sx.parent}
    >
      <ScrollView
        horizontal
        persistentScrollbar
        style={sx.container}
        contentContainerStyle={{ flexDirection: "column" }}
      >
        <View style={sx.flexRow}>
          <Text style={[sx.all, sx.nameUsername, sx.header]}>
            Name (Username)
          </Text>
          <Text style={[sx.all, sx.role, sx.header]}>Role</Text>
          <Text style={[sx.all, sx.phone, sx.header]}>Phone</Text>
          <Text style={[sx.all, sx.email, sx.header]}>Email</Text>
          <Text style={[sx.all, sx.profession, sx.header]}>Profession</Text>
          <Text style={[sx.all, sx.enabled, sx.header]}>Enabled</Text>
        </View>

        {members.map((member, ix) => (
          <Pressable
            style={sx.flexRow}
            key={ix}
            onPress={() => alert("TODO")}
          >
            <Text style={[sx.all, sx.nameUsername]}>
              {member?.user?.first_name} {member?.user?.last_name}~{"\n"}(
              {member?.user?.username})
            </Text>
            <Text style={[sx.all, sx.role]}>{member.role}</Text>
            <Text style={[sx.all, sx.phone]}>{member.phone_number}</Text>
            <Text style={[sx.all, sx.email]}>{member.user.email}</Text>
            <Text style={[sx.all, sx.profession]}>{member.profession}</Text>
            <Text style={[sx.all, sx.enabled]}>
              {member.enabled ? "Yes" : "No"}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const sx = StyleSheet.create({
  parent: {
    flex: 1,
  },
  container: { flex: 1, marginHorizontal: 8, marginVertical: 2 },
  flexRow: { flexDirection: "row" },
  header: { fontWeight: 700 },
  all: {
    margin: 0,
    padding: 10,
    fontFamily: "Nunito",
    color: "rgba(0,0,0,0.87)",
    fontSize: 14,
    fontWeight: 400,
    textAlign: "left",
    lineHeight: 24,
    verticalAlign: "middle",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(224,224,224)",
  },
  nameUsername: { width: 150 },
  role: { width: 75 },
  phone: { width: 90 },
  email: { width: 175 },
  profession: { width: 120 },
  enabled: { width: 75 },
});
