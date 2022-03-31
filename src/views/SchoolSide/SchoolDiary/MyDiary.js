import React, { useEffect, useState } from 'react'
import {
	CCard,
	CCol,
	CButton,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CRow,
	CDropdown,
	CDropdownToggle,
	CDropdownMenu,
	CDropdownItem,
	CLink,
	CBadge,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import Controls from "src/components/formControls/controls/Controls";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import { useDispatch, useSelector } from 'react-redux';
import "../../../assets/css/pagination/paginationStyle.css";
import useFullPageLoader from 'src/hooks/useFullPageLoader';
import ReactPaginate from "react-paginate";
import EditSchoolDiary from "./EditSchoolDiary"
import {
	getSchoolDiryList,
	divisionSubjectList,
	addSchoolDiary,
	viewSchoolDiaryByDate,
	diaryPostToTimeline,
	shareDiaryWithFriendList,
	shareWithFriendDiary,
} from "./SchoolDiayAction"
import moment from "moment";
import { Form, useForm } from 'src/components/formControls/useForm';
import { checkAccessPermission } from 'src/utility/utils';
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import NoDataContainer from "../../NoDataContainer/noDataContainer";
import MaterialTable from 'material-table';
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
// import CustomAlertControl from "../../AlertMessage";

let PER_PAGE = 10

// main My Diary Const
const MyDiary = () => {

	const [subjectDiary, setSubjectDiary] = useState(false);
	const [diaryDate, setDiaryDate] = useState(new Date());
	const [enterDiary, setEnterDiary] = useState(false);
	const [editDiaryvisible, setEditDiaryVisible] = useState(false);
	const [viewDiary, setViewDiary] = useState(false);
	const dispatch = new useDispatch()
	const SchoolDiary = useSelector((state) => state.SchoolDiary);
	const [loader, showLoader, hideLoader] = useFullPageLoader();
	const [isLoading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);
	const pageCount = Math.ceil(SchoolDiary.schoolDiaryList.length / PER_PAGE);
	const [enterDiaryData, setEnterDiaryData] = useState("");
	const [viewDiaryData, setViewDiaryData] = useState("");
	const [editData, setEditData] = useState("");
	const [studentViewData, setStudentViewData] = useState("")
	const [shareMessageId, setShareMessageId] = useState("")
	const [shareMessage, setShareMessage] = useState(false)
	const [StudentViewId, setStudentViewModalID] = useState("")

	let user_ids = []
	const offset = currentPage * PER_PAGE;

	// Add Diary Modal Function
	const enterDiaryModal = (data) => {
		setEnterDiaryData(data);
		dispatch(divisionSubjectList({ division_id: data.id }))
		setEnterDiary(true)
	}

	useEffect(async () => {
		showLoader();
		await dispatch(getSchoolDiryList());
		await dispatch(shareDiaryWithFriendList());
		setLoading(false);
		hideLoader();
	}, []);

	// handle PageClick for datatable
	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
		window.scrollTo(0, 0)
	}

	// invitial value for add new Diary
	const initialFValues = {
		division_subject_id: "",
		class_work: "",
		school_class_work: "",
		class_work_image: "",
		school_home_work: "",
		home_work_image: "",
		home_work: "",
		tomorrow_topic: "",
	};

	// validation fpr add new Diary
	const validate = (fieldValues = values) => {
		let temp = { ...errors };

		if ("school_class_work" in fieldValues) {
			var imagePath = fieldValues.school_class_work;
			var logo = ['jpeg', 'png', 'jpg', 'svg', 'pdf', 'bmp', 'doc', 'csv', 'xlsx', 'xls', 'docx', 'ppt', 'odt', 'ods', 'odp']
			var extension = imagePath.substring(
				imagePath.lastIndexOf(".") + 1,
				imagePath.length
			);
			if (fieldValues.school_class_work) {
				if (logo.includes(extension)) {
					temp.school_class_work = "";
				} else {
					temp.school_class_work = "Only Jpg, png, jpg, svg, pdf, bmp, doc, csv, xlsx, xls, docx, ppt, odt, ods and odp  file is allowed.";
				}
			} else {
				temp.school_class_work = "";
			}
		}

		if ("school_home_work" in fieldValues) {
			var imagePath = fieldValues.school_home_work;
			var logo = ['jpeg', 'png', 'jpg', 'svg', 'pdf', ' bmp', 'doc', 'csv', 'xlsx', 'xls', 'docx', 'ppt', 'odt', 'ods', 'odp']
			var extension = imagePath.substring(
				imagePath.lastIndexOf(".") + 1,
				imagePath.length
			);
			if (fieldValues.school_home_work) {
				if (logo.includes(extension)) {
					temp.school_home_work = "";
				} else {
					temp.school_home_work = "Only Jpg, png, jpg, svg, pdf, bmp, doc, csv, xlsx, xls, docx, ppt, odt, ods and odp  file is allowed.";
				}
			} else {
				temp.school_home_work = "";
			}
		}

		if ("division_subject_id" in fieldValues)
			temp.division_subject_id = fieldValues.division_subject_id
				? ""
				: "Please select Subject.";

		if ("tomorrow_topic" in fieldValues)
			temp.tomorrow_topic = fieldValues.tomorrow_topic ? "" : "Enter Tomorrow Topics.";

		if ("home_work" in fieldValues)
			temp.home_work = fieldValues.home_work ? "" : "Enter Home Work.";

		if ("class_work" in fieldValues)
			temp.class_work = fieldValues.class_work ? "" : "Enter Class Work.";

		setErrors({
			...temp,
		});

		if (fieldValues == values) return Object.values(temp).every((x) => x == "");

	};

	const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
		useForm(initialFValues, true, validate);
	// End Validation for add new Diary


	// submit form
	const handleSubmit = (e) => {

		e.preventDefault();

		if (validate()) {
			setLoading(true);
			let data = new FormData();
			data.append("division_id", enterDiaryData.id)
			data.append("subject_id", values.division_subject_id)
			data.append("class_work", values.class_work)
			if (values.class_work_image !== "") {
				data.append("class_work_attachment", values.class_work_image)
			}
			if (values.home_work_image !== "") {
				data.append("home_work_attachment", values.home_work_image)
			}
			data.append("home_work", values.home_work);
			data.append("tomorrow_topics", values.tomorrow_topic)
			setLoading(true);
			showLoader();
			dispatch(addSchoolDiary(data))
			resetForm()
			setEnterDiary(false);
			setLoading(false);
			hideLoader();
		}
	};

	// Change Attendance Function
	const ChangeAttendDate = (value) => {
		setDiaryDate(value)
		let formdata = new FormData();
		formdata.append("date", moment(value).format("YYYY-MM-DD"));
		formdata.append("division_id", viewDiaryData.id);
		dispatch(viewSchoolDiaryByDate(formdata));
	}

	// Edit A school Diary Function
	const editSchoolDiary = (data) => {

		setEditData(data);
		dispatch(divisionSubjectList({ division_id: data.division_id }))
		setEditDiaryVisible(true)
	}

	// Column For view The Students
	const StudentViewcolumns = [
		{
			title: "",
			field: "is_leader",
			render: (rowData) => (
				<Checkbox
					disabled="disabled"
					name="user_ids[]"
					value={rowData.id}
					defaultChecked={
						rowData.is_subject_leader == false ? false : true}
				/>
			),
		},
		{
			title: "Tp Id",
			field: "tp_id",
		},
		{
			title: "Student Name",
			field: "name",
		},
		{
			title: "Class Leader Status",
			render: data => data.is_subject_leader === true ? <CBadge color="primary">Class Leader </CBadge> : "N/A",
		},
		{
			title: "Subject",
			render: data => data.is_subject_leader == false ?
				"N/A" :
				data.subjectLeadership.map((item) => {
					return (
						item.name + ", "
					)
				})
		},
	];

	// Column for direct Share Diary via message
	const directShareDiarycolumns = [
		{
			title: "Name",
			field: "name",
		},
		{
			title: "Email",
			field: "email",
		},
	]

	// student View Modal
	const studentView = (data) => {
		setStudentViewData(data.students)
		setSubjectDiary(true)
		setStudentViewModalID(data)
	}

	// Handle Share Diary To Timeline
	const handleShareToTimeline = (data) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You want to Share in Timeline!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
			cancelButtonText: "No",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(diaryPostToTimeline({
					type: "schoolDiary",
					type_id: data.id,
				}));
				setViewDiary(false)
			}
		})
	}

	const ViewDiaryModal = (data) => {
		setViewDiary(true)
		setViewDiaryData(data)
		dispatch(viewSchoolDiaryByDate({
			date: moment(new Date()).format("YYYY-MM-DD"),
			division_id: data.id,
		}))
		setDiaryDate(new Date())
	}

	// open Modal For Student list to share Diary
	const handleShareToMessage = (data) => {
		setShareMessageId(data.id)
		setShareMessage(true)
	}

	// Create Array to Share Diary
	const handleSharedDiary = (item) => {
		for (let SharedLibraryAll of Object.values(item)) {
			user_ids.push(SharedLibraryAll.email);
		}
	};

	// User id for Unique value Function
	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	// Diary Share To Friend via message
	const ShareDiaryToFriends = () => {

		if (user_ids.length !== 0) {
			var user_id = user_ids.filter(onlyUnique);
			dispatch(shareWithFriendDiary({ diary_id: shareMessageId, to: user_id }));
			user_ids = [];
			setShareMessage(false);
			setViewDiary(false)
		}
		else {
			Swal.fire("Error", "Please Select Atleast One Friend from List", "Error");
		}
	}
	if (SchoolDiary.diaryEditStatus == "sucess") {
		setEditDiaryVisible(false)
		setViewDiary(false)
		SchoolDiary.diaryEditStatus = ""
	}

	//  all division division list
	const MyDiaryList = SchoolDiary.schoolDiaryList.slice(offset, offset + PER_PAGE)
		.map(function (item, key) {
			return (
				<div key={key}>
					<CRow>
						<CCol>
							<CCard className="card p-3 assigncard mb-3">
								<div className="row text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
									<div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-2">
										<CButton
											className="diary-add-button-css">{item.standard + " " + item.name}
										</CButton>
									</div>
									<div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-10">
										<div className="col-12">
											<div className="row">
												{
													checkAccessPermission("school_diary_add") ? (<>
														<div className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 normal-font">
															<CButton
																className={enterDiaryData.id == item.id && enterDiary == true ? "mydiarycardbutton bg-sucess" : "mydiarycardbutton  bg-warning"}
																onClick={() => enterDiaryModal(item)}
															>Enter
															</CButton></div></>) : null

												}
												{
													checkAccessPermission("school_diary_add") ? (<>
														<div className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
															<CButton
																className={viewDiaryData.id == item.id && viewDiary == true ? "mydiarycardbutton bg-sucess" : "mydiarycardbutton bg-warning"}
																onClick={() => ViewDiaryModal(item)}

															>View
															</CButton>
														</div></>) : null
												}

												<div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8">
													<CButton
														className={StudentViewId.id == item.id && subjectDiary == true ? "mydiarycardbutton bg-sucess" : "mydiarycardbutton bg-warning"}
														onClick={() => studentView(item)}
													>Subject Lead
													</CButton>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CCard>
						</CCol>
					</CRow>
				</div>
			)
		})

	// Diary List for Partocular Division
	const ViewDiaryList = SchoolDiary.viewSchoolDiary.slice(offset, offset + PER_PAGE)
		.map(function (item, key) {
			return (
				<>
					<div className="border tuitionimage my-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
						<div className="row border viewmodalcolor font-weight-bold diaryviewmodal">
							<div className="card-title pl-3 py-2">
								{item.date} Diary Details
							</div>
						</div>
						<div className="p-3">
							<div className="row">
								<div className="col-4 font-weight-bold ">
									{item.details.subject_name}:-
								</div>
								<div className="col-8 text-end">
									{/* 3 Dotted Dropdown button */}
									<div className="d-inline r-dot-menu position-absolute ">
										<CDropdown
											variant="nav-item"
											className="d-md-inline marker-remove-textbook-css"
										>
											<CDropdownToggle
												placement="bottom-end"
												className="py-0 menu-css d-inline"
												caret={false}
											>
												<FontAwesomeIcon
													className="svg-inline--fa fa-ellipsis-v fa-w-6 d-inline tutortoggle"
													icon={faEllipsisV}
												/>
											</CDropdownToggle>
											<CDropdownMenu
												className="pt-0 assignment-dropdown-menu course-action-dropdown-menu-css m-2"
												placement="bottom-end"
											>
												<CDropdownItem
													onClick={() => editSchoolDiary(item)}
												// onClick={ <EditSchoolDiary />}
												>
													Edit
												</CDropdownItem>
												<CDropdownItem
													onClick={() => handleShareToMessage(item)}
												>
													Share To Message
												</CDropdownItem>
												<CDropdownItem
													onClick={() => handleShareToTimeline(item)}
												>
													Share To Timeline
												</CDropdownItem>
											</CDropdownMenu>
										</CDropdown>
									</div>
								</div>
							</div>
							<div className="row mt-2">
								<div className="col-12">
									<p className="d-inline font-weight-bold">A) Classwork:-</p>
									<p className="d-inline normal-font">{item.details.class_work}</p>
									<div>
										<CLink
											className="text-decoration-none diary-attachment-css"
											href={item.details.class_work_attachment}
											target="_blank"
											rel="noopener noreferrer"
										>
											View Class Work Attachment
										</CLink>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<p className="d-inline font-weight-bold">B) Homework:-</p>
									<p className="d-inline normal-font">{item.details.home_work}</p>
									<div>
										<CLink
											href={item.details.home_work_attachment}
											target="_blank"
											className="text-decoration-none diary-attachment-css"
											rel="noopener noreferrer"
										>
											View Home Work Attachment
										</CLink>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-12 ">
									<p className="d-inline font-weight-bold">C) Tomorrow's Topic:- </p>
									<p className="d-inline normal-font">{item.details.tomorrow_topics}</p>
								</div>
							</div>
						</div>
					</div>
				</>
			)
		})

	// main return statement
	return (
		<>
			<div>
				{isLoading ? (
					<>{loader}</>
				) :
					MyDiaryList.length !== 0 ? (
						<div>
							{/* <CustomAlertControl /> */}
							{MyDiaryList}

							{/* pagination code start */}
							{SchoolDiary.schoolDiaryList.length > 10 ? (
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
							) : (
								""
							)}
							{/* pagination code end */}
						</div>
					) : (
						<NoDataContainer module="School diary" />
					)}
			</div>

			{/* View Diary Modal */}
			<CModal visible={viewDiary} size="lg" onDismiss={() => setViewDiary(false)}>
				<CModalHeader onDismiss={() => setViewDiary(false)} className="tutorviewmodalheader">
					<CModalTitle>{viewDiaryData && viewDiaryData.standard + " " + viewDiaryData.name}</CModalTitle>
				</CModalHeader>
				<CModalBody className="text-center text-col-center text-sm-center text-md-start text-lg-start text-xl-start">
					<CRow>
						<CCol xl={6} sm={6} className="mb-3">
							<MuiPickersUtilsProvider utils={DateFnsUtils} libInstance={moment}>
								<KeyboardDatePicker
									disableFuture={true}
									maxDate={new Date()}
									id="date-picker-dialog"
									label="Diary Date *"
									inputVariant="outlined"
									format="dd/MM/yyyy"
									value={diaryDate}
									onChange={(value) => ChangeAttendDate(value)}
									KeyboardButtonProps={{
										"aria-label": "change date",
									}}
								/>
							</MuiPickersUtilsProvider>
						</CCol>
					</CRow>
					{ViewDiaryList.length !== 0 ?
						ViewDiaryList
						:
						(
							<>
								<NoDataContainer module="Diary" />
							</>
						)
					}
				</CModalBody>
			</CModal>

			{/* View Student Modal for in division */}
			<CModal visible={subjectDiary} size="lg" onDismiss={() => setSubjectDiary(false)} >
				<CModalHeader onDismiss={() => setSubjectDiary(false)} className="tutorviewmodalheader">
					<CModalTitle>{StudentViewId.standard + " " + StudentViewId.name}</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<MaterialTable
						title=""
						columns={StudentViewcolumns}
						data={studentViewData}
						options={{
							actionsColumnIndex: -1,
							search: true,
							selection: false,
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
					/>
				</CModalBody>
			</CModal>

			{/* add new Diary Modal */}
			<CModal visible={enterDiary} size="lg" onDismiss={() => setEnterDiary(false)}>
				<CModalHeader onDismiss={() => setEnterDiary(false)} className="tutorviewmodalheader">
					<CModalTitle>{moment(new Date()).format("DD-MM-YYYY")}</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<Form onSubmit={handleSubmit}>
						<CRow>
							<CCol xl={6} sm={6} className="">

								<Controls.Select
									name="division_subject_id"
									label="Select Subject *"
									value={values.division_subject_id}
									options={SchoolDiary.subjectDivisionList}
									onChange={handleInputChange}
									error={errors.division_subject_id}
									dropDownType="schoolDiary"
								/>
							</CCol>

						</CRow>
						<CRow>
							<CCol xl={6} sm={6} className="">
								<Controls.CustomTextArea
									label="Class Work *"
									rows={2}
									name="class_work"
									value={values.class_work}
									// options={SchoolDiary.subjectList}
									onChange={handleInputChange}
									error={errors.class_work}
								/>
							</CCol>
							<CCol xl={6} sm={6}>
								<Controls.InputLabelShown
									label="Class Work Attachment"
									name="school_class_work"
									type="file"
									value={values.school_class_work}
									onChange={handleInputChange}
									error={errors.school_class_work}
								/>
							</CCol>
						</CRow>

						<CRow>
							<CCol xl={6} sm={6} className="">
								<Controls.CustomTextArea
									label="Home Work *"
									rows={2}
									name="home_work"
									value={values.home_work}
									onChange={handleInputChange}
									error={errors.home_work}
								/>
							</CCol>

							<CCol xl={6} sm={6}>
								<Controls.InputLabelShown
									label="Home Work Attachment"
									type="file"
									name="school_home_work"
									value={values.school_home_work}
									onChange={handleInputChange}
									error={errors.school_home_work}
								/>
							</CCol>
						</CRow>

						<CRow>
							<CCol xl={12} sm={12} className="">
								<Controls.CustomTextArea
									label="Tomorrow's Topic *"
									rows={2}
									name="tomorrow_topic"
									value={values.tomorrow_topic}
									onChange={handleInputChange}
									error={errors.tomorrow_topic}
								/>
							</CCol>
						</CRow>

						<CRow>
							<CCol sm={6} md={6} lg={6} xl={6} className="m-2">
								<div className="d-inline">
									<Controls.Button type="submit" text="Add Diary" />
								</div>
								<div className="p-2 d-inline">
									<Controls.Button
										text="reset"
										color="default"
										onClick={resetForm}
									/>
								</div>
							</CCol>
						</CRow>
					</Form>
				</CModalBody>
			</CModal>

			{/* Share Message Modal */}
			<CModal visible={shareMessage} size="lg" onDismiss={() => setShareMessage(false)} >
				<CModalHeader onDismiss={() => setShareMessage(false)} className="tutorviewmodalheader">
					<CModalTitle>{StudentViewId.standard + " " + StudentViewId.name}</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<MaterialTable
						title=""
						columns={directShareDiarycolumns}
						data={SchoolDiary.sharedWithFriend}
						options={{
							actionsColumnIndex: -1,
							search: true,
							selection: true,
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
						onSelectionChange={handleSharedDiary}

					/>
					<div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-Start">
						<div className="p-2 d-inline">
							<Controls.Button
								onClick={() => ShareDiaryToFriends()}
								text="Share To Message"
								className="rounded-pill button-color-rounded-pill"

							/>
						</div>
					</div>

				</CModalBody>
			</CModal>

			{/* Edit Diary Modal */}
			<CModal visible={editDiaryvisible} size="lg" onDismiss={() => setEditDiaryVisible(false)}>
				<CModalHeader onDismiss={() => setEditDiaryVisible(false)} className="tutorviewmodalheader">
					<CModalTitle>{moment(new Date()).format("DD-MM-YYYY")} - Update Diary</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<EditSchoolDiary data={editData} />
				</CModalBody>
			</CModal>


		</>
	)
}


export default MyDiary
