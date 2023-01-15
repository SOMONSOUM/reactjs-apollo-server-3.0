import React, { useState } from "react";
import { Container } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Routes } from "../../router";
import { useMutation } from "@apollo/client";
import { useAppDispatch } from "../../app/hooks";
import { LOGIN_USER } from "../../graphql/mutations/userMutation";
import "./sign-in.scss";
import { userLogInAction } from "../../features/user/userSlice";
import { GET_CATEGORIES } from "../../graphql/queries/categoryQuery";
import { GET_CONTENT } from "../../graphql/queries/contentQuery";

export default function SignInView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();

  const [logInUser, { loading }] = useMutation(LOGIN_USER, {
    // variables: { email, password },
    variables: { input: { email, password } },
    refetchQueries: [
      { query: GET_CATEGORIES, variables: { text: "" } },
      { query: GET_CONTENT },
    ],
    update(cache, { data: { logInUser } }) {
      dispatch(userLogInAction(logInUser));
    },
    onError: ({ message }) => setError(message),
    onCompleted: () => setError(""),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    logInUser();
  };

  return (
    <>
      <Container fluid>
        <Container>
          <div className="authentication-controller">
            <div className="form-left-side">
              <div className="content-body-form">
                <div className="title-form">
                  <span>Welcome Back!</span>
                </div>
                <div className="title-description">
                  <p>
                    To keep connect with us please login with your personal info
                  </p>
                </div>
                <NavLink to={Routes.SIGN_UP}>
                  <div className="btn-sign-in">
                    <span>Sign Up</span>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="form-right-side form-login">
              <div className="content-body-form">
                <div className="title-form">
                  <span>Connect Account</span>
                </div>
                <div className="title-description">
                  <p>or use your email address for login</p>
                </div>
                <div className="content-form-submit">
                  <form onSubmit={onSubmit}>
                    <div>
                      <label>Email</label>
                    </div>
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label>Password</label>
                    </div>
                    <div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        required
                      />
                    </div>
                    {loading && <button>Signing In...</button>}
                    {!loading && <button>Sign In</button>}
                  </form>
                </div>
                {error && (
                  <div className="box-error-message">
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
}
