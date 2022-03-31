import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  subjectListData,
  classListData,
  subjectTutorListData,
} from "../../redux/actions/dropdowns/index";

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    // get dropdown values according to dependency for class and subject
    if (name == "syllabus_id") {
      dispatch(classListData({ syllabus_id: value }));
    }
    if (name == "class_id") {
      dispatch(subjectListData({ class_id: value }));
    }
    if (name == "subject_id") {
      dispatch(subjectTutorListData({ subject_id: value }));
    }

    if (name == "image_name") {
      setValues({
        ...values,
        ["image"]: files[0],
        ["image_name"]: value,
      });
    }
    if (name == "class_image_name") {
      setValues({
        ...values,
        ["class_image"]: files[0],
        ["class_image_name"]: value,
      });
    }
    if (name == "video_name") {
      setValues({
        ...values,
        ["video"]: files[0],
        ["video_name"]: value,
      });
    }
    if (name == "images_name") {
      setValues({
        ...values,
        ["images"]: files[0],
        ["images_name"]: value,
      });
    }
    if (name == "logo_name") {
      setValues({
        ...values,
        ["logo"]: files[0],
        ["logo_name"]: value,
      });
    }

    if (name == "demo_video_name") {
      setValues({
        ...values,
        ["demo_video"]: files[0],
        ["demo_video_name"]: value,
      });
    }
    if (name == "course_video_name") {
      setValues({
        ...values,
        ["course_video"]: files[0],
        ["course_video_name"]: value,
      });
    }
    if (name == "attachment_name") {
      setValues({
        ...values,
        ["attachment"]: files[0],
        ["attachment_name"]: value,
      });
    }
    if (name == "sample_images_name") {
      setValues({
        ...values,
        ["sample_images"]: files[0],
        ["sample_images_name"]: value,
      });
    }

    if (name === "from_date") {
      setValues({
        ...values,
        ["to_date"]: value,
        ["from_date"]: value,
      });
    }

    if (name === "start_date") {
      setValues({
        ...values,
        ["end_date"]: value,
        ["start_date"]: value,
      });
    }

    if (name === "from_time") {
      setValues({
        ...values,
        ["to_time"]: value,
        ["from_time"]: value,
      });
    }

    if (name === "start_time") {
      setValues({
        ...values,
        ["end_time"]: value,
        ["start_time"]: value,
      });
    }
    if (name == "school_class_work") {
      setValues({
        ...values,
        ["class_work_image"]: files[0],
        ["school_class_work"]: value,
      });
    }
    if (name == "school_home_work") {
      setValues({
        ...values,
        ["home_work_image"]: files[0],
        ["school_home_work"]: value,
      });
    }
    if (name == "school_image_file") {
      setValues({
        ...values,
        ["school_image"]: files[0],
        ["school_image_file"]: value,
      });
    }
    if (name == "school_udise_no") {
      setValues({
        ...values,
        ["school_udise"]: files[0],
        ["school_udise_no"]: value,
      });
    }

    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "96%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
