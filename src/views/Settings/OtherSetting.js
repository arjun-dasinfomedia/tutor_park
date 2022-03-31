import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import Controls from 'src/components/formControls/controls/Controls'
import {
    CRow,
    CCol,
} from "@coreui/react";
import { Form, useForm } from "src/components/formControls/useForm";
import { storeRazorPaySettings } from "./SettingAction"

const Mode = [
    { id: "live", title: "Live" },
    { id: "test", title: "Test" },
];

const OtherSetting = () => {

    const [isLoading, setLoading] = useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const settingState = useSelector((state) => state.Settings);
    const dispatch = useDispatch();

    useEffect(async () => {
        showLoader();

        setLoading(false);
        hideLoader();
    }, [])



    const initialFValues = {
        testRazorPayKeyId: settingState.rezorPayList.test_key_id,
        testRazorPaySecret: settingState.rezorPayList.test_secret,
        liveRazorPayKeyId: settingState.rezorPayList.live_key_id,
        liveRazorPaySecret: settingState.rezorPayList.live_secret,
        mode: settingState.rezorPayList.mode,
    }

    const validate = (fieldValues = values) => {

        let temp = { ...errors };

        if (values.mode == "test") {

            if ("testRazorPayKeyId" in fieldValues)

                if (fieldValues.testRazorPayKeyId == "")
                    temp.testRazorPayKeyId = "Test Razor pay Key ID is Required.";

                else temp.testRazorPayKeyId = "";

            if ("testRazorPaySecret" in fieldValues)

                if (fieldValues.testRazorPaySecret == "")
                    temp.testRazorPaySecret = "Test Razor Pay Secret is Required.";

                else temp.testRazorPaySecret = "";
        }

        if (values.mode == "live") {

            if ("liveRazorPayKeyId" in fieldValues)

                if (fieldValues.liveRazorPayKeyId == "")
                    temp.liveRazorPayKeyId = "Live Razor Pay Key ID is Required";

                else temp.liveRazorPayKeyId = "";

            if ("liveRazorPaySecret" in fieldValues)

                if (fieldValues.liveRazorPaySecret == "")
                    temp.liveRazorPaySecret = "Live Razor Pay Secret is Required.";

                else temp.liveRazorPaySecret = "";
        }

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

            let data = new FormData();


            data.append("mode", values.mode)
            data.append("test_key_id", values.testRazorPayKeyId)
            data.append("test_secret", values.testRazorPaySecret)

            data.append("live_key_id", values.liveRazorPayKeyId)
            data.append("live_secret", values.liveRazorPaySecret)

            dispatch(storeRazorPaySettings(data))
            resetForm()

        }
    }



    return (
        <>
            {isLoading ? (
                <>{loader}</>
            ) :
                <div>

                    <Form onSubmit={handleSubmit}>
                        <CRow className="pt-3">

                            <CCol sm={12} md={12} lg={12} xl={12}>
                                <Controls.RadioGroup
                                    name="mode"
                                    label="Mode *"
                                    value={values.mode}
                                    onChange={handleInputChange}
                                    items={Mode}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mt-3">
                            <CCol sm={6} md={6} lg={6} xl={6} className="mt-3 mb-3">
                                <Controls.Input
                                    name="testRazorPayKeyId"
                                    label="Test RazorPay Key ID *"
                                    value={values.testRazorPayKeyId}
                                    labelShow={true}
                                    onChange={handleInputChange}
                                    error={errors.testRazorPayKeyId}
                                />
                            </CCol>
                            <CCol sm={6} md={6} lg={6} xl={6} className="mt-3 mb-3">
                                <Controls.Input
                                    name="testRazorPaySecret"
                                    label="Test RazorPay Secret *"
                                    value={values.testRazorPaySecret}
                                    labelShow={true}
                                    onChange={handleInputChange}
                                    error={errors.testRazorPaySecret}
                                />
                            </CCol>
                        </CRow>

                        <CRow className="">
                            <CCol sm={6} md={6} lg={6} xl={6} className=" mb-3" >
                                <Controls.Input
                                    name="liveRazorPayKeyId"
                                    label="Live RazorPay Key ID *"
                                    value={values.liveRazorPayKeyId}
                                    // labelShow={true}
                                    onChange={handleInputChange}
                                    error={errors.liveRazorPayKeyId}
                                />
                            </CCol>
                            <CCol sm={6} md={6} lg={6} xl={6} className=" mb-3">
                                <Controls.Input
                                    name="liveRazorPaySecret"
                                    label="Live RazorPay Secret *"
                                    value={values.liveRazorPaySecret}
                                    labelShow={true}
                                    onChange={handleInputChange}
                                    error={errors.liveRazorPaySecret}
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

export default OtherSetting