import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { snackbarState, UserState } from "../recoil/atom";
import { TextGrid } from "./../components/forms";
import { AuthService } from "../data/services";
import StepperLanding from "../components/Stepper";
import { GoogleLogin } from '@react-oauth/google';

export const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [user, setUser] = useRecoilState(UserState);
  // For Option 2 (Tabbed Interface)
  const [activeTab, setActiveTab] = useState(0);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email().required("Email is required"),
    username: Yup.string().required("username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await AuthService.googleSignup(credentialResponse.credential);
      const user = {
        ...res.data,
        'token': res.data.access,
        'refreshToken': res.data.refresh
      }
      sessionStorage.setItem('user', JSON.stringify(user))
      setUser(user);

      setSnackbar({
        severity: "success",
        message: `Welcome back!`,
        open: true,
      });
    } catch (err) {
      setSnackbar({
        severity: "error",
        message: "Google signup failed",
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setSnackbar({
      severity: "error",
      message: "Google signup failed",
      open: true,
    });
  };

  const handleOnSubmit = (data) => {
    let cleanUsername = data.username.slice(0, 1).toLowerCase() + data.username.slice(1);
    setLoading(true);
    AuthService.signup(data.first_name, data.last_name, data.email, cleanUsername, data.password)
      .then((result) => {
        setSnackbar({
          severity: "success",
          message: `Welcome ${user.member_full_name}! Complete member details...`,
          open: true,
        });
        return AuthService.login(data.username, data.password);
      })
      .then((result) => {
        setUser(result);
        console.log(result)
        setSnackbar({
          ...snackbar,
          severity: "success",
          message: result?.memberRole == null ? "Complete Member Details" : `Welcome ${result.data.member_full_name}!`,
          open: true,
        });
      })
      .catch((err) => {
        setSnackbar({
          severity: "error",
          message: err?.error?.non_field_errors || "Unknown login error",
          open: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Grid container style={{ width: "320px", justifyContent: "center", flexDirection: 'column', alignItems: 'center' }}>
        <StepperLanding active={0} />

        {/* --- OPTION 1: Prominent Google Sign-in with "Or" Separator --- */}
        <Box my={2} width="100%" display="flex" justifyContent="center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            width="256px"
            text="signup_with" // More descriptive text
          />
        </Box>

        <Box
          my={2}
          width="80%"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          color="grey.600"
        >
          <Box flexGrow={1} borderBottom="1px solid #ccc"></Box>
          <Box px={1}>OR</Box>
          <Box flexGrow={1} borderBottom="1px solid #ccc"></Box>
        </Box>

        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="w-100"
          style={{ width: "80%" }}
        >
          <TextGrid
            size={12}
            fKey="first_name"
            label="First Name"
            errors={errors}
            required
            disabled={loading}
            register={register}
          />

          <TextGrid
            size={12}
            fKey="last_name"
            label="Last Name"
            errors={errors}
            required
            disabled={loading}
            register={register}
          />

          <TextGrid
            size={12}
            fKey="email"
            label="Email Address"
            errors={errors}
            required
            disabled={loading}
            register={register}
          />

          <TextGrid
            size={12}
            fKey="username"
            label="Username"
            errors={errors}
            required
            disabled={loading}
            register={register}
          />

          <TextGrid
            size={12}
            fKey="password"
            label="Password"
            type="password"
            errors={errors}
            required
            disabled={loading}
            register={register}
          />

          <Box my={3} width="100%">
            <LoadingButton
              variant="contained"
              fullWidth
              size="large"
              type="submit"
              loading={loading}
            >
              Create Account
            </LoadingButton>
          </Box>
        </form>

        {/* --- OPTION 2: Tabbed Interface (Comment out Option 1 to use this) --- */}
        {/*
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="sign up options"
          variant="fullWidth"
          sx={{ mt: 2, width: '80%' }}
        >
          <Tab label="Sign Up with Google" />
          <Tab label="Create Account" />
        </Tabs>

        <Box mt={3} width="80%">
          {activeTab === 0 && (
            <Box display="flex" justifyContent="center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                width="256px"
              />
            </Box>
          )}
          {activeTab === 1 && (
            <form
              onSubmit={handleSubmit(handleOnSubmit)}
              className="w-100"
            >
              <TextGrid
                size={12}
                fKey="first_name"
                label="First Name"
                errors={errors}
                required
                disabled={loading}
                register={register}
              />

              <TextGrid
                size={12}
                fKey="last_name"
                label="Last Name"
                errors={errors}
                required
                disabled={loading}
                register={register}
              />

              <TextGrid
                size={12}
                fKey="email"
                label="Email Address"
                errors={errors}
                required
                disabled={loading}
                register={register}
              />

              <TextGrid
                size={12}
                fKey="username"
                label="Username"
                errors={errors}
                required
                disabled={loading}
                register={register}
              />

              <TextGrid
                size={12}
                fKey="password"
                label="Password"
                type="password"
                errors={errors}
                required
                disabled={loading}
                register={register}
              />

              <Box my={3} width="100%">
                <LoadingButton
                  variant="contained"
                  fullWidth
                  size="large"
                  type="submit"
                  loading={loading}
                >
                  Sign Up
                </LoadingButton>
              </Box>
            </form>
          )}
        </Box>
        */}
      </Grid>
    </>
  );
};