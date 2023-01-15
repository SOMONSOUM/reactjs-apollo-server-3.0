import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import { Container, Row, Col, Button, ModalFooter, Alert } from "reactstrap";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { Routes } from "../../router";
import { MdAccountBox } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { FcPositiveDynamic } from "react-icons/fc";
import { useMutation, useQuery } from "@apollo/client";
import {
  Content,
  GET_CONTENT,
  GET_CONTENT_BY_ID,
} from "../../graphql/queries/contentQuery";
import Loading from "../../components/Loading";
import {
  Category,
  CategoryObjectType,
  GET_ALL_CATEGORIES,
} from "../../graphql/queries/categoryQuery";
import {
  DELETE_CONTENT,
  UPDATE_CONTENT,
} from "../../graphql/mutations/contentMutation";
import "./project-detail.scss";
import useUploadImage from "../../hook/useUploadImage";

export default function ProjectDetail() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState("");

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_CONTENT_BY_ID, {
    variables: { id },
  }) as Content;
  const { onChangeFile, pathImage, errUpload } = useUploadImage();

  const { data: allCategories } = useQuery(GET_ALL_CATEGORIES) as Category;
  const [deleteContent] = useMutation(DELETE_CONTENT, {
    variables: { id },
    refetchQueries: [{ query: GET_CONTENT }],
    onCompleted: () => history.push(`${Routes.INDEX}`),
  });
  const [updateContent] = useMutation(UPDATE_CONTENT, {
    variables: {
      id,
      input: {
        title,
        description: content,
        categoryId: status,
        photo: pathImage ? pathImage : photo,
      },
    },
    refetchQueries: [{ query: GET_CONTENT }],
  });

  useEffect(() => {
    if (data?.content) {
      setTitle(data.content.title!);
      setContent(data.content.description!);
      setStatus(data.content.category?.id!);
      setPhoto(data.content.photo!);
    } else {
      setTitle("");
      setContent("");
      setPhoto("");
      setStatus("");
    }
  }, [data]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent();
  };

  return (
    <>
      <div className="main-container">
        <NavBar />
        <div className="body-container">
          <Container>
            <Row>
              {loading && (
                <div style={{ marginTop: "40px" }}>
                  <Loading />
                </div>
              )}
              {error && (
                <div style={{ marginTop: "20px" }}>
                  <span className="error-message">Something went wrong...</span>
                </div>
              )}
              {!loading && !error && (
                <Col xl="12" lg="12" md="12">
                  <div className="box-project-detail">
                    <div className="title-bar">
                      <div className="title-text-span">
                        <span>{data?.content?.title}</span>
                      </div>
                      <NavLink to={Routes.INDEX}>
                        <div className="btn-go-back">
                          <span>Back</span>
                        </div>
                      </NavLink>
                    </div>
                    <div className="body-bar">
                      <p>{data?.content?.description}</p>
                      <h4>Category Status</h4>
                      <span>{data?.content?.category?.title}</span>
                      <div className="box-image">
                        <img src={data?.content?.photo} alt="" />
                      </div>
                      <div className="client-information">
                        <h4>Client Information</h4>
                        <div className="box-tool-bar">
                          <MdAccountBox />
                          <span>{data?.content?.user?.name}</span>
                        </div>
                        <div className="box-tool-bar">
                          <FiMail />
                          <span>{data?.content?.user?.email}</span>
                        </div>
                        <div className="box-tool-bar">
                          <FcPositiveDynamic />
                          <span>{data?.content?.user?.role}</span>
                        </div>
                      </div>
                      <div className="box-form-modal">
                        <h3>Update Project Details</h3>
                        <form onSubmit={onSubmit}>
                          <div>
                            <label>Title</label>
                          </div>
                          <div>
                            <input
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              type="text"
                              required
                            />
                          </div>
                          <div>
                            <label>Content</label>
                          </div>
                          <div>
                            <input
                              type="text"
                              value={content}
                              onChange={(e) => {
                                setContent(e.target.value);
                              }}
                              required
                            />
                          </div>
                          <div>
                            {errUpload && (
                              <Alert>
                                <span>{errUpload}</span>
                              </Alert>
                            )}
                          </div>
                          <div>
                            <label>Photo</label>
                          </div>
                          <div>
                            <input
                              type="file"
                              onChange={(e) => {
                                onChangeFile(e.target.files!);
                              }}
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={photo}
                              onChange={(e) => {
                                setPhoto(e.target.value);
                              }}
                            />
                          </div>
                          <div>
                            <label>Status</label>
                          </div>
                          <div>
                            <select
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option value="">Select Category</option>
                              {allCategories?.allCategories?.data?.map(
                                (val: CategoryObjectType) => (
                                  <option key={val.id} value={val.id}>
                                    {val.title}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <Button
                            disabled={errUpload ? true : false}
                            color="warning"
                            className="btn-update"
                          >
                            Update
                          </Button>
                          <ModalFooter>
                            <Button
                              color="danger"
                              className="btn-delete"
                              onClick={() => {
                                deleteContent();
                              }}
                            >
                              Delete Project
                            </Button>
                          </ModalFooter>
                        </form>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
