import { Link, useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { ButtonSmall, ButtonText } from "./Buttons";

export default function DashboardCard({ item }) {
  const nav = useNavigation();
  return (
    <Card>
      <CardContent>
        <Typo>{item.name}</Typo>
        <Typo2>16</Typo2>
      </CardContent>
      <Stack>
        <CardAction1>
          <ButtonSmall>
            <ButtonText onPress={() => nav.navigate(item.nativePath)}>
              VIEW
            </ButtonText>
          </ButtonSmall>
        </CardAction1>
        <CardAction2>
          <Box>
            <SVGParent>{item.icon}</SVGParent>
          </Box>
        </CardAction2>
      </Stack>
    </Card>
  );
}

const Card = styled.View({
  backgroundColor: "#fff",
  color: "rgba(0,0,0,0.87)",
  borderRadius: 4,
  borderWidth: 1,
  borderColor: "rgba(0,0,0,0.12)",
  overflow: "hidden",
  marginBottom: 8,
});

const CardContent = styled.View({
  padding: 16,
});

const Typo = styled.Text({
  marginBottom: "5px",
  fontFamily: "roboto",
  fontWeight: 400,
  letterSpacing: 0.15,
  color: "rgba(0,0,0,0.6)",
  fontSize: 14,
  lineHeight: "21px",
  textTransform: "uppercase",
});

const Typo2 = styled.Text({
  marginTop: "8px",
  marginBottom: "8px",
  fontFamily: "roboto",
  fontWeight: 400,
  fontSize: 24,
  lineHeight: "32px",
  letterSpacing: 0,
});

const Stack = styled.View({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

const CardAction1 = styled.View({
  display: "flex",
  alignItems: "center",
  padding: 8,
});

const CardAction2 = styled.View({
  display: "flex",
  alignItems: "center",
  padding: 8,
});

const Box = styled.View({
  display: "flex",
  padding: 8,
  borderRadius: "50%",
  backgroundColor: "rgba(0,128,0,0.2)",
});

const SVGParent = styled.View({
  width: "24px",
  height: "24px",
  display: "inline-block",
  fill: "rgb(0,128,0,0.2)",
  flexShrink: 0,
  fontSize: 24,
});
