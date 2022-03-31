import React, { useEffect, useState, useLayoutEffect } from "react";
import {
    CRow,
    CCol,
} from "@coreui/react";
import Controls from 'src/components/formControls/controls/Controls'
import { Form, useForm } from "../../components/formControls/useForm";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { useDispatch, useSelector } from "react-redux";
import {
    storeSettingPoint
} from "./SettingAction";

const PointSystemSetting = () => {

    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const settingState = useSelector((state) => state.Settings);

    const initialFValues = {

        studentsignup: settingState.studentPoint.signup,
        friendrequest: settingState.studentPoint.friend_request,
        referstudent: settingState.studentPoint.refer_student,
        refertutor: settingState.studentPoint.refer_tutor,
        ratesession: settingState.studentPoint.rate_session,
        completeassignment: settingState.studentPoint.complete_assignment,
        massreferral: settingState.studentPoint.mass_referral,
        postquestion: settingState.studentPoint.post_question,
        postjob: settingState.studentPoint.post_job,
        hiredtutor: settingState.studentPoint.hired_tutor,
        studentcreatetimetable: settingState.studentPoint.create_timetable,
        studentpostdialydiary: settingState.studentPoint.post_diary,
        postcourse: settingState.tutorPoint.post_course,
        findjob: settingState.tutorPoint.find_job,
        democlass: settingState.tutorPoint.demo_class,
        answered: settingState.tutorPoint.answered_question,
        axisclass: settingState.tutorPoint.axis_class,
        tutorsignup: settingState.tutorPoint.signup,
        tutorcreatetimetable: settingState.tutorPoint.create_timetable,
        tutorpostdialydiary: settingState.tutorPoint.post_diary,
    };


    let student_point = []
    let tutor_point = []

    // validation code start
    const validate = (fieldValues = values) => {

        let temp = { ...errors };

        if ("studentsignup" in fieldValues)

            if (fieldValues.studentsignup == "")
                temp.studentsignup = "Student Sign Up Point is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.studentsignup))
                temp.studentsignup = "Please enter only numbers";

            else temp.studentsignup = "";

        if ("friendrequest" in fieldValues)

            if (fieldValues.friendrequest == "")
                temp.friendrequest = "Friend Request Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.friendrequest))
                temp.friendrequest = "Please enter only numbers";

            else temp.friendrequest = "";

        if ("referstudent" in fieldValues)

            if (fieldValues.referstudent == "")
                temp.referstudent = "Refer Student Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.referstudent))
                temp.referstudent = "Please enter only numbers";

            else temp.referstudent = "";

        if ("refertutor" in fieldValues)

            if (fieldValues.refertutor == "")
                temp.refertutor = "Refer Tutor Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.refertutor))
                temp.refertutor = "Please enter only numbers";

            else temp.refertutor = "";

        if ("ratesession" in fieldValues)

            if (fieldValues.ratesession == "")
                temp.ratesession = "Rate A Session Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.ratesession))
                temp.ratesession = "Please enter only numbers";

            else temp.ratesession = "";

        if ("completeassignment" in fieldValues)

            if (fieldValues.completeassignment == "")
                temp.completeassignment = "Complete Assignment Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.completeassignment))
                temp.completeassignment = "Please enter only numbers";

            else temp.completeassignment = "";

        if ("massreferral" in fieldValues)

            if (fieldValues.massreferral == "")
                temp.massreferral = "mass Referral Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.massreferral))
                temp.massreferral = "Please enter only numbers";

            else temp.massreferral = "";

        if ("postquestion" in fieldValues)

            if (fieldValues.postquestion == "")
                temp.postquestion = "Post A Question Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.postquestion))
                temp.postquestion = "Please enter only numbers";

            else temp.postquestion = "";

        if ("postjob" in fieldValues)

            if (fieldValues.postjob == "")
                temp.postjob = "Post A Job Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.postjob))
                temp.postjob = "Please enter only numbers";

            else temp.postjob = "";

        if ("hiredtutor" in fieldValues)

            if (fieldValues.hiredtutor == "")
                temp.hiredtutor = "Hired Tutor Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.hiredtutor))
                temp.hiredtutor = "Please enter only numbers";

            else temp.hiredtutor = "";

        if ("studentcreatetimetable" in fieldValues)

            if (fieldValues.studentcreatetimetable == "")
                temp.studentcreatetimetable = "Student Create TimeTable Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.studentcreatetimetable))
                temp.studentcreatetimetable = "Please enter only numbers";

            else temp.studentcreatetimetable = "";
        if ("studentpostdialydiary" in fieldValues)

            if (fieldValues.studentpostdialydiary == "")
                temp.studentpostdialydiary = "Student Post Dialy Diary Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.studentpostdialydiary))
                temp.studentpostdialydiary = "Please enter only numbers";

            else temp.studentpostdialydiary = "";

        if ("postcourse" in fieldValues)

            if (fieldValues.postcourse == "")
                temp.postcourse = "Post Course Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.postcourse))
                temp.postcourse = "Please enter only numbers";

            else temp.postcourse = "";

        if ("findjob" in fieldValues)

            if (fieldValues.findjob == "")
                temp.findjob = "Find A Job Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.findjob))
                temp.findjob = "Please enter only numbers";

            else temp.findjob = "";

        if ("democlass" in fieldValues)

            if (fieldValues.democlass == "")
                temp.democlass = "Demo Class Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.democlass))
                temp.democlass = "Please enter only numbers";

            else temp.democlass = "";

        if ("answered" in fieldValues)

            if (fieldValues.answered == "")
                temp.answered = "Question Answer Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.answered))
                temp.answered = "Please enter only numbers";

            else temp.answered = "";

        if ("axisclass" in fieldValues)

            if (fieldValues.axisclass == "")
                temp.axisclass = "Axis per Class Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.axisclass))
                temp.axisclass = "Please enter only numbers";

            else temp.axisclass = "";

        if ("tutorsignup" in fieldValues)

            if (fieldValues.tutorsignup == "")
                temp.tutorsignup = "Tutor SignUp Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.tutorsignup))
                temp.tutorsignup = "Please enter only numbers";

            else temp.tutorsignup = "";

        if ("tutorcreatetimetable" in fieldValues)

            if (fieldValues.tutorcreatetimetable == "")
                temp.tutorcreatetimetable = "Tutor Create TimeTable Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.tutorcreatetimetable))
                temp.tutorcreatetimetable = "Please enter only numbers";

            else temp.tutorcreatetimetable = "";

        if ("tutorpostdialydiary" in fieldValues)

            if (fieldValues.tutorpostdialydiary == "")
                temp.tutorpostdialydiary = "Tutor Post Dialy Diary Points is required.";

            else if (!/^[0-9\b]+$/.test(fieldValues.tutorpostdialydiary))
                temp.tutorpostdialydiary = "Please enter only numbers";

            else temp.tutorpostdialydiary = "";

        setErrors({
            ...temp,
        });
        if (fieldValues == values) return Object.values(temp).every((x) => x == "");
    }

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFValues, true, validate);

    // Validation Code End

    // Handle Form Submit


    const handleSubmit = (e) => {

        e.preventDefault();
        if (validate()) {
            var student_point_obj = {
                "signup": values.studentsignup,
                "friend_request": values.friendrequest,
                "refer_student": values.referstudent,
                "refer_tutor": values.refertutor,
                "rate_session": values.ratesession,
                "complete_assignment": values.completeassignment,
                "mass_referral": values.massreferral,
                "post_question": values.postquestion,
                "post_job": values.postjob,
                "hired_tutor": values.hiredtutor,
                "create_timetable": values.studentcreatetimetable,
                "post_diary": values.studentpostdialydiary
            }

            student_point = student_point_obj;

            var tutor_point_obj = {
                "signup": values.tutorsignup,
                "post_course": values.postcourse,
                "find_job": values.findjob,
                "demo_class": values.democlass,
                "answered_question": values.answered,
                "axis_class": values.axisclass,
                "post_diary": values.tutorpostdialydiary,
                "create_timetable": values.tutorcreatetimetable

            }


            tutor_point = tutor_point_obj;

            setLoading(true);
            let data = new FormData();

            data.append("tutor_point[]", tutor_point);
            data.append("student_point[]", student_point);

            showLoader();
            dispatch(storeSettingPoint({ tutor_point: tutor_point, student_point: student_point }))
            resetForm()
            setLoading(false);
            hideLoader();
        }
    }

    return (
        <>
            {settingState.studentPoint == undefined ? <div className="loader"></div> :
                isLoading ? (
                    <>{loader}</>
                ) :
                    <div>

                        <Form onSubmit={handleSubmit}>
                            <CRow>
                                <CCol xl={12} sm={12}>
                                    <p className="h5 font-weight-bold p-3">Student Points</p>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6} >
                                    <Controls.Input
                                        name="studentsignup"
                                        label="SignUp *"
                                        value={values.studentsignup}
                                        // labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.studentsignup}
                                    />
                                </CCol>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Input
                                        name="friendrequest"
                                        label="Friend Request *"
                                        value={values.friendrequest}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.friendrequest}
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6} >
                                    <Controls.Input
                                        name="referstudent"
                                        label="Refer Student *"
                                        value={values.referstudent}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.referstudent}
                                    />
                                </CCol>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Input
                                        name="refertutor"
                                        label="Refer Tutor *"
                                        value={values.refertutor}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.refertutor}
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6} >
                                    <Controls.Input
                                        name="ratesession"
                                        label="Rate a Session *"
                                        value={values.ratesession}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.ratesession}
                                    />
                                </CCol>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Input
                                        name="completeassignment"
                                        label="Complete Assignment *"
                                        value={values.completeassignment}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.completeassignment}
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6} >
                                    <Controls.Input
                                        name="massreferral"
                                        label="Mass Referral *"
                                        value={values.massreferral}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.massreferral}
                                    />
                                </CCol>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Input
                                        name="postquestion"
                                        label="Post Question *"
                                        value={values.postquestion}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.postquestion}
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6} >
                                    <Controls.Input
                                        name="postjob"
                                        label="Post A Job *"
                                        value={values.postjob}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.postjob}
                                    />
                                </CCol>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Input
                                        name="hiredtutor"
                                        label="Hired a Tutor *"
                                        value={values.hiredtutor}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.hiredtutor}
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6} >
                                    <Controls.Input
                                        name="studentcreatetimetable"
                                        label="Create TimeTable *"
                                        value={values.studentcreatetimetable}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.studentcreatetimetable}
                                    />
                                </CCol>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Input
                                        name="studentpostdialydiary"
                                        label="Post Daily Diary *"
                                        value={values.studentpostdialydiary}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.studentpostdialydiary}
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xl={12} sm={12}>
                                    <p className="h5 font-weight-bold p-3">Tutor Points</p>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6} >
                                    <Controls.Input
                                        name="tutorsignup"
                                        label="Signup *"
                                        value={values.tutorsignup}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.tutorsignup}
                                    />
                                </CCol>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Input
                                        name="postcourse"
                                        label="Post A Course *"
                                        value={values.postcourse}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.postcourse}
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6} >
                                    <Controls.Input
                                        name="findjob"
                                        label="Find A Job- Send Request To Student *"
                                        value={values.findjob}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.findjob}
                                    />
                                </CCol>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Input
                                        name="democlass"
                                        label="Demo Class *"
                                        value={values.democlass}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.democlass}
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6} >
                                    <Controls.Input
                                        name="answered"
                                        label="Answred 'Ask A Question' *"
                                        value={values.answered}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.answered}
                                    />
                                </CCol>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Input
                                        name="axisclass"
                                        label="Axis Per Class *"
                                        value={values.axisclass}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.axisclass}
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6} >
                                    <Controls.Input
                                        name="tutorcreatetimetable"
                                        label="Create TimeTable *"
                                        value={values.tutorcreatetimetable}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.tutorcreatetimetable}
                                    />
                                </CCol>
                                <CCol sm={6} md={6} lg={6} xl={6}>
                                    <Controls.Input
                                        name="tutorpostdialydiary"
                                        label="Post Dialy Diary *"
                                        value={values.tutorpostdialydiary}
                                        labelShow={true}
                                        onChange={handleInputChange}
                                        error={errors.tutorpostdialydiary}
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol sm={6} md={6} lg={6} xl={6} className="m-2">
                                    <div className="p-2 d-inline">
                                        <Controls.Button type="submit" text="Update" />
                                    </div>

                                </CCol>
                            </CRow>

                        </Form>

                    </div>
            }
        </>
    )
}

export default PointSystemSetting