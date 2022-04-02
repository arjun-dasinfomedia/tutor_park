import React, { useEffect, useState } from 'react'
import { CModalBody, CModalTitle, CModalHeader, CModal, CCard, CRow, CCol, CButton, CFormInput } from '@coreui/react'
import { Form, useForm } from "src/components/formControls/useForm";
import Controls from "src/components/formControls/controls/Controls";
import { useDispatch, useSelector } from 'react-redux';
import { classDivisionData, syllabusListData } from 'src/redux/actions/dropdowns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { schoolClassStore } from './SchoolClassAction';
import { FormHelperText } from '@material-ui/core';
import ClassList from './ClassList';
import { checkAccessPermission } from 'src/utility/utils';

const TopFilterClassRoom = () => {

  const dispatch = useDispatch()
  const [schoolclass, setSchoolClass] = useState(false)
  const DropDown = useSelector((state) => state.dropdowns);
  const [divisionstatus, setDivisionStatus] = useState(true)
  const [classroomSearch, setClassRoomSearch] = useState("")

  const initialFValues = {
    syllabus_id: '',
    class_id: '',
    class_name: '',
    class_image: '',
    class_image_name: '',
    description: '',
  };

  // section Dropdown menu CSS start

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // section Dropdown menu CSS end

  const [divisionName, setDivisionName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDivisionName(
      typeof value === 'string' ? value.split(',') : value,
    );

  };

  var DivisionData = DropDown.classDivisionList.filter(function (data) {
    return divisionName.some(function (Name) {
      return data.name === Name;
    });
  });


  const DivisionID = [];
  {
    DivisionData.map(function (item) {
      DivisionID.push(item.id);
    })
  }

  const clearValue = () => {
    setDivisionStatus(true)
    setDivisionName([])
  }

  // validation code start

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("syllabus_id" in fieldValues)
      temp.syllabus_id = fieldValues.syllabus_id
        ? ""
        : "Please select syllabus.";

    if ("class_id" in fieldValues)
      temp.class_id = fieldValues.class_id ? "" : "Please select class.";

    if ("class_name" in fieldValues)
      temp.class_name = fieldValues.class_name ? "" : "Enter Class name.";

    if ("class_image_name" in fieldValues) {
      var imagePath = fieldValues.class_image_name;
      var logo = ['jpeg', 'png', 'jpg', 'bmp']
      var extension = imagePath.substring(
        imagePath.lastIndexOf(".") + 1,
        imagePath.length
      );

      if (fieldValues.class_image_name) {
        if (logo.includes(extension)) {
          temp.class_image_name = "";
        } else {
          temp.class_image_name = "Only Jpg, png ,bmp and jpg  file is allowed.";
        }
      } else {
        temp.class_image_name = "";
      }
    }

    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "Please add your description.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values) return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (DivisionID.length === 0) {
      setDivisionStatus(false)
    } else {
      setDivisionStatus(true)
    }
    if (validate()) {

      let formData = new FormData()
      formData.append('syllabus_id', values.syllabus_id)
      formData.append('class_id', values.class_id)
      formData.append('class_name', values.class_name)
      if (values.class_image_name !== "") {
        formData.append('image', values.class_image)
      }
      formData.append('description', values.description)
      DivisionID.forEach((item) => {
        formData.append("divisions[]", item);
      });

      if (DivisionID.length !== 0) {



        dispatch(schoolClassStore(formData));
        resetForm();
        clearValue();
        setSchoolClass(false)
      } else {
        setSchoolClass(true)
      }
    }
  };

  useEffect(() => {
    dispatch(syllabusListData())
    dispatch(classDivisionData())
  }, [])

  return (
    <>
      <div className="mt-3">
        <CCard className="schooldiary-header-css">

          <div className="row mt-3 d-flex">
            <div className="text-center col-12">
              <div className="postsearchheader">
                Class Room
                {
                  checkAccessPermission('class_romm_add') ? <><CButton
                    className="d-inline textbook-add-button-css w-auto mt-3 mb-3"
                    onClick={() => setSchoolClass(!schoolclass)}
                  >
                    Add
                  </CButton></> : null
                }

              </div>

            </div>
          </div>
          <div className="row mb-3 d-flex justify-content-center">
            <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
            <div
              className="text-center position-relative col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6"
            >
              <CFormInput
                onChange={(event) => setClassRoomSearch(event.target.value)}
                className="searchinput rounded-pill pr-5"
                placeholder="Search"
              ></CFormInput>
              <CButton className="searchbutton position-absolute rounded-pill ">
                {" "}
                <FontAwesomeIcon className="serchingicon" icon={faSearch} />
              </CButton>
            </div>
            <div className="col-1 col-sm-1 col-md-3 col-lg-3 col-xl-3"></div>
          </div>

        </CCard>
      </div>

      <ClassList searchData={classroomSearch} />

      {/* school add Class modal  */}

      <CModal size="lg" visible={schoolclass} onDismiss={() => setSchoolClass(false)}
        onClick={() => { resetForm(); clearValue() }}>
        <CModalHeader onDismiss={() => setSchoolClass(false)}
          onClick={() => { resetForm(); clearValue() }} className="tutorviewmodalheader">
          <CModalTitle>Add Class</CModalTitle>
        </CModalHeader>
        <CModalBody>

          <Form onSubmit={handleSubmit}>
            <CRow>
              <CCol sm={6} md={6} lg={6} xl={6}>

                <Controls.Select
                  name="syllabus_id"
                  label="Syllabus *"
                  value={values.syllabus_id}
                  onChange={handleInputChange}
                  options={DropDown.syllabusList}
                  error={errors.syllabus_id}
                // other="other"
                />
                {/* {
                      values.syllabus_id == 'other' ?
                        <Controls.Input
                          name="syllabus_other"
                          label="Other Syllabus *"
                          value={values.syllabus_other}
                          onChange={handleInputChange}
                          error={errors.syllabus_other}
                        />
                        :
                        ""
                    } */}
              </CCol>
              <CCol sm={6} md={6} lg={6} xl={6}>
                <Controls.Select
                  name="class_id"
                  label="Class *"
                  value={values.class_id}
                  onChange={handleInputChange}
                  options={DropDown.classList}
                  error={errors.class_id}
                // other="other"
                />
                {/* {
                      values.class_id == 'other' ?
                        <Controls.Input
                          name="class_other"
                          label="Other Class *"
                          value={values.class_other}
                          onChange={handleInputChange}
                          error={errors.class_other}
                        />
                        :
                        ""
                    } */}
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={6} md={6} lg={6} xl={6}>
                <Controls.Input
                  name="class_name"
                  label="Class name *"
                  value={values.class_name}
                  onChange={handleInputChange}
                  error={errors.class_name}
                />
              </CCol>

              <CCol sm={6} md={6} lg={6} xl={6}>
                <Controls.InputLabelShown
                  label="Class Image"
                  name="class_image_name"
                  type="file"
                  value={values.class_image_name}
                  onChange={handleInputChange}
                  error={errors.class_image_name}
                />
              </CCol>

            </CRow>

            <CRow>
              <CCol sm={6} md={6} lg={6} xl={6}>
                <FormControl sx={{ m: 1, width: 150 }}>
                  <InputLabel id="demo-multiple-checkbox-label">Section</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={divisionName}
                    onChange={(e) => handleChange(e)}
                    input={<OutlinedInput label="Section" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    name="division"
                  >
                    {DropDown.classDivisionList.map((item) => (
                      <MenuItem key={item.id} value={item.name} >
                        <Checkbox checked={divisionName.indexOf(item.name) > -1} />
                        <ListItemText primary={item.name} />
                        <br />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {DivisionID.length === 0 && divisionstatus !== true ? (
                  <div className='ml-4'>
                    <FormHelperText style={{ color: '#f44336', marginBottom: '20px', lineHeight: '5px', fontSize: '12px' }}>Please select division</FormHelperText>
                  </div>
                ) : null}

              </CCol>
            </CRow>

            <CRow>
              <CCol sm={12} md={12} lg={12} xl={12}>
                <Controls.CustomTextArea
                  label="Description *"
                  rows={5}
                  name="description"
                  value={values.description}
                  onChange={handleInputChange}
                  error={errors.description}
                />
              </CCol>
            </CRow>

            <CRow>
              <CCol sm={4} md={4} lg={4} xl={4} className="m-2">
                <div className="p-2 d-inline">
                  <Controls.Button type="submit" text="Submit" />
                </div>
                <div className="p-2 d-inline">
                  <Controls.Button
                    text="Reset"
                    color="default"
                    onClick={() => { resetForm(); clearValue() }}
                  />
                </div>
              </CCol>
            </CRow>
          </Form>
        </CModalBody>
      </CModal>

    </>
  )
}
export default TopFilterClassRoom;
