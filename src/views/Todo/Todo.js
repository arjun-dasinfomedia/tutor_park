import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CRow, CCol, CCard, CButton } from "@coreui/react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  todoList,
  deleteTodo,
  addTodo,
  completeTodo,
  uncompleteTodo,
} from "./TodoAction";
import ReactPaginate from "react-paginate";
import "./paginationStyle.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import TextField from "@material-ui/core/TextField";
import { checkAccessPermission } from "src/utility/utils";
const PER_PAGE = 10;

const MySwal = withReactContent(Swal);

const Todo = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [currentPage, setCurrentPage] = useState(0);
  const [checked, setChecked] = React.useState(true);
  const Todo = useSelector((state) => state.todo);

  // add To do List code

  const validationSchema = yup.object({
    name: yup.string("Enter your task").required("task is required"),
  });

  const initialValues = {
    name: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: (values, { resetForm }) => {
      dispatch(addTodo(values));
      resetForm({ values: "" });
    },
  });

  const todoDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTodo({ id }));
      }
    });
  };

  const markComplete = (id, is_completed) => {
    {
      is_completed == true
        ? Swal.fire({
          title: "Are you sure?",
          text: "You want to unmark this todo list?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "No",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(uncompleteTodo({ id }));
          }
        })
        : Swal.fire({
          title: "Are you sure?",
          text: "You want to mark this todo list?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "No",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(completeTodo({ id }));
          }
        });
    }
  };

  useEffect(async () => {
    showLoader();
    await dispatch(todoList());
    setLoading(false);
    hideLoader();
  }, []);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0)
  }

  const pageCount = Math.ceil(Todo.data.length / PER_PAGE);

  const offset = currentPage * PER_PAGE;

  const todoDynamic = Todo.data
    .slice(offset)
    .map(function (item, key) {
      return (
        <CCard className="mt-3 p-3 todocard ">
          <div>
            {item.is_completed == true ? (
              <div className="d-flex align-items-center">
                <div sm={1} md={1} lg={1} xl={1} xs={1}>
                  <input
                    className="custom-control-input d-flex align-items-center"
                    id="checkbox-large"
                    type="checkbox"
                    defaultChecked={checked}
                    onChange={() => setChecked(!checked)}
                    onClick={() => markComplete(item.id, item.is_completed)}
                  />
                </div>
                <div
                  sm={10}
                  md={10}
                  lg={10}
                  xl={10}
                  xs={10}
                  className="p-2 flex-grow-1"
                >
                  <span className="text-font-mark-css ml-2 d-flex align-items-center text-wrap">
                    {item.name}
                  </span>
                </div>
                <div sm={1} md={1} lg={1} xl={1} xs={1}>
                  <button
                    className="todo-delete-button d-flex align-items-center"
                    onClick={() => todoDelete(item.id)}
                  >
                    <FontAwesomeIcon className="deleteicon" icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                {checkAccessPermission("to_do_edit") ? (
                  <div sm={1} md={1} lg={1} xl={1} xs={1}>
                    <input
                      className="custom-control-input d-flex align-items-center"
                      id="checkbox-large"
                      type="checkbox"
                      onChange={() => setChecked(!checked)}
                      onClick={() => markComplete(item.id, item.is_completed)}
                    />
                  </div>
                ) : null}

                <div
                  sm={10}
                  md={10}
                  lg={10}
                  xl={10}
                  xs={10}
                  className="p-2 flex-grow-1"
                >
                  <span className="text-font-unmark-css ml-2 d-flex align-items-center text-wrap">
                    {item.name}
                  </span>
                </div>
                {checkAccessPermission("to_do_delete") ? (
                  <div sm={1} md={1} lg={1} xl={1} xs={1}>
                    <button
                      className="todo-delete-button d-flex align-items-center"
                      onClick={() => todoDelete(item.id)}
                    >
                      <FontAwesomeIcon
                        className="deleteicon"
                        icon={faTrashAlt}
                      />
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </CCard>
      );
    });

  return (
    <>
      <div style={{ marginTop: "15px" }}>
        <div className="mt-3">
          <div className="font-weight-bold ml-4">Create Task</div>
          <div className="m-2 pb-1 comment-input-div">
            <CRow className="border-0 questioncard">
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex d-column"
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <CCol sm={10} md={10} lg={10} xl={10}>
                  <TextField
                    style={{ zIndex: 0 }}
                    variant="outlined"
                    name="name"
                    label="Enter Task name"
                    placeholder="What needs to be done?"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </CCol>
                {checkAccessPermission("to_do_add") ? (
                  <CCol
                    sm={2}
                    md={2}
                    lg={2}
                    xl={2}
                    className="ml-3 d-flex align-items-center"
                  >
                    <CButton className="taskAddbutton" type="submit">
                      Add
                    </CButton>
                  </CCol>
                ) : null}
              </form>
            </CRow>
          </div>
        </div>
      </div>
      <div>
        {isLoading ? (
          <>{loader}</>
        ) : Todo.data.length !== 0 ? (
          <div className="p-3">
            <div className="font-weight-bold ml-2">My Task List</div>
            {todoDynamic}
            
            {todoDynamic.length !== 0 ? "" :
              setCurrentPage(0)
            }
            {/* pagination code start */}
            {Todo.data.length > 10 ? (
              todoDynamic.length > 10 || todoDynamic.length !== 10 ? (
                <div className="mt-4 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center text-center">
                  <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={1}
                    onPageChange={handlePageClick}
                    activeClassName={"active"}
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    nextClassName={"page-item next"}
                    previousClassName={"page-item prev"}
                    previousLinkClassName={"page-link"}
                    pageLinkClassName={"page-link"}
                    containerClassName={
                      "pagination react-paginate col-12 col-sm-12 col-lg-12 col-xl-12 d-flex justify-content-center text-center"
                    }
                  />
                </div>
              )
                : ""
            ) : (
              ""
            )}
            {/* pagination code end */}
          </div>
        ) : (
          <NoDataContainer module="Todo List" />
        )}
      </div>
    </>
  );
};
export default Todo;
