import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import netProfit from "../../assets/netProfit.svg";

function Net({ inc, exp }) {
  return (
    <Card
      sx={{
        borderRadius: "10px",
        flexGrow: "1",
        height: "180px",
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            spacing={3}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "20px",
                  }}
                >
                  119,500,000
                </span>
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#898989",
                }}
              >
                Net Profit
              </span>
            </div>
            <img
              src={netProfit}
              style={{
                width: "56px",
                height: "56px",
                backgroundColor: "lightgray",
                borderRadius: "50%",
              }}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Net;
