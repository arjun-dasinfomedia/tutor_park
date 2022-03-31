import React from "react";
import { CForm } from "@coreui/react";
import Controls from "src/components/formControls/controls/Controls";
const EditQuestionBank = () => {
  
  return (
    <>
      <CForm>
        <div className="row">
          <div className="mb-3 col-6 col-sm-6 col-md-6 col-lg-6 colxl-6">
            <Controls.Input name="name" label="Class Name" />
          </div>
          <div className="mb-3 col-6 col-sm-6 col-md-6 col-lg-6 colxl-6">
            <Controls.Input name="name" label="Class Name" />
          </div>
        </div>
      </CForm>
    </>
  );
};
export default EditQuestionBank;
