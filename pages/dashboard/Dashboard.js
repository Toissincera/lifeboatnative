import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import CircularLoading from "../../componentsNative/animated/CircularLoading";
import DashboardCard from "../../componentsNative/static/Cards";
import { statsCardData } from "../../referenceData/formSource";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.parent}>
      {loading ? (
        <View style={styles.progress}>
          <CircularLoading />
        </View>
      ) : (
        <View>
          {statsCardData.map((item, ix) => (
            <DashboardCard
              item={item}
              key={ix}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 4,
    backgroundColor: "#e6e7ee",
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
