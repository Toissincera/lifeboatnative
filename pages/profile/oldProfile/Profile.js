import React from "react";
import { MemberService } from "../../data/services/member.service";
import { SidebarLayout } from "../../layouts";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import { UserState } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import {
  ExpandMore,
  ArrowBackIosNew,
  VerifiedUser,
  Work,
  Business,
  Phone,
  Email,
  VolunteerActivism,
  Home,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import MyAssignedCases from "./MyAssignedCases";
import MyCreatedCases from "./MyCreatedCases";
import MyDonations from "./MyDonations";
import { isoDateToFullFormat } from "../../utils/string.utils";
import Skeleton from "../../components/skeleton/Skeleton";

export default function ProfileParent() {
  return <SidebarLayout><Profile /></SidebarLayout>;
}

export function Profile() {
  const [user] = useRecoilState(UserState);
  const pfpImgSrc = `src/img/profile.jpeg`;
  const [me, setMe] = React.useState(null);
  const [myCases, setMyCases] = React.useState([]);
  const [myDonations, setMyDonations] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const [meRes, casesRes, donationsRes] = await Promise.all([
        MemberService.get(user.member_uid),
        MemberService.getMemberCases(user.member_uid),
        MemberService.getMemberDonations(user.member_uid),
      ]);
      setMe(meRes);
      setMyCases(casesRes);
      setMyDonations(donationsRes);
    };
    fetchData();
  }, [user.member_uid]);

  if (!me) return <Skeleton type="circle" />

  return (
    <Grid container spacing={2} sx={{ p: { xs: 0.5, sm: 2, lg: 3 } }}>
      <Grid item xs={12} md={3}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} textAlign="center">
            <Avatar src={pfpImgSrc} sx={{ width: 150, height: 150, mx: "auto" }} />
          </Grid>
          <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
            <Link to="/dashboard" style={{ display: "flex", alignItems: "center" }}>
              <ArrowBackIosNew sx={{ color: "teal", fontSize: 24 }} />
            </Link>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ ml: 1, display: "flex", alignItems: "center", lineHeight: 1 }}
            >
              {me?.user?.first_name} {me?.user?.last_name}
              {me?.enabled && (
                <VerifiedUser color="success" sx={{ ml: 0.5, fontSize: 20 }} />
              )}
            </Typography>
          </Grid>

          <Grid item xs={12} sx={roleStyle}><VolunteerActivism sx={{ mr: 1 }} color="primary" />{me?.role?.toUpperCase()}</Grid>
          <Grid item xs={12} sx={infoStyle}><Work sx={{ mr: 1 }} color="primary" />{me?.profession}</Grid>
          <Grid item xs={12} sx={infoStyle}><Business sx={{ mr: 1 }} color="primary" />{me?.organization}</Grid>
          <Grid item xs={12} sx={infoStyle}><Phone sx={{ mr: 1 }} color="primary" />{me?.phone_number}</Grid>
          <Grid item xs={12} sx={infoStyle}><Email sx={{ mr: 1 }} color="primary" />{me?.user?.email}</Grid>
          <Grid item xs={12} sx={infoStyle}><Home sx={{ mr: 1 }} color="primary" />
            {me?.address?.street}   <br/>
            {me?.address?.locality} <br/>
            {me?.address?.city} {me?.address?.pincode}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={9}>
        {[
          {
            label: "My Donations",
            content: <MyDonations donos={myDonations} />
          },
          {
            label: "My Assigned Cases",
            content: <MyAssignedCases cases={myCases.assigned_cases} />
          },
          {
            label: "My Created Cases",
            content: <MyCreatedCases cases={myCases.created_cases} />
          }
        ].map((section, idx) => (
          <Accordion key={idx}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold" fontSize={{ xs: "0.9rem", sm: "1.0rem" }}>
                {section.label}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              {section.content}
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>

    </Grid>
  );
}

const roleStyle = {
  color: "orangered",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
};

const infoStyle = {
  fontWeight: "400",
  display: "flex",
  alignItems: "center",
};

export function dateTimeShow(dateTimeString) {
  return (
    <>
      {isoDateToFullFormat(dateTimeString)}
    </>
  );
}