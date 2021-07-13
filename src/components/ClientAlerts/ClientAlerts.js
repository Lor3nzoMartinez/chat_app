import React from "react";
import { Alert } from "reactstrap";

export default function ClientAlerts({ alerts }) {
  return <div>{alerts ? <Alert color="danger">{alerts}</Alert> : null}</div>;
}
