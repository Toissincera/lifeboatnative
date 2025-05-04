import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "@rneui/themed";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { mockAPIResponse } from "../../referenceData/sampleUserInfo";
import { isoDateToFullFormat } from "../../utils/string.utils";

export default function MyCreatedCases() {
  const nav = useNavigation();
  const [open, setOpen] = useState(false);
  const [myCases, setMyCases] = useState(mockAPIResponse.createdCases);

  return (
    <ListItem.Accordion
      content={
        <ListItem.Content>
          <ListItem.Title>My Created Cases</ListItem.Title>
        </ListItem.Content>
      }
      isExpanded={open}
      onPress={() => setOpen(!open)}
      containerStyle={{
        flex: 1,
        padding: 8,
        marginVertical: 16,
        marginHorizontal: 8,
      }}
    >
      <ScrollView
        horizontal
        persistentScrollbar
        style={sx.container}
        contentContainerStyle={{ flexDirection: "column" }}
      >
        <View style={sx.flexRow}>
          <Text style={[sx.all, sx.casename, sx.header]}>Case Name</Text>
          <Text style={[sx.all, sx.assignee, sx.header]}>Assignee</Text>
          <Text style={[sx.all, sx.target, sx.header]}>
            <MaterialIcons
              name="currency-rupee"
              size={16}
              color="green"
            />
            Target
          </Text>
          <Text style={[sx.all, sx.status, sx.header]}>Status</Text>
          <Text style={[sx.all, sx.updatedAt, sx.header]}>Updated At</Text>
        </View>

        {myCases.map((caase, ix) => (
          <Pressable
            style={sx.flexRow}
            key={ix}
            onPress={() => alert("TODO")}
          >
            <Text style={[sx.all, sx.casename]}>{caase.name}</Text>
            <Text style={[sx.all, sx.assignee]}>
              {caase.assignee?.user?.first_name}{" "}
              {caase.assignee?.user?.last_name}
            </Text>
            <Text style={[sx.all, sx.target]}>
              {caase.target_amount ? caase.target_amount : "NOT SET"}
            </Text>
            <Text style={[sx.all, sx.status]}>{caase.latest_status}</Text>
            <Text style={[sx.all, sx.updatedAt]}>
              {isoDateToFullFormat(caase.updated_at)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </ListItem.Accordion>
  );
}

const sx = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    marginHorizontal: 8,
    marginTop: 2,
    marginBottom: 16
  },
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
  casename: { width: 150 },
  assignee: { width: 100 },
  target: { width: 80 },
  status: { width: 80 },
  updatedAt: { width: 150 },
});
