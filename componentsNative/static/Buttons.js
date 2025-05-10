import styled from "styled-components/native";

export const ButtonSmall = styled.Pressable({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  outline: 0,
  borderWidth: 0,
  margin: 0,
  cursor: "pointer",
  verticalAlign: "middle",
  textDecoration: "none",
  fontFamily: "roboto",
  fontWeight: 500,
  fontSize: 24,
  lineHeight: "22.75px",
  letterSpacing: 0.37,
  textTransform: "uppercase",
  minWidth: 64,
  padding: 4,
  borderRadius: 4,
  color: "#b7b7b7",
});

export const ButtonText = styled.Text({
  verticalAlign: "middle",
  textDecorationLine: "none",
  fontFamily: "roboto",
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "22.75px",
  letterSpacing: 0.37,
  textTransform: "uppercase",
  color: "rgb(25,118,210)",
});
