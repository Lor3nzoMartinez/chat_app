import React, { useState } from "react";
import { withFormik } from "formik";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";
import { Container, Form } from "semantic-ui-react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import VerifyAccount from "../../components/VerifyAccount/VerifyAccount";
import ClientAlerts from "../../components/ClientAlerts/ClientAlerts";
import "./Login.scss";

function Login({
  values: { username, password },
  handleChange,
  Media,
  history,
}) {
  const [alerts, setAlerts] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const pushHome = () => {
    history.push(`/`);
    window.location.reload();
  };

  async function signIn() {
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      pushHome();
    } catch (error) {
      setAlerts(error.message);
      error.code === "UserNotConfirmedException"
        ? toggle()
        : console.log("error signing in", error);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Container className="d-flex flex-column justify-content-between align-items-center mt-4">
        <Link to={"/"}>
          <p className="login-title h2">
            <strong>DogPaws</strong>
          </p>
        </Link>
        <Form className="signin-form">
          <Form.Field width="12" className="d-flex flex-column">
            <label className="signin-label" for="username">
              UW Email:
            </label>
            <input
              id="username"
              className="signin-field-comp"
              name="username"
              placeholder="example@uw.edu"
              value={username}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field width="12" className="d-flex flex-column mb-1">
            <label className="signin-label" for="password">
              Password:
            </label>
            <input
              id="password"
              className="signin-field-comp"
              name="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={handleChange}
            />
          </Form.Field>
          <ClientAlerts alerts={alerts} />
          <div className="d-flex flex-column">
            <button onClick={() => signIn()} className="submit-but">
              <p>Login</p>
            </button>

            <Link className="help-link">
              <div>Forgot Password?</div>
            </Link>
          </div>
        </Form>

        <Modal centered isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Please Verify Your Account</ModalHeader>
          <ModalBody>
            <VerifyAccount username={username} />
          </ModalBody>
        </Modal>
      </Container>
    </div>
  );
}

const EnhancedLogin = withFormik({
  mapPropsToValues: () => ({
    username: "",
    password: "",
    code: "",
  }),
  onSubmit: (values) => {
    console.log(values.username);
  },
})(Login);

export default withRouter(EnhancedLogin);
