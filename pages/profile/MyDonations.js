import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "@rneui/themed";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { mockAPIResponse } from "../../referenceData/sampleUserInfo";
import { isoDateToFullFormat } from "../../utils/string.utils";

export default function MyDonations() {
  const nav = useNavigation();
  const [open, setOpen] = useState(false);
  const [allDonos, setAllDonos] = useState(mockAPIResponse.memberDonations);

  return (
    <ListItem.Accordion
      content={
        <ListItem.Content>
          <ListItem.Title>My Donations</ListItem.Title>
        </ListItem.Content>
      }
      isExpanded={open}
      onPress={() => setOpen(!open)}
      containerStyle={{
        flex: 1,
        padding: 8,
        marginTop: 16,
        marginHorizontal: 8,
      }}
    >
      <ScrollView
        horizontal
        style={sx.container}
        contentContainerStyle={{ flexDirection: "column" }}
      >
        {allDonos.map((caase, ix) =>
          caase.donations.map((oneDono, i) => (
            <Pressable
              style={sx.rowParent}
              key={`${ix}-${i}`}
            >
              <Text style={bodyCell.name}> {caase.case_name} </Text>
              <Text style={bodyCell.rfid}>{oneDono.donation_reference_id}</Text>
              <Text style={bodyCell.dona}>{oneDono.amount}</Text>
              <Text style={bodyCell.date}>
                {isoDateToFullFormat(oneDono.donated_at)}
              </Text>
              <Text style={bodyCell.veri}>
                {oneDono.is_verified ? (
                  isoDateToFullFormat(oneDono.verified_at)
                ) : (
                  <MaterialIcons
                    name="hourglass-top"
                    size={24}
                    color="black"
                  />
                )}
              </Text>
            </Pressable>
          ))
        )}
      </ScrollView>
    </ListItem.Accordion>
  );
}

const sx = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: "pink",
    borderRadius: 40,
  },
  rowParent: { width: 500, flexDirection: "row" },
});
const baseCellStyle = { padding: 1.5, fontSize: 14 };
const headerCell = {
  rfid: { ...baseCellStyle, minWidth: "50px", fontWeight: "bold" },
  name: { ...baseCellStyle, minWidth: "150px", fontWeight: "bold" },
  dona: { ...baseCellStyle, minWidth: "50px", fontWeight: "bold" },
  date: { ...baseCellStyle, minWidth: "120px", fontWeight: "bold" },
  veri: { ...baseCellStyle, minWidth: "100px", fontWeight: "bold" },
};
const bodyCell = {
  rfid: { ...baseCellStyle, minWidth: 50 },
  name: { ...baseCellStyle, minWidth: 150 },
  dona: { ...baseCellStyle, minWidth: 50 },
  date: { ...baseCellStyle, minWidth: 125 },
  veri: { ...baseCellStyle, minWidth: 125 },
};
