import React, { useState } from "react";
import * as Yup from "yup";
import { withFormik } from "formik";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { Container, Form } from "semantic-ui-react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ClientAlerts from "../../components/ClientAlerts/ClientAlerts";
import VerifyAccount from "../../components/VerifyAccount/VerifyAccount";
import "./SignUp.scss";

function SignUp({
  errors,
  values: { username, firstName, lastName, password, confirmPassword },
  handleChange,
}) {
  const [alerts, setAlerts] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
      });
      console.log(user);
      toggle();
    } catch (error) {
      setAlerts(error.message);
      console.log("error signing up:", error);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Container className="d-flex flex-column justify-content-between align-items-center mt-4">
        <Link to={"/"}>
          <p className="signup-title h2">
            <strong>DogPaws</strong>
          </p>
        </Link>
        <Form className="signup-form">
          <Form.Group widths="equal" className="d-flex">
            <Form.Field className="d-flex flex-column">
              <label className="signup-label-color" for="firstName">
                First Name:
              </label>
              <input
                id="firstName"
                className="signup-field-comp-split"
                name="firstName"
                placeholder="John"
                value={firstName}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field className="d-flex flex-column">
              <label className="signup-label-color ml-4" for="lastName">
                Last Name:
              </label>
              <input
                id="lastName"
                className="signup-field-comp-split ml-4"
                name="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field width="12" className="d-flex flex-column">
            <label className="signup-label-color" for="username">
              UW Email:
            </label>
            <input
              id="username"
              className="signup-field-comp"
              name="username"
              placeholder="JohnDoe@email.com"
              value={username}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Group widths="equal" className="d-flex">
            <Form.Field className="d-flex flex-column">
              <label className="signup-label-color" for="password">
                Password:
              </label>
              <input
                className="signup-field-comp-split"
                id="password"
                type="password"
                name="password"
                placeholder="YourPassword1234!"
                value={password}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field className="d-flex flex-column">
              <label className="signup-label-color ml-4" for="confirmPassword">
                Confirm Password:
              </label>
              <input
                className="signup-field-comp-split ml-4"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={handleChange}
              />
            </Form.Field>
          </Form.Group>
          <ClientAlerts alerts={alerts} />
          <div className="d-flex flex-column">
            <button onClick={() => signUp()} className="submit-but">
              <p>Sign Up</p>
            </button>
            <Link className="redirect-login" to={"/Login"}>
              <div>Already have a login?</div>
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

const EnhancedSignUp = withFormik({
  mapPropsToValues: () => ({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .max(62, "Username is too long.")
      .min(2, "Username to short.")
      .required("Username is Required."),
    email: Yup.string()
      .email("Invalid electronic mail address.")
      .required("E-mail is Required."),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is Required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm you're password."),
  }),
})(SignUp);

export default EnhancedSignUp;
