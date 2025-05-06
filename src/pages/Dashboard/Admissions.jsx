import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
function AdmissionTotal({ data }) {
  return (
    <Card sx={{ height: "160px", borderRadius: "10px" }}>
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography
                style={{ color: "grey", fontSize: "14px" }}
                variant="overline"
              >
                Total Admissions
              </Typography>
              <Typography variant="h4">{data}</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "#16B79F",
                height: "56px",
                width: "56px",
              }}
            >
              <SupervisedUserCircleIcon />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default AdmissionTotal;
