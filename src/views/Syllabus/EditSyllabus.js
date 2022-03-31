import React from "react";
import {
    CRow,
    CCol,
} from "@coreui/react";
import {
    updateSyllabus,
} from "./SyllabusActions"
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import { useDispatch } from "react-redux";

const active = [
    { id: "yes", title: "Active" },
    { id: "no", title: "Deactive" },
];

const EditSyllabus = (data) => {

    const dispatch = useDispatch();

    // initial value 
    const initialFValues = {
        id: data.data.id,
        name: data.data.name,
        active: data.data.active,
        description: data.data.description,
    };

    // validation code start
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
    }

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFValues, true, validate);
    // validation code end

    // handle Submit Form for update
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            let formData = new FormData()
            formData.append('id', values.id)
            formData.append('name', values.name)
            formData.append('active', values.active)
            formData.append('description', values.description)
            dispatch(updateSyllabus(formData));
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <CRow>
                    <CCol xl={6} sm={6} className="">
                        <Controls.Input
                            name="name"
                            label="Syllabus Name *"
                            value={values.name}
                            error={errors.name}
                            onChange={handleInputChange} />
                    </CCol>
                    <CCol xl={6} sm={6} className="">
                        <Controls.RadioGroup
                            name="active"
                            label="Select Type"
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
                            name="description"
                            value={values.description}
                            error={errors.description}
                            onChange={handleInputChange}
                        />
                    </CCol>
                </CRow>

                <CRow>
                    <CCol sm={12} md={12} lg={6} xl={6} className="m-2">
                        <div className="d-inline">
                            <Controls.Button type="submit" text="update" className="m-1" onDismiss={() => setEditVisible(false)} />
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
export default EditSyllabus;
