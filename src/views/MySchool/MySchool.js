import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CustomAlertControl from "../AlertMessage";
import { userImpersonateSchoolSide } from "./MySchoolAction";
import {
	getUserData,
} from "src/utility/utils";


const MySchool = () => {

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(async () => {
		if (getUserData().linked_email !== null) {
			if (localStorage.getItem('impersonateStatusSchool') === "false") {
				await dispatch(userImpersonateSchoolSide('impersonate'));
			}
			history.push("/home")
			window.location.reload()
		}
	}, []);

	return (
		<>
			<CustomAlertControl />
			{getUserData().linked_email == null ?
				<div className="myschoolData">
					<h4>Please Join a School To View...</h4>
				</div>
				:
				""
			}
		</>
	)
}

export default MySchool
