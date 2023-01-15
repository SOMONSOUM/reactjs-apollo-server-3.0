import React from "react";
import { Container, Col } from "reactstrap";
import ImageNotFound from "../../asset/icon/not-found.png";
import { NavLink } from "react-router-dom";
import { Routes } from "../../router";
import "./not-found.scss";

export default function NotFoundView() {
  return (
    <>
      <Container>
        <Col xl="12" lg="12" md="12">
          <div className="not-found-container">
            <div className="box-content-page">
              <div className="box-image">
                <img src={ImageNotFound} alt="not-found" />
              </div>
              <div className="title-page">
                <span>Page not found</span>
              </div>
              <div className="description-page">
                <p>We looked everywhere for this page</p>
                <p>Are you sure the website URL is correct?</p>
                <p>Get in touch with the site owner.</p>
              </div>
              <NavLink to={Routes.INDEX}>
                <div className="btn-go-back">
                  <span>Go Back</span>
                </div>
              </NavLink>
            </div>
          </div>
        </Col>
      </Container>
    </>
  );
}
