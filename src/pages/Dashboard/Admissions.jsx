import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import totalAdmissions from "../../assets/totalAdmissions.svg";

function AdmissionTotal({ data }) {
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
                alignItems: "center",
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
                  200,00
                </span>
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#898989",
                }}
              >
                Total Admissions
              </span>
            </div>
            <img
              src={totalAdmissions}
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

export default AdmissionTotal;
