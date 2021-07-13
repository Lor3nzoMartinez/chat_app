import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Form } from "semantic-ui-react";
import { withFormik } from "formik";
import { Auth } from "aws-amplify";
import ClientAlerts from "../ClientAlerts/ClientAlerts";

function VerifyAccount({
  username,
  values: { verificationCode },
  handleChange,
  history,
}) {
  const [alerts, setAlerts] = useState("");

  const pushHome = () => {
    history.push("/");
  };

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, verificationCode);
      pushHome();
    } catch (error) {
      setAlerts(error.message);
      console.log("error confirming sign up", error);
    }
  }

  return (
    <div>
      <Form className="signup-form">
        <Form.Field className="d-flex flex-column">
          <label className="signup-label-color mb-3" for="verificationCode">
            Verification Code:
          </label>
          <input
            id="verificationCode"
            name="verificationCode"
            placeholder="code"
            value={verificationCode}
            onChange={handleChange}
          />
        </Form.Field>
        <ClientAlerts alerts={alerts} />
        <div className="d-flex flex-column">
          <button onClick={() => confirmSignUp()} className="verify-submit-but">
            <p>Verify Sign Up</p>
          </button>
        </div>
      </Form>
    </div>
  );
}

const EnhancedVerifyAccount = withFormik({
  mapPropsToValues: () => ({
    verificationCode: "",
  }),
})(VerifyAccount);

export default withRouter(EnhancedVerifyAccount);
