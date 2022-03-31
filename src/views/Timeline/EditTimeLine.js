import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import {
    CRow,
    CCol,
} from "@coreui/react";
import { updateTimeLine } from "./TImeLineAction"
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import useFullPageLoader from "../../hooks/useFullPageLoader";

// main Edit class start
const EditTimeLine = (data) => {

    // dropdown option for Audiance
    const Audiance = [
        { id: "Kindergarten", name: "Kindergarten" },
        { id: "Primary", name: "Primary" },
        { id: "High School", name: "High School" },
        { id: "Intermediate", name: "Intermediate" },
        { id: "Degree", name: "Degree" },
        { id: "Others", name: "Others" }
    ];

    // dispatch Method
    const [editTimeLineModal, setEditTimeLineModal] = useState(false);
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const history = useHistory()

    // initial value
    const initialFValues = {

        id: data.data.id,
        audiance: data.data.audiance,
        image: "",
        image_name: "",
        description: data.data.description,
        video: "",
        video_name: "",
    };

    // validation code start
    const validate = (fieldValues = values) => {
        let temp = { ...errors };

        if ("audiance" in fieldValues)
            temp.audiance = fieldValues.audiance ? "" : "Please select target audience.";

        if (fieldValues.audiance === "Others") {
            if ("other_audiance" in fieldValues)
                temp.other_audiance = fieldValues.other_audiance ? "" : "Please enter target audience.";
        }

        if ("description" in fieldValues)
            temp.description = fieldValues.description
                ? ""
                : "Pleasse add your description.";
        if ("video_name" in fieldValues) {
            var imagePath = fieldValues.video_name;
            var logo = ['mp4', 'mov', 'wmv', 'mkv', 'avi']
            var extension = imagePath.substring(
                imagePath.lastIndexOf(".") + 1,
                imagePath.length
            );
            if (fieldValues.video_name) {
                if (logo.includes(extension)) {

                    temp.video_name = "";
                } else {

                    temp.video_name = "Only mp4, mov, wmv, mkv and avi  file is allowed.";
                }
            } else {
                temp.video_name = "";
            }
        }
        if ("image_name" in fieldValues) {
            var imagePath = fieldValues.image_name;
            var logo = ['jpeg', 'png', 'jpg']
            var extension = imagePath.substring(
                imagePath.lastIndexOf(".") + 1,
                imagePath.length
            );
            if (fieldValues.image_name) {
                if (logo.includes(extension)) {

                    temp.image_name = "";
                } else {

                    temp.image_name = "Only Jpg, png and jpg  file is allowed.";
                }
            } else {
                temp.image_name = "";
            }
        }

        setErrors({
            ...temp,
        });
        if (fieldValues == values) return Object.values(temp).every((x) => x == "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFValues, true, validate);
    // validation code end

    // handle update form submit
    const handleSubmit = (e) => {

        e.preventDefault();

        if (validate()) {
            let data = new FormData();

            data.append("id", values.id);
            if (values.audiance == "Others") {
                data.append("audiance", values.other_audiance);
            } else {

                data.append("audiance", values.audiance)
            }
            data.append("description", values.description);
            data.append("video", values.video);
            data.append("image", values.image);

            dispatch(updateTimeLine(data));



        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <CRow>
                    <CCol sm={6} md={6} lg={6} xl={6}>
                        <Controls.Select
                            name="audiance"
                            label="Select Target Audience *"
                            value={values.audiance}
                            onChange={handleInputChange}
                            options={Audiance}
                            error={errors.audiance}
                        />
                    </CCol>
                    {
                        values.audiance == "Others" ?
                            <CCol sm={6} md={6} lg={6} xl={6}>
                                <Controls.Input
                                    name="other_audiance"
                                    label="Other Target Audience *"
                                    value={values.oteher_audiance}
                                    labelShow={true}
                                    onChange={handleInputChange}
                                    error={errors.audiance}
                                />
                            </CCol>
                            : ""
                    }

                    <CRow>
                        <CCol xl={12} sm={12}>
                            <Controls.CustomTextArea
                                label="Description *"
                                rows={3}
                                name="description"
                                value={values.description}
                                onChange={handleInputChange}
                                error={errors.description}
                            />
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol xl={6} sm={6} className="">
                            <Controls.InputLabelShown
                                name="image_name"
                                label="Timeline Image"
                                type="file"
                                value={values.image_name}
                                onChange={handleInputChange}
                                error={errors.image_name}
                            />
                        </CCol>
                        <CCol xl={6} sm={6} className="">
                            <Controls.InputLabelShown
                                name="video_name"
                                label="Timeline Video"
                                type="file"
                                value={values.video_name}
                                onChange={handleInputChange}
                                error={errors.video_name}
                            />
                        </CCol>
                    </CRow>
                </CRow>

                <CRow>
                    <CCol sm={12} md={12} lg={6} xl={6} className="m-2">
                        <div className="d-inline">
                            <Controls.Button
                                type="submit"
                                text="Update timeline"
                                className="m-1"
                                onDismiss={() => setEditTimeLineModal(false)}
                            />
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
        </>
    );
};
export default EditTimeLine
