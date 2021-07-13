import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Container, Segment } from "semantic-ui-react";
import "./Home.scss";

export default function Home() {
  const [auth, setAuth] = useState(true);

  return auth ? (
    <Container>
      <Segment
        basic
        className="d-flex justify-content-center align-items-center"
      >
        <Grid centered columns="equal">
          <p className="login-title h2">
            <strong>DogPaws</strong>
          </p>
          <Link className="d-flex" to={"/login"}>
            <button className="login-but">
              <p>Login</p>
            </button>
          </Link>

          <Link className="d-flex" to={"/signup"}>
            <button className="signup-but">
              <p>Sign Up</p>
            </button>
          </Link>

          <a href="/#" className="home-help-link">
            Don't have a UW email?
          </a>
        </Grid>
      </Segment>
    </Container>
  ) : (
    <Container>
      <p>Who is this?</p>
    </Container>
  );
}
