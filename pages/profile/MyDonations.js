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
        persistentScrollbar
        style={sx.container}
        contentContainerStyle={{ flexDirection: "column" }}
      >
        <View style={sx.flexRow}>
          <Text style={[sx.all, sx.casename, sx.header]}>Case Name</Text>
          <Text style={[sx.all, sx.tranxid, sx.header]}>Transaction ID</Text>
          <Text style={[sx.all, sx.amount, sx.header]}>
            <MaterialIcons
              name="currency-rupee"
              size={16}
              color="green"
            />
            Donated
          </Text>
          <Text style={[sx.all, sx.donateAt, sx.header]}>Donated At</Text>
          <Text style={[sx.all, sx.verifyAt, sx.header]}>Verified At</Text>
        </View>

        {allDonos.map((caase, ix) =>
          caase.donations.map((oneDono, i) => (
            <Pressable
              style={sx.flexRow}
              key={`${ix}-${i}`}
              onPress={() => alert("TODO")}
            >
              <Text style={[sx.all, sx.casename]}>{caase.case_name}</Text>
              <Text style={[sx.all, sx.tranxid]}>
                {oneDono.donation_reference_id}
              </Text>
              <Text style={[sx.all, sx.amount]}>{oneDono.amount}</Text>
              <Text style={[sx.all, sx.donateAt]}>
                {isoDateToFullFormat(oneDono.donated_at)}
              </Text>
              <Text style={[sx.all, sx.verifyAt]}>
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
    marginHorizontal: 8,
    marginVertical: 2,
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
  tranxid: { width: 100 },
  amount: { width: 80 },
  donateAt: { width: 150 },
  verifyAt: { width: 150 },
});
