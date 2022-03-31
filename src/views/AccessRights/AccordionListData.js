import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateaccessRights } from "./AccessRightsAction";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import {
  CForm,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CButton,
  CFormSwitch,
} from "@coreui/react";

const MySwal = withReactContent(Swal);

const AccessRightsList = (props) => {
  const dispatch = useDispatch();

  /* Array Value Set */
  const assignedPermissions = props.data.permissions
    ? props.data.permissions
    : {};
  const permissionArray = [];
  for (let permission of Object.values(assignedPermissions)) {
    permissionArray.push(permission.name);
  }

  /* State */
  const accessRightsState = useSelector((state) => state.accessRights);
  const [permissions, setPermissions] = useState(permissionArray);
  const [visible, setVisible] = useState(false);

  /* icone Change Collapse */
  const handlechnageiconClick = () => {
    if (visible === props.id) {
      return setVisible(null);
    }
    setVisible(props.id);
  };

  /* Switch Button click Permissions */
  const handleSwitchToggle = (e) => {
    if (!permissions.includes(e.target.value)) {
      setPermissions([...permissions, e.target.value]);
    } else {
      setPermissions(permissions.filter((vishal) => e.target.value !== vishal));
    }
  };

  /* UpdateEvent */
  const handleSubmit = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update permissions?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateaccessRights({ id, permissions }));
        // Swal.fire("Success", "Spam Successfully", "success");
      }
    });
  };

  return (
    <>
      <Accordion
        className="mt-2 "
        style={{
          backgroundColor: "#F2F4F8",
          border: "1px solid #A8A6E1",
          borderRadius: "5px",
        }}
      >
        <AccordionSummary
          onClick={() => handlechnageiconClick(props.id)}
          key={props.id}
          expandIcon={
            visible === props.id ? <HorizontalRuleIcon /> : <AddIcon />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="accessRights-title">
            {props.data.name.charAt(0).toUpperCase() +
              props.data.name.slice(1).replace("-", " ")}
          </div>
        </AccordionSummary>
        <CForm>
          <CFormInput
            className="d-inline mb-2 "
            type="hidden"
            name="id"
            value={props.data.id}
          />
          <AccordionDetails className="p-0">
            <Typography>
              <CTable bordered responsive>
                <CTableHead>
                  <CTableRow className="tableheader text-center">
                    <CTableDataCell className="col-4 accessRights-normal-text">
                      Module
                    </CTableDataCell>
                    <CTableDataCell className="col-2 accessRights-normal-text">
                      View
                    </CTableDataCell>
                    <CTableDataCell className="col-2 accessRights-normal-text">
                      Add
                    </CTableDataCell>
                    <CTableDataCell className="col-2 accessRights-normal-text">
                      Update
                    </CTableDataCell>
                    <CTableDataCell className="col-2 accessRights-normal-text">
                      Delete
                    </CTableDataCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {accessRightsState.moduleData.map((module, i) => (
                    <CTableRow key={i}>
                      <CTableDataCell className="accessRights-normal-text col-4">
                        {module.name}
                      </CTableDataCell>
                      <CTableDataCell className="col-2">
                        <CFormSwitch
                          size="lg"
                          name="parmissons[]"
                          style={{ cursor: "pointer" }}
                          className="d-flex justify-content-center "
                          value={module.tag + "_view"}
                          onChange={(e) => handleSwitchToggle(e)}
                          checked={
                            permissions.includes(module.tag + "_view")
                              ? "checked"
                              : ""
                          }
                        />
                      </CTableDataCell>
                      <CTableDataCell className="col-2">
                        <CFormSwitch
                          size="lg"
                          name="parmissons[]"
                          style={{ cursor: "pointer" }}
                          className="d-flex justify-content-center"
                          value={module.tag + "_add"}
                          onChange={(e) => handleSwitchToggle(e)}
                          checked={
                            permissions.includes(module.tag + "_add")
                              ? "checked"
                              : ""
                          }
                        />
                      </CTableDataCell>
                      <CTableDataCell className="col-2">
                        <CFormSwitch
                          size="lg"
                          name="parmissons[]"
                          style={{ cursor: "pointer" }}
                          className="d-flex justify-content-center"
                          value={module.tag + "_edit"}
                          onChange={(e) => handleSwitchToggle(e)}
                          checked={
                            permissions.includes(module.tag + "_edit")
                              ? "checked"
                              : ""
                          }
                        />
                      </CTableDataCell>
                      <CTableDataCell className="col-2">
                        <CFormSwitch
                          size="lg"
                          name="parmissons[]"
                          style={{ cursor: "pointer" }}
                          className="d-flex justify-content-center"
                          value={module.tag + "_delete"}
                          onChange={(e) => handleSwitchToggle(e)}
                          checked={
                            permissions.includes(module.tag + "_delete")
                              ? "checked"
                              : ""
                          }
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <CButton
                className="answerbutton ml-3 mb-3"
                type="button"
                text="Submit"
                value="submit"
                onClick={(e) => handleSubmit(e, props.data.id)}
              >
                Update
              </CButton>
            </Typography>
          </AccordionDetails>
        </CForm>
      </Accordion>
    </>
  );
};
export default AccessRightsList;
