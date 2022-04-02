import React, { useEffect, useState } from 'react'
import {
	CCard,
	CCardHeader,
	CCardBody,
	CDropdownDivider,
	CCol,
	CButton,
	CBadge,
	CLink
} from "@coreui/react";
import { viewSchoolDiary } from "./SchoolDiayAction"
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import NoDataContainer from "../../NoDataContainer/noDataContainer";

// main School Diary List Const
const SchoolDiaryList = () => {

	const dispatch = useDispatch();
	const SchoolDiary = useSelector((state) => state.SchoolDiary);
	const [diaryDate, setDiaryDate] = useState(new Date());
	const [isLoading, setLoading] = useState(true);
	const [diaryId, setDiaryId] = useState("")
	const [divisionID, setDivisionId] = useState("")


	// view School Diary by Date
	const viewSchoolDiaryBy = (data) => {
		setDiaryId(data.id)
		if (diaryId !== data.id) {
			setDiaryDate(new Date())
		}
		setDivisionId(data.id)
		dispatch(viewSchoolDiary({
			date: moment(new Date()).format("YYYY-MM-DD"),
			division_id: data.id
		}))
		SchoolDiary.viewDiary == [];
	}

	// Change Attendance Function
	const ChangeAttendDate = (value) => {
		setDiaryDate(value)

		let formdata = new FormData();

		formdata.append("date", moment(value).format("YYYY-MM-DD"));
		formdata.append("division_id", divisionID);

		dispatch(viewSchoolDiary(formdata));
		SchoolDiary.viewDiary == []
	}

	return (
		<>
			{SchoolDiary.schoolDiaryList.length === 0 ? <NoDataContainer module="Schoo Diary " /> :
				SchoolDiary.schoolDiaryList
					.map(function (item, key) {
						return (

							<div className="d-inline" key={key}>
								<CButton
									onClick={() => viewSchoolDiaryBy(item)}
									className={(diaryId === item.id ? "diary-add-button-css " : "diary-add-button-css bg-warning")}
								>{item.standard + " " + item.name}
								</CButton>
							</div>
						)
					})
			}

			{divisionID === "" ? "" :
				<>
					<CCol className='mt-3 ' sm={6} xl={6}>
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

					{SchoolDiary.viewDiary.length === 0 ?
						<>
							<NoDataContainer module="Diary" />
						</>
						:
						SchoolDiary.viewDiary.map((item, key) => {

							return (
								item.details.length === 0 ?
									<div key={key}>
										<NoDataContainer module="Diary" />
									</div>
									:
									Object.entries(item.details).map((detaillsItem, detailsKey) => {
										return (
											<div key={detailsKey}>
												<CCard className="mt-3 mb-3">
													<CCardHeader className="cardtitle fw-bold">
														{moment(diaryDate).format("DD-MM-YYYY")} Diary Details
													</CCardHeader>
													{detaillsItem[1].map((innerDetailsItem, innerDetailsKey) => {
														return (
															<div key={innerDetailsKey}>
																<CCardBody>
																	<div className="row p-1">
																		<div className="font-weight-bold diaryhederfont">{innerDetailsKey + 1 + ") " + innerDetailsItem.subject_name + " :- "}
																			<CBadge color="primary">{innerDetailsItem.added_by}</CBadge>{" "}
																			{innerDetailsItem.user_type == "teacher" ?
																				<CBadge color="success">{innerDetailsItem.user_type}</CBadge>
																				:
																				<CBadge color="danger">{innerDetailsItem.user_type}</CBadge>
																			}
																		</div>
																		<div>
																			<span className="font-weight-bold medium-text mt-2"> A) ClassWork :- {" "}</span>
																			<span className="normal-font">{innerDetailsItem.class_work}</span> {" "}
																			<div>
																				<CLink
																					className="text-decoration-none diary-attachment-css"
																					href={innerDetailsItem.class_work_attachment}
																					target="_blank"
																					rel="noopener noreferrer"
																				>
																					View Class Work Attachment
																				</CLink>
																			</div>
																		</div>
																		<div>
																			<span className="font-weight-bold medium-text">B) HomeWork :- {" "}</span>
																			<span className="normal-font">{innerDetailsItem.home_work}</span>
																			<div>
																				<CLink
																					className="text-decoration-none diary-attachment-css"
																					href={innerDetailsItem.home_work_attachment}
																					target="_blank"
																					rel="noopener noreferrer"
																				>
																					View Home Work Attachment
																				</CLink>
																			</div>
																		</div>
																		<div>
																			<span className="font-weight-bold medium-text">C) Tomorrow Topic :- {" "}</span>
																			<span className="normal-font">{innerDetailsItem.tomorrow_topics}</span>
																		</div>
																	</div>
																	<CDropdownDivider className="mb-2 divider" />
																</CCardBody>
															</div>
														)
													})}
												</CCard>
											</div>
										)
									}
									)
							)
						})}

				</>}
		</>
	)
}

export default SchoolDiaryList
