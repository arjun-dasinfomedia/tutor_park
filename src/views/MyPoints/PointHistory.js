import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import { useDispatch, useSelector } from "react-redux";
import {
	getPointList,
	getBuyPoints
} from "./MyPointsAction";
import {
	CButton,
	CRow,
	CModal,
	CModalBody,
	CModalHeader,
	CModalTitle,
	CCol
} from "@coreui/react";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import { getRazorPaySettings } from "../Tutions/TuitionActions";
import { createRazorpayOrderID } from "../searchcourse/SearchCourseActions";
import Logo from "../../assets/images/logo/Logo_Option-1.png";
import { getUserData } from "src/utility/utils";

// main Point History class start
const PointHistory = () => {

	// loader Variable
	const [isLoading, setLoading] = useState(true);
	const [loader, showLoader, hideLoader] = useFullPageLoader();
	const pointState = useSelector((state) => state.MyPoints);
	const [buyPoints, setBuyPoints] = useState(false);
	const dispatch = useDispatch();
	const tuitionStore = useSelector((state) => state.TuitionReducer);

	// initial value for Buy a Point
	const initialvalues = {
		points: "",
		type: "razorpay",
	}

	// validation code start
	const validate = (fieldValues = values) => {

		let temp = { ...errors };

		if ("points" in fieldValues)
			if (fieldValues.points === "")
				temp.points = "Buy a Points  is required.";
			else if (fieldValues.points.length > 8)
				temp.points = "Buy Points should not be more than 8 digits";
			else if (!/^[0-9\b]+$/.test(fieldValues.points))
				temp.points = "Please enter only numbers";
			else temp.points = "";


		setErrors({
			...temp,
		});

		if (fieldValues == values) return Object.values(temp).every((x) => x === "");
	};

	const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
		useForm(initialvalues, true, validate);


	useEffect(async () => {
		showLoader();
		await dispatch(getPointList());
		await dispatch(getRazorPaySettings());
		setLoading(false);
		hideLoader();
	}, []);

	// column for matrial Table
	const columns = [
		{
			title: "Date",
			field: "date",
		},
		{
			title: "Email",
			field: "transfer_to.email",
			render: rowData => rowData.transfer_to === null ? "N/A" : rowData.transfer_to.email
		},
		{
			title: "Source of Points",
			field: "source_of_point",
		},
		{
			title: "Number of Points",
			field: "points",
		},
		{
			title: "Amount (Rs.)",
			field: "amount",
		},
	];
	const calc = Math.floor(values.points / 10);

	// Buy a Points
	const handleSubmit = async (e) => {
		
		e.preventDefault();
		if (validate()) {
			const orderData = await dispatch(createRazorpayOrderID({ amount: calc }));
			await createRazorPayPaymentUsingCheckout(orderData, values.points, values.type)
	
		}
	}

	// razorpay payment process code
	const createRazorPayPaymentUsingCheckout = async (orderData, points, paymentMode) => {
		
		console.log(orderData)
		// console.log(process.env.RAZORPAY_KEY_ID)
		const options = {
		  key: tuitionStore.razorpaySettings.mode === "test" ? tuitionStore.razorpaySettings.test_key_id : tuitionStore.razorpaySettings.live_key_id,
		//   key: 'rzp_test_jBlFauAaq9RkSM',
		  // key: process.env.RAZORPAY_KEY_ID,
		  amount: orderData.amount, //  = INR 1
		  name: 'Tutor Park',
		  description: 'Online Learning Portal',
		  image: Logo,
		  order_id:orderData.order_id,
		  handler: function(response) {
			if(response.razorpay_payment_id !== null) {

			dispatch(getBuyPoints({points:points, payment_type:paymentMode, razorpay_order_id:response.razorpay_order_id, razorpay_payment_id:response.razorpay_payment_id, razorpay_signature:response.razorpay_signature}));
			resetForm();
			setBuyPoints(false);
			} else {
			  dispatch(alertActions.error(response.message.toString()));
			  toast.error(response.message.toString());
			  return false
			  alert("There is an error in payment process");
			}
		  },
		  prefill: {
			  name: getUserData().first_name+" "+getUserData().first_name,
			  contact: getUserData().user_details.phone,
			  email: getUserData().email
		  },
		  notes: {
			  address: 'Tutor Park - take payment from customers online'
		  },
		  theme: {
			  color: '#5a55cb',
			  // hide_topbar: false
		  }
		};
	
		// open checkout modal
		var rzp1 = new window.Razorpay(options);
		rzp1.on("payment.failed", function (response) {
		  dispatch(alertActions.error(response.error.description.toString()));
		  toast.error(response.error.description.toString());
		  return false
		});
		rzp1.open();
	  }
	
	  useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://checkout.razorpay.com/v1/checkout.js';
		script.async = true;
		document.body.appendChild(script);
	}, []);

	// main return Tag
	return (
		<div className="mt-3 p-2">

			{
				isLoading ? (
					<>{loader}</>
				) : <div>
					<CModal
						size="lg"
						visible={buyPoints}
						onDismiss={() => setBuyPoints(false)}
					>
						<CModalHeader className="tutorviewmodalheader" onDismiss={() => setBuyPoints(false)}>
							<CModalTitle>Buy Points</CModalTitle>
						</CModalHeader>
						<CModalBody>
							<Form onSubmit={handleSubmit}>
								<CRow>
									<CCol sm={6} md={6} lg={6} xl={6}>
										<Controls.Input
											name="points"
											label="Buy Points *"
											value={values.points}
											onChange={handleInputChange}
											error={errors.points}
										/>
									</CCol>
								</CRow>
								<CRow>
									<CCol sm={12} md={12} lg={12} xl={12} className="p-3">
										<h6 className="font-weight-bold d-inline">Total Amounts:-</h6>
										<h6 className="d-inline">
											{calc}
										</h6>

									</CCol>

								</CRow>
								<CRow>
									<CCol sm={1} md={1} lg={1} xl={1} className="p-3">
										<h6 className="font-weight-bold text-danger">Note:-</h6>

									</CCol>
									<CCol sm={11} md={11} lg={11} xl={11} className="p-3">
										<h6 className="text-danger"> 1 RS = 10 Points</h6>
									</CCol>
								</CRow>

								<CRow>
									<CCol sm={12} md={12} lg={6} xl={6} className="m-2">
										<div className="d-inline">
											<Controls.Button type="submit" text="Buy Points" className="m-1" />
										</div>
										<div className="d-inline">
											<Controls.Button
												className="m-1"
												text="Reset"
												color="default"
												onClick={resetForm}
											/>
										</div>
									</CCol>
								</CRow>
							</Form>
						</CModalBody>
					</CModal>
					<div className="row mb-2">
						<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 h4 fw-bold">
							Point Balance:- {pointState.pointsList.balance && pointState.pointsList.balance}
						</div>
						<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-end pr-2">
							<CButton
								className="d-inline textbook-add-button-css w-auto rounded-0 h-100"
								onClick={() => setBuyPoints(!buyPoints)}
							>
								Buy Points
							</CButton>
						</div>
					</div>
					<div className="p-3">

						<MaterialTable
							title=""
							data={pointState.pointsList.history}
							columns={columns}
							options={{
								search: true,
								filtering: true,
								searchFieldAlignment: "right",
								pageSize: 5,
								pageSizeOptions: [5, 10, 15],
								headerStyle: {
									backgroundColor: "#DEDDF4",
									color: "#444346",
									fontWeight: "600",
									fontSize: "15px"
								},
							}}
						/>
					</div>
				</div>
			}
		</div>

	);
};

export default PointHistory;

