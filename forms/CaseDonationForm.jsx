import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { snackbarState } from "../recoil/atom";
import { TextGrid } from "../components/forms";
import { MemberSelect } from "./select/MemberSelect";
import { CaseService } from "../data/services/case.service";

export const CaseDonationForm = ({ dialog, callbackFn = () => { } }, ref) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const location = useLocation();
  const caseId = location.pathname.split("/")[2];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const validationSchema = Yup.object().shape({
    donation_reference_id: Yup.string().required("Transaction Reference ID is required"),
    donated_by_uid: Yup.string().required("Donated member name is required"),
    amount_donated: Yup.string()
      .test(
        "is-valid-number",
        "Amount Donated must be a valid number",
        (value) => !value || !isNaN(value)
      )
      .required("Amount Donated is required")
      .test(
        "is-positive",
        "Amount Donated must be a positive number",
        (value) => Number(value) > 0
      )
      .test(
        "is-integer",
        "Amount Donated must be a whole number",
        (value) => Number.isInteger(Number(value))
      ),
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleOnSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    // Set the loading state
    callbackFn(1);
    setLoading(true);
    // We can submit the form
    data["is_verified"] = true;
    // data['is_manual'] = true
    data["case_uid"] = caseId;
    console.log(data);
    CaseService.postTransaction(data)
      .then((result) => {
        console.log("API Success => ", result);
        setSnackbar({
          ...snackbar,
          severity: "success",
          message: "Case donation added successfully",
          open: true,
        });
        callbackFn(true);
      })
      .catch((err) => {
        setSnackbar({
          ...snackbar,
          severity: "error",
          message: err?.error?.non_field_errors || err.error,
          open: true,
        });
        callbackFn(false);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        my: 1,
        justifyContent: "center",
      }}
    >
      <Paper elevation={2} sx={{ width: isMobile ? "100%" : "auto", maxWidth: 600 }}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
              <Box textAlign={"center"} py={2}>
                <Typography variant="h5">Manual Donation</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextGrid
                size={12}
                fKey="donation_reference_id"
                label="Transaction Reference ID"
                errors={errors}
                disabled={loading}
                register={register}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextGrid
                size={12}
                fKey="amount_donated"
                label="Amount Donated"
                errors={errors}
                disabled={loading}
                register={register}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <MemberSelect
                name={"donated_by_uid"}
                label={"Donated By"}
                errors={errors}
                control={control}
                setValue={setValue}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Box my={3} width="100%">
                <LoadingButton
                  variant="contained"
                  fullWidth
                  size="large"
                  type="submit"
                  loading={loading}
                >
                  Add Donation
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};