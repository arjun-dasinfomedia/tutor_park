import React, { useEffect, useState } from "react";
import {
	CRow,
	CCol,
	CButton,
	CModal,
	CModalBody,
	CModalHeader,
	CModalTitle,
	CBadge,
	CCardHeader,
} from "@coreui/react";
import { useForm, Form } from "src/components/formControls/useForm";
import MaterialTable from "material-table";
import Controls from "src/components/formControls/controls/Controls";
import Swal from "sweetalert2";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import { useDispatch, useSelector } from "react-redux";
import {
	getSyllabusList,
	deleteSyallbus,
	storeSyllabus,
} from "./SyllabusActions";
import EditSyllabus from "./EditSyllabus";

const active = [
	{ id: "yes", title: "Active" },
	{ id: "no", title: "Deactive" },
];

// main Syllabus class start
const Syllabus = () => {

	const dispatch = useDispatch();
	const syllabusState = useSelector((state) => state.syllabus);
	const [addSyllabusModal, setAddSyllabusModal] = useState(false);
	const [viewSyllabusModal, setViewSyllabusModal] = useState(false);
	const [editSyllabusModal, setEditSyllabusModal] = useState(false);
	const [viewSyllabusData, setViewSyllabusData] = useState(null);
	const [EditSyllabusData, setEditSyllabusData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [loader, showLoader, hideLoader] = useFullPageLoader()

	// Initial value For Syllabus
	const initialFValues = {
		description: '',
		active: "yes",
		name: '',
	};

	useEffect(async () => {
		showLoader();
		await dispatch(getSyllabusList());
		setLoading(false);
		hideLoader();
	}, []);

	// Column For Syllabus List
	const columns = [
		{
			title: "Syllabus",
			field: "name",
		},
		{
			title: "Created Date",
			field: "created_at",
		},
		{
			title: "Status",
			field: "active",
			render: rowData => rowData.active == "no" ? <CBadge color="danger">Deactive</CBadge> : <CBadge color="primary">Active</CBadge>,
			lookup: { yes: 'Active', no: 'Deactive' },
		},
	];

	// validation Code Start
	const validate = (fieldValues = values) => {
		let temp = { ...errors };

		if ("description" in fieldValues)
			temp.description = fieldValues.description
				? ""
				: "Please Enter Syllabus Description.";

		if ("name" in fieldValues)
			temp.name = fieldValues.name ? "" : "Please Enter Syllabus Name.";

		setErrors({
			...temp,
		});
		if (fieldValues == values) return Object.values(temp).every((x) => x == "");
	};

	const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
		useForm(initialFValues, true, validate);
	// Validation Code End

	// Handle Submit Form for add
	const handleSubmit = (e) => {

		e.preventDefault();
		if (validate()) {
			let formData = new FormData()
			formData.append('name', values.name)
			formData.append('description', values.description)
			formData.append('active', values.active)
			dispatch(storeSyllabus(formData));
			resetForm();
			setAddSyllabusModal(false);
		}
	}

	// Syllabus View Function
	const syllabusView = (data) => {
		setViewSyllabusData(data)
		setViewSyllabusModal(true);
	};

	// Syllabus Edit Function
	const syllabusEdit = (item) => {
		setEditSyllabusData(item)
		setEditSyllabusModal(true);
	};

	// Syllabus Delete Function
	const handleConfirmCancel = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You want to delete the syllabus!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Delete it",
		})
			.then((result) => {

				if (result.isConfirmed) {
					dispatch(deleteSyallbus({ id: id }))
				}
			});
	};

	return (
		<>
			{isLoading ? (
				<>{loader}</>
			) :
				<div>
					<CRow className="p-3">
						<CCol xl={12} sm={12} className="card-title font-weight-bold">
							Manage Syllabus
							<CButton
								className="d-inline textbook-add-button-css w-auto "
								onClick={() => setAddSyllabusModal(!addSyllabusModal)}
							>
								Add
							</CButton>
						</CCol>
					</CRow>
					<div className="p-3">
						
						<MaterialTable
							title=""
							data={syllabusState.syllabusList}
							columns={columns}
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
							actions={[
								{
									icon: "visibilityicon",
									tooltip: "View",
									onClick: (event, rowData) => syllabusView(rowData),
									position: "row",
									iconProps: { style: { color: "#321fdb" } },
								},
								{
									icon: "create",
									tooltip: "Edit",
									onClick: (event, rowData) => syllabusEdit(rowData),
									position: "row",
									iconProps: { style: { color: "#e49e07" } },
								},
								{
									icon: "delete",
									tooltip: "Delete",
									onClick: (event, rowData) => handleConfirmCancel(rowData.id),
									position: "row",
									iconProps: { style: { color: "#c92020" } },
								},
							]}
						/>
					</div>

					{/* Add Syllabus Modal*/}
					<CModal
						visible={addSyllabusModal}
						size="lg"
						onDismiss={() => setAddSyllabusModal(false)}
					>
						<CModalHeader
							onDismiss={() => setAddSyllabusModal(false)}
							className="tutorviewmodalheader"
						>
							<CModalTitle>Add Syllabus</CModalTitle>
						</CModalHeader>
						<CModalBody>
							<Form onSubmit={handleSubmit}>
								<CRow>
									<CCol xl={6} sm={6} className="">
										<Controls.Input
											name="name"
											label="Syllabus Name *"
											value={values.name}
											error={errors.name}
											onChange={handleInputChange}
										/>
									</CCol>

									<CCol xl={6} sm={6} className="">
										<Controls.RadioGroup
											name="active"
											label="Select Type *"
											value={values.active}
											onChange={handleInputChange}
											items={active}
										/>
									</CCol>
								</CRow>

								<CRow className="">
									<CCol xl={12} sm={12} className="">
										<Controls.CustomTextArea
											label="Description *"
											rows={2}
											value={values.description}
											name="description"
											error={errors.description}
											onChange={handleInputChange}
										/>
									</CCol>
								</CRow>

								<CRow>
									<CCol sm={12} md={12} lg={6} xl={6} className="m-2">
										<div className="d-inline">
											<Controls.Button type="submit" text="Add Syllabus" className="m-1" />
										</div>
										<div className="d-inline">
											<Controls.Button text="Reset" color="default" className="m-1" onClick={resetForm} />
										</div>
									</CCol>
								</CRow>

							</Form>
						</CModalBody>
					</CModal>

					{/* View Syllabus Modal */}
					<CModal visible={viewSyllabusModal} onDismiss={() => setViewSyllabusModal(false)}>
						<CModalHeader
							onDismiss={() => setViewSyllabusModal(false)}
							className="tutorviewmodalheader"
						>
							<CModalTitle className="">View Syllabus</CModalTitle>
						</CModalHeader>
						<CModalBody>
							<div className="row p-3 justify-content-around">
								<div className="border tuitionimage my-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
									<div className="row border viewmodalcolor font-weight-bold viewmodalcoursedaetail">
										<CCardHeader style={{ fontSize: 18 }} className="card-title text-dark">Syllabus Details</CCardHeader>
									</div>
									<div className="p-3">
										<div className="row">
											<div className="col-4 font-weight-bold">Syllabus </div>
											<div className="col-8">{viewSyllabusData && viewSyllabusData.name}</div>
										</div>
										<div className="row">
											<div className="col-4 font-weight-bold">Created </div>
											<div className="col-8">{viewSyllabusData && viewSyllabusData.created_at}</div>
										</div>
										<div className="row">
											<div className="col-4 font-weight-bold">Description</div>
											<div className="col-8">{viewSyllabusData && viewSyllabusData.description != null ? viewSyllabusData.description : "Not Added"}</div>
										</div>
										<div className="row">
											<div className="col-4 font-weight-bold">Status</div>
											<div className="col-8">{viewSyllabusData && viewSyllabusData.active != "yes" ?
												<CBadge color="danger">Deactive</CBadge>
												:
												<CBadge color="primary">Active</CBadge>
											}</div>
										</div>
									</div>
								</div>
							</div>
						</CModalBody>
					</CModal>

					{/* Edit Syllabus Modal */}
					{syllabusState.syllabusEditStatus !== false ? (
						<CModal
							visible={editSyllabusModal}
							size="lg"
							onDismiss={() => setEditSyllabusModal(false)}
						>
							<CModalHeader
								onDismiss={() => setEditSyllabusModal(false)}
								className="tutorviewmodalheader"
							>
								<CModalTitle>Edit Syllabus</CModalTitle>
							</CModalHeader>
							<CModalBody>
								<EditSyllabus data={EditSyllabusData} />
							</CModalBody>
						</CModal>
					) : (
						<CModal
							size="lg"
							onDismiss={() => setEditSyllabusModal(false)}
						>
							<CModalHeader
								onDismiss={() => setEditSyllabusModal(false)}
								className="tutorviewmodalheader"
							>
								<CModalTitle>Edit Syllabus</CModalTitle>
							</CModalHeader>
							<CModalBody>
								<EditSyllabus data={EditSyllabusData} />
							</CModalBody>
						</CModal>
					)}
				</div>
			}
		</>
	);
};

export default Syllabus;
