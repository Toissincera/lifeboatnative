import React from "react";

export default function Members() {
  return (
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
