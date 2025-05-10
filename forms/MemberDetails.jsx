import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { UserState, snackbarState } from "../recoil/atom";
import { TextGrid } from "../components/forms";
import { CitySelect, CountrySelect, StateSelect } from "./select";
import mainImg from "../img/charity.jpg";
import { MemberService } from "../data/services/member.service";
import StepperLanding from "../components/Stepper";

export const MemberDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [countryId, setCountryId] = useState();
  const [stateId, setStateId] = useState();
  const [user, setUser] = useRecoilState(UserState)

  const validationSchema = Yup.object().shape({
    phone_number: Yup.number()
      .positive()
      .integer()
      .required("Phone number is required"),
    profession: Yup.string().required("Profession is required"),
    organization: Yup.string().required("Organization is required"),
    address: Yup.object().shape({
      street: Yup.string().optional(),
      locality: Yup.string().optional(),
      country: Yup.number().positive().integer(),
      state: Yup.number().positive().integer(),
      city: Yup.number().positive().integer(),
      pincode: Yup.number()
        .transform((value, originalValue) => (originalValue === "" ? null : value))
        .positive("Pincode must be a positive number")
        .integer("Pincode must be an integer")
        .nullable()
        .optional(),
    }).nullable()
      .optional(),
    referred_by: Yup.string().required("Reference person is required"),
  });

  const handleOnStateChange = (e) => {
    setStateId(e?.target?.value);
  };

  const handleOnCountryChange = (e) => {
    setCountryId(e?.target?.value);
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const handleOnSubmit = (data) => {
    setLoading(true);
    MemberService.create(data)
      .then((result) => {
        setSnackbar({
          ...snackbar,
          severity: "success",
          message: `Welcome ${user.member_full_name}! Your profile has been created successfully!`,
          open: true,
        });
        setUser({ ...user, 'needs_details': false })
        setTimeout(() => {
          navigate("/awaiting-verification");
        }, 200);
      })
      .catch((err) => {
        setSnackbar({
          ...snackbar,
          severity: "error",
          message: err?.error?.non_field_errors || "Unknown member creation error",
          open: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${mainImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4} sx={{ opacity: "0.95", padding: 2 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h6" align="center">
                Complete Member Details
              </Typography>
            </Grid>
            <Grid item>
              <StepperLanding active={1} />
            </Grid>
            <Grid item>
              <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <TextGrid
                      fKey="phone_number"
                      label="Phone Number"
                      errors={errors}
                      required
                      disabled={loading}
                      register={register}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextGrid
                      fKey="profession"
                      label="Profession"
                      errors={errors}
                      required
                      disabled={loading}
                      register={register}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextGrid
                      fKey="organization"
                      label="Organization"
                      errors={errors}
                      required
                      disabled={loading}
                      register={register}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextGrid
                      fKey="referred_by"
                      label="Referred By"
                      errors={errors}
                      required
                      disabled={loading}
                      register={register}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextGrid
                      fKey="address.street"
                      label="Street"
                      errors={errors}
                      register={register}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextGrid
                      fKey="address.locality"
                      label="Locality"
                      errors={errors}
                      register={register}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <CountrySelect
                      name={"address.country"}
                      errors={errors}
                      control={control}
                      setValue={setValue}
                      onChange={handleOnCountryChange}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <StateSelect
                      name={"address.state"}
                      errors={errors}
                      control={control}
                      setValue={setValue}
                      disabled={!countryId}
                      onChange={handleOnStateChange}
                      countryId={countryId}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <CitySelect
                      name={"address.city"}
                      errors={errors}
                      disabled={!stateId}
                      control={control}
                      setValue={setValue}
                      stateId={stateId}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextGrid
                      fKey="address.pincode"
                      label="Pincode"
                      errors={errors}
                      disabled={loading}
                      register={register}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LoadingButton
                      variant="contained"
                      fullWidth
                      size="large"
                      type="submit"
                      loading={loading}
                    >
                      Add My Details
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};