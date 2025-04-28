import styled from "styled-components/native";

export const ProfileParent = styled.ScrollView({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: 8,
  margin: 0,
  fontFamily: "Nunito",
  fontWeight: 400,
  fontSize: 16,
  color: "rgba(0,0,0,0.87)",
  lineHeight: "24px",
});

export const Avatar = {
  Parent: styled.View({
    width: "100%",
  }),
  Child: styled.View({
    display: "flex",
    width: 150,
    height: 150,
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    overflow: "hidden",
    color: "white",
    backgroundColor: "rgb(189,189,189)",
  }),
};

export const UserInfo = {
  Parent: styled.View({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  }),
  H6: styled.Text({
    display: "flex",
    alignItems: "center",
    marginLeft: 8,
    marginRight: 4,
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: "0.15px",
  }),
};

export const RoleInfo = {
  Parent: styled.View({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 4,
  }),
  Text: styled.Text({
    flex: 1,
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: 600,
    textWrap: "pretty",
  }),
};
