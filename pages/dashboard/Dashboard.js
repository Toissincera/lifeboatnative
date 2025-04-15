import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import CircularLoading from "../../components/animated/CircularLoading";
import DashboardCard from "../../components/static/Cards";
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
    marginVertical: 2,
    borderWidth: "4px",
    borderColor: "red",
    padding: 8,
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
