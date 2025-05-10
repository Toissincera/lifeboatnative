import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Grid } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { snackbarState, UserState } from "../recoil/atom";
import { TextGrid } from "./../components/forms";
import { AuthService } from "../data/services";
import { IconButton, InputAdornment } from "@mui/material";
import { GoogleLogin } from '@react-oauth/google';

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [user, setUser] = useRecoilState(UserState);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
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
      sessionStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      setSnackbar({
        severity: "success",
        message: `Welcome back!`,
        open: true,
      });
    } catch (err) {
      setSnackbar({
        severity: "error",
        message: "Google sign-in failed",
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setSnackbar({
      severity: "error",
      message: "Google sign-in failed",
      open: true,
    });
  };

  const handleOnSubmit = (data) => {
    setLoading(true);
    let cleanUsername = data.username.slice(0, 1).toLowerCase() + data.username.slice(1);
    // We can submit the form
    AuthService.login(cleanUsername, data.password)
      .then((result) => {
        setUser(result);
        setSnackbar({
          ...snackbar,
          severity: "success",
          message: result?.memberRole == null ? "Complete Member Details" : `Welcome ${result.member_full_name}!`,
          open: true,
        });
      })
      .catch((err) => {
        console.log(err)
        setSnackbar({
          ...snackbar,
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

  return (
    <Grid container style={{ justifyContent: "center", flexDirection: 'column', alignItems: 'center' }}>
      <Box my={2} width="80%" display="flex" justifyContent="center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          width="256px"
          text="signin_with"
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
          type={isPassword ? "password" : "text"}
          errors={errors}
          required
          disabled={loading}
          register={register}
          sx={{
            borderRadius: "8px"
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setIsPassword(!isPassword)} edge="end">
                  {isPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box my={3} width="100%">
          <LoadingButton
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            loading={loading}
          >
            Sign In
          </LoadingButton>
        </Box>
      </form>
    </Grid>
  );
};