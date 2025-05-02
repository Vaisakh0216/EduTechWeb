import React, { useEffect, useState } from "react";
import { getAgentDetail } from "../../services/getAgentDetail";
import { useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import BasicTable from "../../components/atoms/Table";

function AgentDetail() {
  const params = useParams();
  const [selectedAgentDetail, setSelectedAgengDetail] = useState();
  const columns = [
    "Admission Number",
    "Amount",
    "Status",
    "Created Date",
    "Updated Date",
  ];

  useEffect(() => {
    getAgentDetail(params?.id).then((res) => {
      setSelectedAgengDetail(
        res?.agent_fees?.map((item) => {
          return {
            admissionNumber: item?.admission_id,
            amount: item?.amount,
            status: item?.status,
            createdDate: item?.created_at,
            updatedDate: item?.updated_at,
          };
        })
      );
    });
  }, [params?.id]);

  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          <div>
            <h3>Agent Transaction List</h3>
          </div>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <span>Show</span>
            <span
              style={{
                padding: "10px",
                backgroundColor: "white",
                border: "1px solid lightblue",
                borderRadius: "5px",
              }}
            >
              5
            </span>{" "}
            <span>Per page</span>
          </div>
        </div>
        <div>
          <BasicTable
            columns={columns}
            rows={selectedAgentDetail}
            onClickFunction={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default AgentDetail;
