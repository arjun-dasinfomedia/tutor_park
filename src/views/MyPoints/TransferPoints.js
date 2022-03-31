import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import useFullPageLoader from "src/hooks/useFullPageLoader";
import {
	pointTransfer,
	userDropdown
} from "./MyPointsAction";

// main Transfer Point class
const TransferPoints = () => {

	const dispatch = useDispatch();

	const pointsReducerState = useSelector((state) => state.MyPoints);
	const [loader, showLoader, hideLoader] = useFullPageLoader();
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		showLoader();
		dispatch(userDropdown())
		setLoading(false);
		hideLoader();
	}, []);

	// validation Code Start
	const initialFValues = {
		transferpoint_id: "",
		NumberofPoints: "",
		comment: "",
	};

	// validation code Start
	const validate = (fieldValues = values) => {

		let temp = { ...errors };
		if ("transferpoint_id" in fieldValues)
			if (fieldValues.transferpoint_id == "")
				temp.transferpoint_id = "Please Select transfer point id.";

		if ("NumberofPoints" in fieldValues)

			if (fieldValues.NumberofPoints == "")
				temp.NumberofPoints = "Number of Points is required.";

			else if (!/^[0-9\b]+$/.test(fieldValues.NumberofPoints))
				temp.NumberofPoints = "Please enter only numbers";

			else if (fieldValues.NumberofPoints > pointsReducerState.pointsList.balance)
				temp.NumberofPoints = "You have only " + pointsReducerState.pointsList.balance + " points to transfer";

			else temp.NumberofPoints = "";

		setErrors({
			...temp,
		});
		if (fieldValues == values) return Object.values(temp).every((x) => x == "");
	};

	const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
		useForm(initialFValues, true, validate);
	// validation Code End

	// Transfer Point Submit Form Handle
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			// return false
			let formData = new FormData()
			formData.append('receiver_email', values.transferpoint_id)
			formData.append('points', values.NumberofPoints)
			formData.append('comment', values.comment)
			dispatch(pointTransfer(formData));
			resetForm();
		}
	}

	// main return Tag
	return (
		<div className="mt-3 p-2">
			{
				isLoading ? (
					<>{loader}</>
				) : <div>
					<div className="mt-2 mb-3 fw-bold ml-3">Transfer Points</div>
					<div className="row">
						<Form onSubmit={handleSubmit}>
							<div className="row mb-2">
								<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
									<Controls.Select
										name="transferpoint_id"
										label="Transfer Points To"
										value={values.transferpoint_id}
										onChange={handleInputChange}
										options={pointsReducerState.userDropdownlist}
										error={errors.transferpoint_id}
										dropDownType="user"
									/>
								</div>
								<div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
									<Controls.Input
										name="NumberofPoints"
										label="Enter Number of Points *"
										value={values.NumberofPoints}
										onChange={handleInputChange}
										error={errors.NumberofPoints}
									/>
								</div>
							</div>
							<div className="mb-2 col">
								<Controls.CustomTextArea
									name="Comments"
									rows={3}
									label="Enter Comments"
								/>
							</div>
							<div className="p-2 d-inline">
								<Controls.Button type="submit" text="Send Points" />
							</div>
						</Form>
					</div>
				</div>
			}
		</div>
	);
};
export default TransferPoints;
