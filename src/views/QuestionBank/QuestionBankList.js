import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import EditQuestionBank from "./EditQuestionBank";
import TopFilterQuestionBank from "./TopFilterQuestionBank";
import { questionDelete, questionList } from "./QuestionBankAction";
import NoDataContainer from "../NoDataContainer/noDataContainer";
import { questionTypeData } from "../../redux/actions/dropdowns/index";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CCardHeader,
} from "@coreui/react";
import useFullPageLoader from "../../hooks/useFullPageLoader";

const QuestionBankList = () => {

  const dispatch = useDispatch();
  const questionBank = useSelector((state) => state.questionBank);
  const DropDown = useSelector((state) => state.dropdowns);

  const [viewClass, setViewClass] = useState(false);
  const [questiondata, setQuestionData] = useState("");
  const [editClass, setEditClass] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  var Data = DropDown.questionTypeList;

  var QuestionTypeList = Data.reduce(function (map, obj) {
    map[obj.id] = obj.title;
    return map;
  }, {});

  const columns = [
    {
      title: "Question",
      field: "question",
    },
    {
      title: "Standard",
      field: "class",
    },
    {
      title: "Subject",
      field: "subject",
    },
    {
      title: "Syllabus",
      field: "syllabus",
    },
    {
      title: "Type Of Question",
      field: "type.id",
      lookup: QuestionTypeList,
    },
  ];

  useEffect(async () => {
    showLoader();
    await dispatch(questionList());
    await dispatch(questionTypeData());
    setLoading(false);
    hideLoader();
  }, []);

  const handleView = (Data) => {
    setQuestionData(Data);
    setViewClass(true);
  };
  const handleEdit = () => {
    setEditClass(true);
  };

  /* Question Back Delete */
  const handleConfirmCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to delete this Question?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(questionDelete({ question_id: id }));
      }
    });
  };

  return (
    <>
      <div>
        <TopFilterQuestionBank />
        <div className="mt-3 p-2">
          <div className="mt-3 mb-3 fw-bold ml-3">QuestionBank</div>
          {isLoading ? (
            <>{loader}</>
          ) : questionBank.questionData.length !== 0 ? (
            <div className="p-3">
              <MaterialTable
                title=""
                columns={columns}
                data={questionBank.questionData}
                options={{
                  actionsColumnIndex: -1,
                  search: true,
                  // selection: true,
                  filtering: true,
                  searchFieldAlignment: "right",
                  pageSize: 5,
                  pageSizeOptions: [5, 10, 15],
                  headerStyle: {
                    backgroundColor: "#DEDDF4",
                    color: "#444346",
                    fontWeight: "600",
                    fontSize: "15px",
                  },
                  cellStyle: {
                    Width: "20px",
                    overflow: "Hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "50px",
                    whiteSpace: "nowrap",
                  },
                }}
                actions={[
                  {
                    icon: "visibilityicon",
                    tooltip: "View",
                    onClick: (event, rowData) => handleView(rowData),
                    position: "row",
                    iconProps: { style: { color: "#321fdb" } },
                  },
                  // {
                  //   icon: "create",
                  //   tooltip: "Edit",
                  //   onClick: () => handleEdit(editClass),
                  //   position: "row",
                  //   iconProps: { style: { color: "#e49e07" } },
                  // },
                  {
                    icon: "delete",
                    tooltip: "Delete",
                    onClick: (event, rowData) =>
                      handleConfirmCancel(rowData.id),
                    position: "row",
                    iconProps: { style: { color: "#c92020" } },
                  },
                ]}
              />
            </div>
          ) : (
            <NoDataContainer module="QuestionBank" />
          )}
        </div>
      </div>
      
      {/* View Module */}
      <CModal
        visible={viewClass}
        onDismiss={() => setViewClass(false)}
        size="lg"
      >
        <CModalHeader
          onDismiss={() => setViewClass(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle>View Question Bank</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="row p-3 justify-content-around">
            <div className="border tuitionimage my-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="row border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
                <CCardHeader
                  style={{ fontSize: 18 }}
                  className="card-title text-dark"
                >
                  Question Bank Details
                </CCardHeader>
              </div>
              <div className="p-3">
                <div className="row">
                  <div className="col-4 font-weight-bold">Standard </div>
                  <div className="col-8">
                    {questiondata && questiondata.class}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 font-weight-bold">Subject </div>
                  <div className="col-8">
                    {questiondata && questiondata.subject}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 font-weight-bold">Syllabus</div>
                  <div className="col-8">
                    {questiondata && questiondata.syllabus}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 font-weight-bold">Type Of Question</div>
                  <div className="col-8">
                    {questiondata && questiondata.type.title}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {questiondata &&
                questiondata.type.title === "Question & Answer" ? (
                <div className="mt-2">
                  <div className="friendcard p-3 assignment-card-accordion">
                    <div className="row">
                      <div className="col-12 assignment-link">
                        {" "}
                        {questiondata && questiondata.question}
                      </div>
                    </div>
                    <hr className="assignment-line-accordion"></hr>
                    <div className="row assignment-normal-font">
                      <div>
                        Ans: {questiondata && questiondata.answer.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {questiondata &&
                questiondata.type.title === "Fill in the Blanks" ? (
                <div className="mt-2">
                  <div className="friendcard p-3 assignment-card-accordion">
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 assignment-link">
                        {" "}
                        {questiondata && questiondata.question}
                      </div>
                    </div>
                    <hr className="assignment-line-accordion"></hr>
                    <div className="row assignment-normal-font">

                      <div>
                        Ans: {questiondata && questiondata.answer.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {questiondata && questiondata.type.title === "Comprehension" ? (
                <div className="mt-2">
                  <div className="friendcard p-3 assignment-card-accordion">
                    <div className="row">
                      <div className="col-12 assignment-link">
                        {" "}
                        {questiondata && questiondata.question}
                      </div>
                    </div>
                    <hr className="assignment-line-accordion"></hr>
                    {questiondata.comprehensiveQuestions.map((questionData) => (
                      <div className="friendcard p-3 mb-3 mt-3 assignment-card-accordion">
                        <div className="row">
                          <div className="col-10 assignment-link">Q) {questionData.question}</div>
                        </div>
                        <hr className="assignment-line-accordion "></hr>
                        <div className="row assignment-normal-font ">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            A) {questionData.answer.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
              {questiondata && questiondata.type.title === "Multi Choice" ? (
                <div className="mt-2">
                  <div className="friendcard p-3 assignment-card-accordion">
                    <div className="row">
                      <div className="col-10 assignment-link">
                        1) First question
                      </div>
                    </div>
                    <hr className="assignment-line-accordion "></hr>
                    <div className="row assignment-normal-font ">
                      <div className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        A)India
                      </div>
                      <div className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        B)Germany
                      </div>
                      <div className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        C)Russia
                      </div>
                      <div className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        D)Ohio
                      </div>
                      <div className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        E)Texas
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {questiondata &&
                questiondata.type.title === "Match the Following" ? (
                <div className="mt-2">
                  <div className="friendcard p-3 assignment-card-accordion">
                    <div className="row">
                      <div className="col-12 assignment-link">
                        {questiondata.question}
                      </div>
                    </div>
                    <hr className="assignment-line-accordion"></hr>
                    <div className="row m-1">
                      <div className="col-6">
                        {questiondata.options.left_option.map((left_match, key) => (
                          <div className="col-6 assignment-normal-font p-2">
                            {key + 1}.{left_match.name}
                          </div>
                        ))}
                      </div>
                      <div className="col-6">
                        {questiondata.options.right_option.map((right_match, key) => (
                          <div className="col-6 assignment-normal-font p-2">
                            {key + 1}.{right_match.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </CModalBody>
      </CModal>

      {/* Edit Module */}
      <CModal
        visible={editClass}
        size="lg"
        onDismiss={() => setEditClass(false)}
      >
        <CModalHeader
          onDismiss={() => setEditClass(false)}
          className="tutorviewmodalheader"
        >
          <CModalTitle>Edit Question Bank</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <EditQuestionBank />
        </CModalBody>
      </CModal>
    </>
  );
};
export default QuestionBankList;
