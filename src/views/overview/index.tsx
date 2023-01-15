import React, { useState } from "react";
import NavBar from "../../components/Navbar";
import { Row, Col, Container } from "reactstrap";
import { BiCategory } from "react-icons/bi";
import { BsFillBookmarkFill } from "react-icons/bs";
import ProjectBox from "../../components/ProjectBox";
import BoxModal from "../../components/BoxModal";
import { Table } from "reactstrap";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  Category,
  CategoryObjectType,
  GET_ALL_CATEGORIES,
  GET_CATEGORIES,
} from "../../graphql/queries/categoryQuery";
import "./overview.scss";
import Loading from "../../components/Loading";
import { DELETE_CATEGORY } from "../../graphql/mutations/categoryMutation";
import {
  Content,
  ContentObjectTypes,
  GET_CONTENT,
} from "../../graphql/queries/contentQuery";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export interface UpdatePreference {
  isUpdated: boolean;
  values?: CategoryObjectType | null;
}

export default function Overview() {
  const [modal, setModal] = useState(false);
  const [isCate, setIsCate] = useState(false);
  const [cateErr, setCateErr] = useState("");
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

  const client = useApolloClient();
  const [isUpdate, setIsUpdate] = useState<UpdatePreference>({
    isUpdated: false,
    values: null,
  });

  const { loading, data } = useQuery(GET_CATEGORIES, {
    variables: { text, page, limit: 10 },
    onError: ({ message }) => setCateErr(message),
  }) as Category;

  const { data: content, loading: isLoading } = useQuery(GET_CONTENT, {
    onError: ({ message }) => setError(message),
  }) as Content;

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [
      { query: GET_CONTENT },
      { query: GET_ALL_CATEGORIES },
      { query: GET_CATEGORIES, variables: { text: "", page: 1, limit: 10 } },
    ],
    onCompleted: () => client.resetStore(),
  });

  // const [searchCategory, { data: dataSearch }] = useMutation(SEARCH_CATEGORY, {
  //   variables: { text, page, limit: 1 },
  //   refetchQueries: [
  //     { query: GET_CATEGORIES, variables: { text, page: 1, limit: 1 } },
  //   ],
  // });
  // console.log(dataSearch);

  const onToggle = () => {
    setModal(!modal);
    setIsUpdate({ isUpdated: false, values: null });
  };
  const onClient = () => {
    setIsCate(true);
    setModal(!modal);
  };
  const onProject = () => {
    setIsCate(false);
    setModal(!modal);
  };

  const onSearchCategory = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setPage(1);
  };

  return (
    <>
      <div className="main-container">
        <NavBar />
        <div className="body-container">
          <Container>
            <Row>
              <Col xl="12" lg="12" md="12">
                <div className="btn-both-modal">
                  <div className="add-button-modal" onClick={onClient}>
                    <BiCategory />
                    <span>Add Category</span>
                  </div>
                  <div
                    className="add-button-modal background-violet"
                    onClick={onProject}
                  >
                    <BsFillBookmarkFill />
                    <span>Add Project</span>
                  </div>
                </div>
              </Col>
              <BoxModal
                isEdit={isUpdate}
                isCate={isCate}
                modal={modal}
                onToggle={onToggle}
              />
            </Row>
            <Row>
              {isLoading && <Loading />}
              {!isLoading && content?.contents?.length === 0 && (
                <div className="data-not-found">
                  <span>Content not found</span>
                </div>
              )}
              {error && (
                <div className="data-not-found">
                  <span>{error}</span>
                </div>
              )}
              {content?.contents?.map((val: ContentObjectTypes) => (
                <ProjectBox
                  key={val.id}
                  id={val.id!}
                  title={val.title!}
                  status={val.category?.title!}
                />
              ))}
            </Row>
            <Row>
              <div className="table-row">
                {loading && <Loading />}
                <div className="box-search">
                  <form onSubmit={onSearchCategory}>
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => {
                        onSearchChange(e);
                      }}
                      required
                    />
                    <button>Search</button>
                  </form>
                </div>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.categories?.data?.map((val: CategoryObjectType, idx: number) => (
                      <tr key={val.id}>
                        <td>{idx + 1}</td>
                        <td>{val.title}</td>
                        <td>
                          {new Date(+val.createdAt).toLocaleDateString("en-US")}
                          -{" "}
                          {new Date(+val.createdAt).toLocaleTimeString("en-US")}
                        </td>
                        <td>
                          <div className="action-status">
                            <div
                              className="update-icon"
                              onClick={() => {
                                onClient();
                                setIsUpdate({ isUpdated: true, values: val });
                              }}
                            >
                              <GrUpdate />
                            </div>
                            <span> | </span>
                            <div
                              className="delete-icon"
                              onClick={() => {
                                deleteCategory({ variables: { id: val.id } });
                              }}
                            >
                              <MdDelete />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {data?.categories?.data?.length! !== 0 &&
                  data?.categories?.pagination && (
                    <div className="box-pagination">
                      {data.categories.pagination.pagination.prev && (
                        <div
                          className="prev-btn"
                          onClick={() => {
                            setPage(
                              data.categories?.pagination.pagination.prev.page!
                            );
                          }}
                        >
                          <span>
                            <IoIosArrowBack />
                          </span>
                        </div>
                      )}
                      {data.categories.pagination.allPages.map(
                        (val: number) => (
                          <div
                            className={`number ${page === val ? `active` : ``}`}
                            onClick={() => {
                              setPage(val);
                            }}
                            key={val}
                          >
                            <span>{val}</span>
                          </div>
                        )
                      )}
                      {data.categories.pagination.pagination.next && (
                        <div
                          className="next-btn"
                          onClick={() => {
                            setPage(
                              data.categories?.pagination.pagination.next.page!
                            );
                          }}
                        >
                          <span>
                            <IoIosArrowForward />
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                {cateErr && (
                  <div className="data-not-found">
                    <span>{cateErr}</span>
                  </div>
                )}
                {data?.categories?.errors[0]?.message && (
                  <div className="data-not-found">
                    <span>Category not found</span>
                  </div>
                )}
              </div>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
