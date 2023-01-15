import React from "react";
import { Container, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import GraphQL from "../../asset/icon/graphql.svg.png";
import { Routes } from "../../router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userLogOutAction } from "../../features/user/userSlice";
import { useApolloClient, useMutation } from "@apollo/client";
import { LOGOUT_USER } from "../../graphql/mutations/userMutation";
import { GET_CATEGORIES } from "../../graphql/queries/categoryQuery";
import "./navbar.scss";

export default function NavBar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const client = useApolloClient();

  const [logOutUser] = useMutation(LOGOUT_USER, {
    refetchQueries: [{ query: GET_CATEGORIES, variables: { text: "" } }],
    onCompleted: () => {
      client.resetStore();
      dispatch(userLogOutAction());
    },
  });
  return (
    <>
      <div className="navbar-container">
        <Container>
          <Row className="flex-row">
            <Col xl="6" lg="6" md="6">
              <div className="flex-left-side">
                <NavLink to={Routes.INDEX}>
                  <img src={GraphQL} alt="graphql" />
                  <span>GraphQL Management</span>
                </NavLink>
              </div>
            </Col>
            <Col xl="6" lg="6" md="6">
              <div className="flex-right-side">
                <div className="personal-name">
                  <span>Hello. {user?.name}</span>
                </div>
                <div
                  className="btn-log-out"
                  onClick={() => {
                    logOutUser();
                  }}
                >
                  <span>Logout</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
