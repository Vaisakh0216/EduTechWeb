import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import MoneyIcon from "@mui/icons-material/Money";

function TotalExpense() {
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
                Expense
              </Typography>
              <Typography variant="h4">{3000000}</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "#FB9B0B",
                height: "56px",
                width: "56px",
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TotalExpense;
