import React from "react";
import BasicTabs from "../../components/atoms/Tab";
import StudentFee from "./StudentFee";
import AgentFee from "./AgentFee";

function Payment() {
  const headers = ["Student Fee", "Service Charge"];
  const content = [
    <div>
      <StudentFee />
    </div>,
    <div>
      <AgentFee />
    </div>,
  ];
  return (
    <div>
      <BasicTabs tabContent={content} tabHeaders={headers} />
    </div>
  );
}

export default Payment;
