import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function Net() {
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
                Net Profit
              </Typography>
              <Typography variant="h4">{3000000}</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "#635AFF",
                height: "56px",
                width: "56px",
              }}
            >
              <CurrencyRupeeIcon />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Net;
