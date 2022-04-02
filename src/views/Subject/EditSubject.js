import React from "react";
import {
    CRow,
    CCol,
} from "@coreui/react";
import { updateSubject } from "./subjectAction"
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import { useDispatch, useSelector } from "react-redux";

const Status = [
    { id: "yes", title: "Active" },
    { id: "no", title: "Deactive" },
];

const EditSyllabus = (data) => {

    const dispatch = useDispatch();
    const DropDown = useSelector((state) => state.dropdowns);
    
    const initialFValues = {
        id: data.data.id,
        class_id: data.data.classes[0].id,
        name: data.data.name,
        active: data.data.active,
        description: data.data.description,
        class_other: "",
    };

    // Validation Code Start
    const validate = (fieldValues = values) => {
        let temp = { ...errors };

        if ("description" in fieldValues)
            temp.description = fieldValues.description
                ? ""
                : "Please Enter Subject Description.";

        if ("class_id" in fieldValues)
            temp.class_id = fieldValues.class_id
                ? ""
                : "Please Select a Class";

        if (values.class_id == "other") {
            if ("class_other" in fieldValues)
                temp.class_other == fieldValues.class_other ?
                    ""
                    : "Please Enter Other Class."
        }

        if ("name" in fieldValues)
            temp.name = fieldValues.name ? "" : "Please Enter Subject Name.";

        setErrors({
            ...temp,
        });
        if (fieldValues === values) return Object.values(temp).every((x) => x === "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(initialFValues, true, validate);
    // Validation Code End

    // handle Submit Form for update
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            let formData = new FormData()
            formData.append('id', values.id)
            formData.append('class_id', values.class_id)

            if(values.class_id == "other")
            {
                formData.append("class_other" , values.class_other)
            }
            formData.append('name', values.name)
            formData.append('description', values.description)
            formData.append('active', values.active);
            dispatch(updateSubject(formData));
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <CRow>
                    <CCol xl={6} sm={6} className="">
                        <Controls.Select
                            name="class_id"
                            label="Class *"
                            value={values.class_id}
                            onChange={handleInputChange}
                            options={DropDown.classList}
                            error={errors.class_id}
                            other="other"
                        />
                    </CCol>
                    {values.class_id == "other" ?
                        <CCol xl={6} sm={6} className="">
                            <Controls.Input
                                name="class_other"
                                label="Other Class *"
                                value={values.class_other}
                                onChange={handleInputChange}
                                error={errors.class_other}
                            />
                        </CCol>
                        :
                        errors.class_other = ""
                    }
                    <CCol xl={6} sm={6} className="">
                        <Controls.Input
                            name="name"
                            label="Name *"
                            value={values.name}
                            onChange={handleInputChange}
                            error={errors.name}
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xl={6} sm={6} className="">
                        <Controls.RadioGroup
                            name="active"
                            label="Status *"
                            value={values.active}
                            onChange={handleInputChange}
                            items={Status}
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
                            onChange={handleInputChange}
                            error={errors.description}
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
