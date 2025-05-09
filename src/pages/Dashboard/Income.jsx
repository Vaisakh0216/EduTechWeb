import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import incomeIcon from "../../assets/incomeIcon.svg";

function Income({ data }) {
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
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "20px",
                  }}
                >
                  120,000,000
                </span>
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#898989",
                }}
              >
                Income
              </span>
            </div>
            <img
              src={incomeIcon}
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

export default Income;
