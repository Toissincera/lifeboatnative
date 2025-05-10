import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { snackbarState, UserState } from "../recoil/atom";
import { TextGrid } from "./../components/forms";
import { AuthService } from "../data/services";

export const OTP = ({ setPageMode }) => {
  //   const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [user, setUser] = useRecoilState(UserState);

  const validationSchema = Yup.object().shape({
    otp_code: Yup.number()
      .positive()
      .integer()
      .required("OTP is required")
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleOnSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    setLoading(true);
    // We can submit the form
    AuthService.otp_code(data.otp_code)
      .then((result) => {
        console.log("API Success => ", result);
        setUser(result);
        setSnackbar({
          ...snackbar,
          severity: "success",
          message: "Welcome back!",
          open: true,
        });
        setPageMode("details");
        // setTimeout(() => {
        //   navigate("/dashboard");
        // }, 200);
      })
      .catch((err) => {
        console.log(err)
        setSnackbar({
          ...snackbar,
          severity: "error",
          message: err?.error?.non_field_errors || "Unknown login error",
          open: true,
        });
        setPageMode("details");
        console.log("OTP failed, skipping to details")
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
  };

  return (
    <>
      <Grid container style={{ minWidth: "400px", justifyContent: "center" }} p={2}>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="w-100"
          style={{ background: "", width: "80%" }}
        >

          <TextGrid
            size={12}
            fKey="otp_code"
            label="Enter OTP"
            errors={errors}
            required
            disabled={loading}
            register={register}
            inputType="number"
          />

          <Box my={3} width="100%">
            <LoadingButton
              variant="contained"
              fullWidth
              size="large"
              type="submit"
              loading={loading}
            >
              Submit OTP
            </LoadingButton>
          </Box>

        </form>
      </Grid>
    </>
  );
};
