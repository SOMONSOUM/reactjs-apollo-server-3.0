import React, { useState } from "react";
import { Container } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Routes } from "../../router";
import "./sign-up.scss";
import { useAppDispatch } from "../../app/hooks";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutations/userMutation";
import { userLogInAction } from "../../features/user/userSlice";
import { GET_CATEGORIES } from "../../graphql/queries/categoryQuery";
import { GET_CONTENT } from "../../graphql/queries/contentQuery";

export default function SignUpView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const dispatch = useAppDispatch();

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    variables: { input: { name, email, password } },
    refetchQueries: [
      { query: GET_CATEGORIES, variables: { text: "" } },
      { query: GET_CONTENT },
    ],
    update(_cache, { data: { registerUser } }) {
      dispatch(userLogInAction(registerUser));
    },
    onError: ({ message }) => setErrMessage(message),
    onCompleted: () => setErrMessage(""),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    registerUser();
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
                <NavLink to={Routes.SIGN_IN}>
                  <div className="btn-sign-in">
                    <span>Sign In</span>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="form-right-side">
              <div className="content-body-form">
                <div className="title-form">
                  <span>Create Account</span>
                </div>
                <div className="title-description">
                  <p>or use your email address for registration</p>
                </div>
                <div className="content-form-submit">
                  <form onSubmit={onSubmit}>
                    <div>
                      <label>Name</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                    </div>
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
                    {loading ? (
                      <button>Signing Up...</button>
                    ) : (
                      <button>Sign Up</button>
                    )}
                  </form>
                </div>
                {errMessage && (
                  <div className="box-error-message">
                    <span>{errMessage}</span>
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
