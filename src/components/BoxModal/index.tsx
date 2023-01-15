import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  POST_CATEGORY,
  UPDATE_CATEGORY,
} from "../../graphql/mutations/categoryMutation";
import {
  Category,
  CategoryObjectType,
  GET_ALL_CATEGORIES,
  GET_CATEGORIES,
} from "../../graphql/queries/categoryQuery";
import { UpdatePreference } from "../../views/overview";
import { CREATE_CONTENT } from "../../graphql/mutations/contentMutation";
import { GET_CONTENT } from "../../graphql/queries/contentQuery";
import "./box-modal.scss";

export interface BoxModalType {
  modal: boolean;
  isCate: boolean;
  onToggle: VoidFunction;
  isEdit: UpdatePreference;
}
export default function BoxModal({
  isCate,
  modal,
  onToggle,
  isEdit,
}: BoxModalType) {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [pathImage, setPathImage] = useState("");
  const [error, setError] = useState("");
  const { isUpdated, values } = isEdit;

  const client = useApolloClient();

  const { data } = useQuery(GET_ALL_CATEGORIES) as Category;
  const [createCategory, { loading }] = useMutation(POST_CATEGORY, {
    variables: { input: { title } },
    refetchQueries: [
      { query: GET_ALL_CATEGORIES },
      { query: GET_CATEGORIES, variables: { text: "", page: 1, limit: 1 } },
    ],
    onCompleted: () => client.resetStore(),
  });

  const [updateCategory, { loading: isLoading }] = useMutation(
    UPDATE_CATEGORY,
    {
      variables: { id: values?.id, input: { title } },
      refetchQueries: [{ query: GET_CATEGORIES, variables: { text: "" } }],
    }
  );

  const [createContent, { loading: isContentLoading }] = useMutation(
    CREATE_CONTENT,
    {
      variables: {
        categoryId: category,
        input: {
          title: subTitle,
          description: content,
          photo: pathImage ?? "",
        },
      },
      refetchQueries: [{ query: GET_CONTENT }],
      onCompleted: () => {
        setSubTitle("");
        setContent("");
        setCategory("");
        setError("");
        onToggle();
      },
    }
  );

  const onSubmitClient = (e: React.FormEvent) => {
    e.preventDefault();

    if (isUpdated) {
      updateCategory();
    } else {
      createCategory();
    }
    setTitle("");
    onToggle();
  };

  const onSubmitContent = (e: React.FormEvent) => {
    e.preventDefault();

    createContent();
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPathImage(reader.result as string);
    };
  };

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files as FileList;
    if (!file[0].type.startsWith("image")) {
      return setError("Image only...!");
    }
    previewFile(file[0]);
    setError("");
  };

  useEffect(() => {
    if (Object.values(values || {}).length > 0) {
      setTitle(values?.title!);
    } else {
      setTitle("");
    }
  }, [values]);

  return (
    <div>
      <Modal isOpen={modal}>
        {isCate ? (
          <>
            <ModalHeader toggle={onToggle}>New Category</ModalHeader>
            <div className="box-form-modal">
              <form onSubmit={onSubmitClient}>
                <ModalBody>
                  <div>
                    <label>Title</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      autoFocus
                      required
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button outline color="info">
                    {loading || isLoading ? "Submitin..." : "Submit"}
                  </Button>
                  <Button outline color="danger" onClick={onToggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            </div>
          </>
        ) : (
          <>
            <ModalHeader toggle={onToggle}>New Project</ModalHeader>
            <div className="box-form-modal">
              <form onSubmit={onSubmitContent}>
                <ModalBody>
                  <div>
                    <label>Title</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={subTitle}
                      onChange={(e) => {
                        setSubTitle(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label>Content</label>
                  </div>
                  <div>
                    <textarea
                      value={content}
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div>
                    {error && (
                      <Alert>
                        <span>{error}</span>
                      </Alert>
                    )}
                  </div>
                  <div>
                    <label>Photo</label>
                  </div>
                  <div>
                    <input type="file" onChange={onChangeFile} />
                  </div>
                  <div>
                    <textarea
                      value={pathImage}
                      onChange={(e) => {
                        setPathImage(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label>Category</label>
                  </div>
                  <div>
                    <select
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                      required
                    >
                      <option value="">Select Category</option>
                      {data?.allCategories?.data?.map(
                        (val: CategoryObjectType) => (
                          <option key={val.id} value={val.id}>
                            {val.title}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button disabled={error ? true : false} outline color="info">
                    {isContentLoading ? "Loading..." : "Submit"}
                  </Button>
                  <Button
                    outline
                    color="danger"
                    disabled={isContentLoading ? true : false}
                    onClick={onToggle}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
