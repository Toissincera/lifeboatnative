import { CircularProgress } from "@mui/material";
import React from "react";
import "./skeleton.scss";

export default function Skeleton({ type }) {

  const Circle = () => (
    <div className="circle">
      <CircularProgress/>
    </div>
  );

  const CustomLoading = () => (
    <div className="custom">
      <div className="balls">
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
      </div>
      <span className="customText">Loading...</span>
    </div>
  );

  if (type === "circle") return <Circle />;
  if (type === "custom") return <CustomLoading />;
}