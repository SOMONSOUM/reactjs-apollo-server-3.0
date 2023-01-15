import React from "react";
import { Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Routes } from "../../router";
import "./project-box.scss";

export interface ProjectObjectTypes {
  id: string;
  title: string;
  status: string;
}

export default function ProjectBox({ title, status, id }: ProjectObjectTypes) {
  return (
    <>
      <Col xl="6" lg="6" md="6">
        <div className="box-project-client">
          <div className="left-box-side">
            <div className="title-project">
              <span>{title}</span>
            </div>
            <div className="status-project">
              <span>Category: {status}</span>
            </div>
          </div>
          <div className="right-box-side">
            <NavLink to={`${Routes.PROJECT_DETAIL}/${id}`}>
              <div className="btn-view-detail">
                <span>View</span>
              </div>
            </NavLink>
          </div>
        </div>
      </Col>
    </>
  );
}
