import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "@material-ui/core/Button";

const MySwal = withReactContent(Swal);

const EditAnswer = () => {
  
  const validationSchema = yup.object({
    answer: yup.string("Enter your answer").required("answer is required"),
  });

  const initialValues = {
    question_id: "",
    answer: "",
  };

  const formikEditAnswer = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: (values) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Question has been Added",
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });

  return (
    <form
      onSubmit={formikEditAnswer.handleSubmit}
      className="position-relative mt-2 p-0"
    >
      <TextField
        className="mb-3"
        variant="outlined"
        id="answer"
        name="answer"
        label="Answer"
        placeholder="Enter answer"
        multiline
        rows={3}
        rowsMax={4}
        value={formikEditAnswer.values.answer}
        onChange={formikEditAnswer.handleChange}
        error={
          formikEditAnswer.touched.answer &&
          Boolean(formikEditAnswer.errors.answer)
        }
        helperText={
          formikEditAnswer.touched.answer && formikEditAnswer.errors.answer
        }
      />
      <Button
        variant="contained"
        className="mt-4 mb-2"
        type="submit"
        style={{ backgroundColor: "#3f51b5", color: "#fff" }}
      >
        Submit
      </Button>
    </form>
  );
};
export default EditAnswer;
