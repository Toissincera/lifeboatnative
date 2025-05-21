import { useState } from "react";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { snackbarState, UserState } from "../../recoil/atom";
// import StepperLanding from "../components/Stepper";
// import { GoogleLogin } from "@react-oauth/google";

import { Text, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControllerFormInput } from "../../components/forms/TextGrid";
import { Button } from "@rneui/base";
import { AuthService } from "../../data/services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [user, setUser] = useRecoilState(UserState);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const handleOnSubmit = (data) => {
    setLoading(true);
    let cleanUsername =
      data.username.slice(0, 1).toLowerCase() + data.username.slice(1);
    AuthService.login(cleanUsername, data.password)
      .then((result) => {
        console.log("And the result is... ", JSON.stringify(result, null, 4));
        setUser(result);
        AsyncStorage.setItem("user", JSON.stringify(result));
        // setSnackbar({
        //   ...snackbar,
        //   severity: "success",
        //   message:
        //     result?.memberRole == null
        //       ? "Complete Member Details"
        //       : `Welcome ${result.member_full_name}!`,
        //   open: true,
        // });
      })
      .catch((err) => {
        console.log("But the error is.... ", JSON.stringify(err, null, 4));
        // setSnackbar({
        //   ...snackbar,
        //   severity: "error",
        //   message: err?.error?.non_field_errors || "Unknown login error",
        //   open: true,
        // });
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 48,
        backgroundColor: "pink",
        borderRadius: 20,
      }}
    >
      <ControllerFormInput
        control={control}
        name={"username"}
        placeholder={"Username"}
        required
        errors={errors.username}
      />
      <ControllerFormInput
        control={control}
        name={"password"}
        placeholder={"Password"}
        secureTextEntry={true}
        required
        errors={errors.password}
      />
      <Button
        title="Log Me In, Scotty!"
        onPress={handleSubmit(handleOnSubmit)}
        loading={loading}
      />
      <Text>{JSON.stringify(user, null, 4)}</Text>
    </ScrollView>
  );
}

var x = {
  access:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ3Mzk3NDcwLCJpYXQiOjE3NDczODMwNzAsImp0aSI6ImJlOTgwYjBjMmFjMTQxZDJhYTUxNjc0OTBjODFmMTAzIiwidXNlcl9pZCI6NDZ9.C9seJ238pWyJklIlCcDvRYXZYVRFfROyfrwUQlrNKB0",
  authToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ3Mzk3NDcwLCJpYXQiOjE3NDczODMwNzAsImp0aSI6ImZlYjRjNTFkOWFlZTQwNzBhZDNlZmY4NzAyMWVmNmM4IiwidXNlcl9pZCI6NDZ9.V5ik5tEIEkh3U8X_hDaFqjL97mm5j0ASfO5Gl5QAOqU",
  // "lastLoginTime": 2025-05-16T08:11:10.884Z,
  memberRole: null,
  member_enabled: null,
  member_full_name: null,
  member_uid: null,
  needs_details: true,
  refresh:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzQ2OTQ3MCwiaWF0IjoxNzQ3MzgzMDcwLCJqdGkiOiI3ODc4YzU2NzEyOGQ0ZmY0OWRmMGIxZmRjZjVmMGEwZCIsInVzZXJfaWQiOjQ2fQ.MOQ7k7mRG10gUdT-AHY-Z3NuLf1x6Na4ng8aYiX4pVs",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzQ2OTQ3MCwiaWF0IjoxNzQ3MzgzMDcwLCJqdGkiOiI3ODc4YzU2NzEyOGQ0ZmY0OWRmMGIxZmRjZjVmMGEwZCIsInVzZXJfaWQiOjQ2fQ.MOQ7k7mRG10gUdT-AHY-Z3NuLf1x6Na4ng8aYiX4pVs",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ3Mzk3NDcwLCJpYXQiOjE3NDczODMwNzAsImp0aSI6ImZlYjRjNTFkOWFlZTQwNzBhZDNlZmY4NzAyMWVmNmM4IiwidXNlcl9pZCI6NDZ9.V5ik5tEIEkh3U8X_hDaFqjL97mm5j0ASfO5Gl5QAOqU",
};
