import { useState } from "react";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
// import { snackbarState, UserState } from "../recoil/atom";
// import { TextGrid } from "./../components/forms";
// import { AuthService } from "../../data/services";
// import StepperLanding from "../components/Stepper";
// import { GoogleLogin } from "@react-oauth/google";

import { Text, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControllerFormInput } from "../../components/forms/TextGrid";
import { Button } from "@rneui/base";
import { AuthService } from "../../data/services/auth.service";

export default function SignUp() {
  // const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  // const [user, setUser] = useRecoilState(UserState);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState("  ...   ");

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  // const handleGoogleSuccess = async (credentialResponse) => {
  //   setLoading(true);
  //   try {
  //     const res = await AuthService.googleSignup(credentialResponse.credential);
  //     const user = {
  //       ...res.data,
  //       token: res.data.access,
  //       refreshToken: res.data.refresh,
  //     };
  //     sessionStorage.setItem("user", JSON.stringify(user));
  //     setUser(user);

  //     setSnackbar({
  //       severity: "success",
  //       message: `Welcome back!`,
  //       open: true,
  //     });
  //   } catch (err) {
  //     setSnackbar({
  //       severity: "error",
  //       message: "Google signup failed",
  //       open: true,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleGoogleError = () => {
  //   setSnackbar({
  //     severity: "error",
  //     message: "Google signup failed",
  //     open: true,
  //   });
  // };

  const handleOnSubmit = (data) => {
    setLoading(true);
    let cleanUsername =
      data.username.slice(0, 1).toLowerCase() + data.username.slice(1);
    AuthService.signup(
      data.first_name,
      data.last_name,
      data.email,
      cleanUsername,
      data.password
    )
      .then((result) => {
        // setSnackbar({
        //   severity: "success",
        //   message: `Welcome ${user.member_full_name}! Complete member details...`,
        //   open: true,
        // });
        console.log("signup result => ", JSON.stringify(result, null, 4));
        return AuthService.login(data.username, data.password);
      })
      .then((result) => {
        // setUser(result);
        console.log("signed in as => ", result);
        // setSnackbar({
        //   ...snackbar,
        //   severity: "success",
        //   message:
        //     result?.memberRole == null
        //       ? "Complete Member Details"
        //       : `Welcome ${result.data.member_full_name}!`,
        //   open: true,
        // });
      })
      .catch((err) => {
        // setSnackbar({
        //   severity: "error",
        //   message: err?.error?.non_field_errors || "Unknown login error",
        //   open: true,
        // });
        console.log("Error => ", err);
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
    <ScrollView style={{ padding: 24 }}>
      <ControllerFormInput
        control={control}
        name={"firstName"}
        placeholder={"First Name"}
        errors={errors.firstName}
        required
      />
      <ControllerFormInput
        control={control}
        name={"lastName"}
        placeholder={"Last Name"}
        required
        errors={errors.lastName}
      />
      <ControllerFormInput
        control={control}
        name={"email"}
        placeholder={"Email"}
        required
        errors={errors.email}
      />
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
        title="Sign Up Now!"
        onPress={handleSubmit(handleOnSubmit)}
        loading={loading}
      />
      <Text>{formData}</Text>
    </ScrollView>
  );
}
