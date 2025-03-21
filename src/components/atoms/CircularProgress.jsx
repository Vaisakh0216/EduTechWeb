import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CustomCircularProgress() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size="10px" style={{ color: "white" }} />
    </Box>
  );
}
